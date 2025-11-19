import * as React from "react";
import { Section, type SectionProps } from "./Section";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

type PageSectionProps = SectionProps & {
  containerClassName?: string;
  children: React.ReactNode;
};

export function PageSection({
  className,
  containerClassName,
  children,
  ...props
}: PageSectionProps) {
  return (
    <Section className={className} {...props}>
      <Container className={cn(containerClassName)}>{children}</Container>
    </Section>
  );
}

