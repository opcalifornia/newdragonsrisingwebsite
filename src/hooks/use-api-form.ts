"use client";

import { useState } from "react";

export type FormStatus = "idle" | "loading" | "success" | "not_configured" | "error";

export function useApiForm(endpoint: string) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function submit(data: Record<string, unknown>) {
    setStatus("loading");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.status === 503) {
        setStatus("not_configured");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return { status, submit };
}
