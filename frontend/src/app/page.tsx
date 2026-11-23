import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/dal";

/** "/" has no content of its own (the proxy normally redirects before reaching it). */
export default async function HomePage() {
  redirect((await getCurrentUser()) ? "/dashboard" : "/login");
}
