import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, as: Comp = "section", ...props }, ref) => (
    <Comp
      ref={ref}
      className={cn("py-16 md:py-24 lg:py-32", className)}
      {...props}
    />
  )
);
Section.displayName = "Section";

export { Section };