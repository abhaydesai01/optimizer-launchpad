import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: string;
  label: string;
}

const AnimatedCounter = ({ target, label }: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(target.replace(/[\d.]+/, "0"));
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const numMatch = target.match(/[\d.]+/);
          if (!numMatch) { setDisplay(target); return; }
          const finalNum = parseFloat(numMatch[0]);
          const prefix = target.slice(0, target.indexOf(numMatch[0]));
          const suffix = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length);
          const duration = 2000;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            const current = finalNum * eased;
            const formatted = finalNum % 1 === 0 ? Math.round(current).toString() : current.toFixed(1);
            setDisplay(`${prefix}${formatted}${suffix}`);
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-4xl md:text-5xl font-extrabold gradient-text stat-glow mb-2">{display}</div>
      <div className="text-sm text-muted-foreground font-medium">{label}</div>
    </div>
  );
};

export default AnimatedCounter;
