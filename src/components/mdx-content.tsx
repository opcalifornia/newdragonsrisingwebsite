import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { cn } from "@/lib/utils";

const components = {
  a: (props: React.ComponentProps<"a">) => {
    const { href = "", ...rest } = props;
    if (href.startsWith("/")) {
      return <Link href={href} className="text-red-highlight underline underline-offset-4 hover:text-white" {...rest} />;
    }
    return <a href={href} className="text-red-highlight underline underline-offset-4 hover:text-white" {...rest} />;
  },
};

export function MDXContent({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "space-y-5 text-[1.05rem] leading-[1.75] text-text-body [&_strong]:text-white [&_strong]:font-semibold",
        className,
      )}
    >
      <MDXRemote source={source} components={components} />
    </div>
  );
}
