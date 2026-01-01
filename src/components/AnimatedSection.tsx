import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "scale-up";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({
  children,
  animation = "fade-up",
  delay = 0,
  className,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        "motion-safe:opacity-0",
        isVisible && `motion-safe:animate-${animation}`,
        !isVisible && "opacity-100",
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
