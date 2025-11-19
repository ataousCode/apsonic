import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helper?: string;
  options: Array<{ value: string; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, helper, options, ...props }, ref) => {
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
        <select
          className={cn(
            "flex h-12 w-full rounded-xl border border-apsonic-border bg-apsonic-surface px-4 py-3 text-base text-apsonic-text transition-colors appearance-none cursor-pointer",
            "focus:outline-none focus:ring-2 focus:ring-apsonic-green focus:ring-offset-2 focus:ring-offset-apsonic-ink",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23f8fbf2%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5rem] bg-[right_0.75rem_center] bg-no-repeat pr-12",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
          ref={ref}
          id={id}
          {...props}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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

Select.displayName = "Select";

export { Select };

