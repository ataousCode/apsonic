import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helper, ...props }, ref) => {
    const id = props.id || props.name;
    
    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-apsonic-text"
          >
            {label}
            {props.required && (
              <span className="ml-1 text-apsonic-green">*</span>
            )}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-xl border border-apsonic-border bg-apsonic-surface px-4 py-3 text-base text-apsonic-text placeholder:text-apsonic-subtle transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-apsonic-green focus:ring-offset-2 focus:ring-offset-apsonic-ink",
            "disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          id={id}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        {helper && !error && (
          <p className="text-sm text-apsonic-subtle">{helper}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };

