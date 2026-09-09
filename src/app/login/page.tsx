import type { Metadata } from "next";
import Link from "next/link";
import { login } from "@/app/actions/auth";
import { AuthForm } from "@/components/auth/auth-form";

export const metadata: Metadata = { title: "Log In" };

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-24 sm:px-6">
      <h1 className="font-display text-3xl text-white">Log In</h1>
      <p className="mt-2 text-sm text-text-muted">
        Access your training modules and account.
      </p>
      <div className="mt-8">
        <AuthForm action={login} mode="login" />
      </div>
      <p className="mt-6 text-center text-sm text-text-muted">
        Don&rsquo;t have an account?{" "}
        <Link href="/signup" className="text-white underline underline-offset-4">
          Sign up
        </Link>
      </p>
    </div>
  );
}
