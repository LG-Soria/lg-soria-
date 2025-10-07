import { motion, MotionValue, useTransform, useScroll } from "motion/react";
import { CATEGORIAS } from "../data/categorias";
import { useMemo, useRef } from "react";
import StepScrollNavProgress from "./StepScrollNavProgress";
import { useStepAdjustments } from "../hooks/useStepAdjustments";

const contentVariants = {
  initial: { opacity: 1, y: 0 },
  active: { opacity: 1, y: 0 },
};

export default function StepperPanels({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);

  const ranges = useMemo(() => {
    const step = 1 / CATEGORIAS.length;
    return CATEGORIAS.map((_, i) => {
      const start = i * step;
      const end = (i + 1) * step;
      const FIRST_CARD_DELAY = step * 0.1;
      const padIn = i === 0 ? FIRST_CARD_DELAY : step * 0.12;
      const padOut = step * 0.12;
      return {
        opacityInput: [
          start,
          start + Math.max(padIn, 0.0001),
          end - padOut,
          end,
        ] as const,
        opacityOutput: [0, 1, 1, 0],
        yInput: [start, end] as const,
        yOutput: [8, -8] as const,
      };
    });
  }, []);
  // dentro de StepperPanels
  const step = 1 / CATEGORIAS.length;

  const segments = useMemo(() => {
    return CATEGORIAS.map((_, i) => {
      const start = i * step;
      const end = (i + 1) * step;
      const FIRST_CARD_DELAY = step * 0.1;
      const padIn = i === 0 ? FIRST_CARD_DELAY : step * 0.12;
      const padOut = step * 0.12;

      const a = start + Math.max(padIn, 0.0001); // inicio real de visibilidad
      const b = end - padOut; // fin real de visibilidad
      return { start: a, end: b };
    });
  }, []);

  return (
    <section
      ref={sectionRef as any}
      className="relative flex h-full w-full flex-row-reverse gap-x-12"
    >
      {/* POSICIÓN LATERAL: fija en viewport (no en el medio de la card) */}
<StepScrollNavProgress
  progress={progress}
  total={4}
  ids={["frontend", "backend", "integraciones", "herramientas"]}
  sectionRef={sectionRef}
  offset={80}
  anchorAlign="start"
  perIndexAdjust={useStepAdjustments()} // 👈 se trae del hook
/>

      {/* Stack de cards */}
      <div className="relative h-full w-full">
        {CATEGORIAS.map((cat, i) => {
          const r = ranges[i];
          const opacity = useTransform(
            progress,
            r.opacityInput as any,
            r.opacityOutput as any,
          );
          const y = useTransform(progress, r.yInput as any, r.yOutput as any);

          return (
            <motion.article
              key={cat.key}
              style={{ opacity, y }}
              className="absolute inset-0"
              aria-label={cat.titulo}
            >
              <div className="h-full min-h-0 overflow-hidden rounded-2xl border bg-black/10 backdrop-blur">
                <motion.div
                  variants={contentVariants}
                  initial="initial"
                  animate="active"
                  className="h-full max-h-full overflow-y-auto p-5 sm:p-10"
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <header className="mb-3 flex items-baseline justify-between sm:mb-4">
                    <p className="text-xl font-bold uppercase sm:text-3xl">
                      {cat.titulo}
                    </p>
                    <span className="text-[10px] text-[#0075FF] sm:text-xs">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(CATEGORIAS.length).padStart(2, "0")}
                    </span>
                  </header>

                  <ul className="list-disc space-y-2 pr-2 pl-5 text-white/90 marker:text-white/60 sm:pr-0">
                    {cat.items.map((txt, idx) => (
                      <li
                        key={idx}
                        className="text-sm leading-relaxed break-words hyphens-auto sm:text-base"
                      >
                        {txt}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
