import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string | React.ReactNode;
  error?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, error, ...props }, ref) => {
    const id = props.id || props.name;
    
    return (
      <div className="w-full space-y-2">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            className={cn(
              "mt-1 h-5 w-5 flex-shrink-0 rounded border-2 border-apsonic-border bg-apsonic-surface text-apsonic-green cursor-pointer transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-apsonic-green focus:ring-offset-2 focus:ring-offset-apsonic-ink",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "checked:bg-apsonic-green checked:border-apsonic-green",
              error && "border-red-500",
              className
            )}
            ref={ref}
            id={id}
            {...props}
          />
          {label && (
            <label
              htmlFor={id}
              className="text-sm font-medium text-apsonic-text cursor-pointer leading-relaxed"
            >
              {label}
              {props.required && (
                <span className="ml-1 text-apsonic-green">*</span>
              )}
            </label>
          )}
        </div>
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

