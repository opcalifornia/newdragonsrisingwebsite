import type { Metadata } from "next";
import Link from "next/link";
import { signup } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Sign Up" };

export default function SignupPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-24 sm:px-6">
      <h1 className="font-display text-3xl text-white">Create Account</h1>
      <p className="mt-2 text-sm text-text-muted">
        Sign up to enroll in training modules and track your progress.
      </p>
      <div className="mt-8">
        <AuthForm action={signup} mode="signup" />
      </div>
      <p className="mt-6 text-center text-sm text-text-muted">
        Already have an account?{" "}
        <Link href="/login" className="text-white underline underline-offset-4">
          Log in
        </Link>
      </p>
    </div>
  );
}
