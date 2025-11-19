import { cn } from "@/lib/utils";
import React from "react";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "glass" | "gradient";
  padding?: "none" | "sm" | "md" | "lg";
};

export function Card({
  className,
  variant = "default",
  padding = "md",
  children,
  ...props
}: CardProps) {
  const paddingClasses = {
    none: "",
    sm: "p-6",
    md: "p-8",
    lg: "p-10",
  };

  const variantClasses = {
    default: "bg-apsonic-surface border border-apsonic-border",
    glass: "glass-panel",
    gradient: "section-gradient border border-apsonic-border",
  };

  return (
    <div
      className={cn(
        "rounded-3xl",
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
