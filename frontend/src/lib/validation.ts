import * as z from "zod";

// Form schemas shared by the Server Actions. The rules mirror the backend
// validation (backend/src/utils/validation.ts) so that errors are caught before
// the API call and shown next to the right field, in French.

/** Same rule as the backend: 8+ characters with lowercase, uppercase, digit and special char. */
export const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const PASSWORD_HINT =
  "8 caractères minimum, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&).";

const email = z
  .string()
  .trim()
  .min(1, { error: "L'email est requis." })
  .pipe(z.email({ error: "Adresse email invalide." }));

export const loginSchema = z.object({
  email,
  password: z.string().min(1, { error: "Le mot de passe est requis." }),
});

export const registerSchema = z.object({
  email,
  password: z.string().regex(PASSWORD_PATTERN, { error: PASSWORD_HINT }),
});

export const profileSchema = z
  .object({
    firstName: z.string().trim().max(50, { error: "50 caractères maximum." }),
    lastName: z.string().trim().max(50, { error: "50 caractères maximum." }),
    email,
    currentPassword: z.string(),
    newPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    const fullName = `${data.firstName} ${data.lastName}`.trim();
    if (fullName.length > 0 && fullName.length < 2) {
      ctx.addIssue({ code: "custom", path: ["firstName"], message: "2 caractères minimum." });
    }
    if (data.newPassword) {
      if (!PASSWORD_PATTERN.test(data.newPassword)) {
        ctx.addIssue({ code: "custom", path: ["newPassword"], message: PASSWORD_HINT });
      }
      if (!data.currentPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["currentPassword"],
          message: "Saisissez votre mot de passe actuel pour le modifier.",
        });
      }
    }
  });

export const projectSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Le titre doit contenir au moins 2 caractères." })
    .max(100, { error: "100 caractères maximum." }),
  description: z
    .string()
    .trim()
    .min(1, { error: "La description est requise." })
    .max(500, { error: "500 caractères maximum." }),
  contributorEmails: z.array(z.email()).default([]),
});

export const TASK_STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export const taskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, { error: "Le titre doit contenir au moins 2 caractères." })
    .max(200, { error: "200 caractères maximum." }),
  description: z
    .string()
    .trim()
    .min(1, { error: "La description est requise." })
    .max(1000, { error: "1000 caractères maximum." }),
  dueDate: z.iso.date({ error: "L'échéance est requise." }),
  assigneeIds: z.array(z.string().min(1)).default([]),
  status: z.enum(TASK_STATUSES, { error: "Statut invalide." }).default("TODO"),
});

export const commentSchema = z.object({
  content: z
    .string()
    .trim()
    .min(1, { error: "Le commentaire est vide." })
    .max(2000, { error: "2000 caractères maximum." }),
});

export type FieldErrors = Partial<Record<string, string[]>>;

/** Flattens zod issues into `{ field: [messages] }` for the forms. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  return z.flattenError(error).fieldErrors as FieldErrors;
}
