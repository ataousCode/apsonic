import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  actions?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "text-left"
      )}
    >
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-[0.4em] text-emerald-300/80">
          {eyebrow}
        </span>
      ) : null}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className={cn("space-y-4", align === "center" ? "md:text-center" : "md:text-left")}>
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="max-w-2xl text-base text-white/70">{description}</p>
          ) : null}
        </div>
        {actions}
      </div>
    </div>
  );
}

