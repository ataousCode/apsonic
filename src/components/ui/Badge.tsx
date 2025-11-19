import { cn } from "@/lib/utils";
import React from "react";

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "primary" | "outline" | "success";
  size?: "sm" | "md";
};

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}: BadgeProps) {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1 text-sm",
  };

  const variantClasses = {
    default: "bg-white/10 text-white/80 border border-white/20",
    primary: "bg-apsonic-green text-black font-medium border-0",
    outline: "bg-transparent text-white/70 border border-white/30",
    success: "bg-emerald-500/20 text-emerald-200 border border-emerald-500/30",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

