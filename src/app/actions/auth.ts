"use server";

import * as z from "zod";
import { redirect } from "next/navigation";
import { createUser, findUserByEmail } from "@/lib/auth/mock-db";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";

const SignupSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters." }).trim(),
  email: z.email({ error: "Enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters." })
    .regex(/[a-zA-Z]/, { error: "Include at least one letter." })
    .regex(/[0-9]/, { error: "Include at least one number." }),
});

export type AuthFormState =
  | { errors?: { name?: string[]; email?: string[]; password?: string[] }; message?: string }
  | undefined;

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = SignupSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors };
  }

  const { name, email, password } = validated.data;

  const existing = await findUserByEmail(email);
  if (existing) {
    return { message: "An account with that email already exists." };
  }

  const passwordHash = await hashPassword(password);
  const user = await createUser({ name, email, passwordHash });

  await createSession({ userId: user.id, role: user.role, name: user.name });
  redirect("/account");
}

const LoginSchema = z.object({
  email: z.email({ error: "Enter a valid email." }).trim(),
  password: z.string().min(1, { error: "Password is required." }),
});

export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validated = LoginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validated.success) {
    return { errors: z.flattenError(validated.error).fieldErrors };
  }

  const { email, password } = validated.data;
  const user = await findUserByEmail(email);
  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return { message: "Invalid email or password." };
  }

  await createSession({ userId: user.id, role: user.role, name: user.name });
  redirect("/account");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}
