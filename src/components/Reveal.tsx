import { m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;

/** Subtle fade-and-rise when a block first enters the viewport. Used for section headers and key blocks only. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </m.div>
  );
}
