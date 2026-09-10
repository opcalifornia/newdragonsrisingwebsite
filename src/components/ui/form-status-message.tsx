import type { FormStatus } from "@/hooks/use-api-form";

export function FormStatusMessage({
  status,
  successText,
}: {
  status: FormStatus;
  successText: string;
}) {
  if (status === "success") {
    return (
      <div className="rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-4 text-sm text-white">
        {successText}
      </div>
    );
  }
  if (status === "not_configured") {
    return (
      <div className="rounded-sm border border-dashed border-surface-border p-4 text-sm text-text-muted">
        Email sending isn&rsquo;t connected yet — add{" "}
        <code className="text-text-primary">RESEND_API_KEY</code> to enable
        this form. See README.
      </div>
    );
  }
  if (status === "error") {
    return (
      <div className="rounded-sm border border-dashed border-red-core/50 bg-red-core/5 p-4 text-sm text-text-body">
        Something went wrong sending this. Please try again or call{" "}
        {"(209) 507-9630"}.
      </div>
    );
  }
  return null;
}
