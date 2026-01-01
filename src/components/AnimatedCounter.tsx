import React from 'react';
import { useAnimatedCounter } from '@/hooks/useAnimatedCounter';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = ''
}) => {
  const { count, ref } = useAnimatedCounter({ end, duration });

  return (
    <div ref={ref} className={className}>
      {prefix}{count}{suffix}
    </div>
  );
};

export default AnimatedCounter;
