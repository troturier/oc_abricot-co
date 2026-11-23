export type AiErrorKind = "config" | "quota" | "unavailable" | "invalid-output";

/** Error of the AI pipeline, with a message that can be shown to the user. */
export class AiError extends Error {
  constructor(
    public readonly kind: AiErrorKind,
    message: string,
  ) {
    super(message);
    this.name = "AiError";
  }
}

/** Maps an error of the Mistral SDK (or the network) to a user-facing AiError. */
export function toAiError(error: unknown): AiError {
  if (error instanceof AiError) return error;
  const status =
    typeof error === "object" && error && "statusCode" in error ? Number(error.statusCode) : undefined;
  if (status === 401 || status === 403) {
    return new AiError("config", "La clé d'API du service d'IA est invalide. Contactez l'administrateur.");
  }
  if (status === 429) {
    return new AiError("quota", "Le quota du service d'IA est atteint. Réessayez dans quelques minutes.");
  }
  return new AiError("unavailable", "Le service d'IA est momentanément indisponible. Réessayez plus tard.");
}
