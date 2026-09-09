"use client";

import { useActionState } from "react";
import type { AuthFormState } from "@/app/actions/auth";

export function AuthForm({
  action,
  mode,
}: {
  action: (state: AuthFormState, formData: FormData) => Promise<AuthFormState>;
  mode: "login" | "signup";
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="space-y-5">
      {mode === "signup" && (
        <div>
          <label htmlFor="name" className="text-sm text-text-muted">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
          />
          {state?.errors?.name && (
            <p className="mt-1 text-xs text-red-highlight">{state.errors.name[0]}</p>
          )}
        </div>
      )}

      <div>
        <label htmlFor="email" className="text-sm text-text-muted">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
        {state?.errors?.email && (
          <p className="mt-1 text-xs text-red-highlight">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="text-sm text-text-muted">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 w-full rounded-sm border border-surface-border bg-surface px-4 py-3 text-white focus-visible:border-red-core"
        />
        {state?.errors?.password && (
          <ul className="mt-1 space-y-0.5 text-xs text-red-highlight">
            {state.errors.password.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
      </div>

      {state?.message && (
        <p className="text-sm text-red-highlight">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-sm bg-red-core px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-highlight disabled:opacity-60"
      >
        {pending ? "Please wait…" : mode === "login" ? "Log In" : "Create Account"}
      </button>
    </form>
  );
}
