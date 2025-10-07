// components/StepNav/Track.tsx
import { motion, MotionValue, useTransform } from "motion/react";
import clsx from "clsx";

type Props = {
  progress: MotionValue<number>;
  /** Rango del progress real que se quiere mapear al track visual (0..1 por defecto) */
  start?: number;
  end?: number;
  /** Tailwind para el thickness y estilo del carril base */
  className?: string;
};

export default function Track({ progress, start = 0, end = 1, className }: Props) {
  // Mapear el tramo [start..end] → [0..1] para que el llenado llegue “hasta el final”
  const visual = useTransform(progress, [start, end], [0, 1], { clamp: true });

  return (
    <div
      className={clsx(
        "absolute left-1/2 top-0 z-0 h-full -translate-x-1/2", // z-0 => detrás de los bullets (que irán con z-10)
        "w-px overflow-hidden bg-white/10", // carril base
        className
      )}
      aria-hidden
    >
      <motion.span
        className="block h-full w-full origin-top bg-gradient-to-b from-[#0075FF] to-[#0044CC]"
        style={{ scaleY: visual, transformOrigin: "top" }}
      />
    </div>
  );
}
