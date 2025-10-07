import { useMemo, useState } from "react";
import { motion, MotionValue, useMotionValueEvent, useTransform } from "motion/react";
import clsx from "clsx";

// Usa tus componentes separados
import BulletButton from "./StepNav/BulletButton";
import Track from "./StepNav/Track";

type Props = {
  /** Progreso [0..1] del MISMO sectionRef que se pasa acá */
  progress: MotionValue<number>;
  /** Cantidad total de cards */
  total: number;
  /** Nombres para tooltip */
  labels?: string[];
  /** Ids de anchors de cada card (si existen). Si están, se usa scroll a esos ids. */
  ids?: string[];
  /** Layout extra del wrapper */
  className?: string;
  /** Mostrar la línea de progreso */
  showTrack?: boolean;
  /** Ref de la sección usada para el progress */
  sectionRef?: React.RefObject<HTMLElement | null>;
  /** Offset (px) por navbar sticky */
  offset?: number;
  /** Handler alternativo (Lenis, etc.) */
  onJumpOverride?: (index: number) => void;
  /** Centros [0..1] reales de activación (corrige padIn/padOut). */
  centers?: number[];
  /** Tramos [start,end] de cada card (0..1 del progress) */
  segments?: Array<{ start: number; end: number }>;
  /** Alineación del salto dentro del tramo cuando hay segments */
  jumpAlign?: "start" | "center" | "end";
  /** Padding [% del tramo] para no pegarse a los bordes (0..0.49) */
  paddingPct?: number;

  /** Alineación cuando se usa anchor por id */
  anchorAlign?: "start" | "center" | "end";
  /** Ajuste extra por índice (px). p.ej: {0: 40, 1: 40} */
  perIndexAdjust?: Partial<Record<number, number>>;
  /** Clase de fondo para el backplate del bullet (debería igualar el fondo real) */
  bulletMaskClassName?: string; // ej: "bg-neutral-900" | "bg-black"
};

export default function StepScrollNavProgress({
  progress,
  total,
  labels,
  ids,
  className,
  showTrack = true,
  sectionRef,
  offset = 0,
  segments,
  jumpAlign = "center",
  paddingPct = 0.1,
  onJumpOverride,
  centers,
  anchorAlign = "start",
  perIndexAdjust = {},
  bulletMaskClassName = "bg-neutral-900",
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const step = useMemo(() => (total > 0 ? 1 / total : 1), [total]);

  useMotionValueEvent(progress, "change", (v) => {
    if (total <= 0) return;
    if (centers && centers.length === total) {
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < centers.length; i++) {
        const d = Math.abs(v - centers[i]!);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveIndex(best);
    } else {
      let idx = Math.floor(v / step);
      if (idx < 0) idx = 0;
      if (idx >= total) idx = total - 1;
      setActiveIndex(idx);
    }
  });

  function clamp01(x: number) { return Math.max(0, Math.min(1, x)); }
  const EPS = 1e-4;

  function resolveTargetProgress(index: number) {
    // 1) Si hay tramos, se respeta start/end con padding y align
    if (segments && segments[index]) {
      const { start, end } = segments[index]!;
      const width = Math.max(end - start, 0);
      const pad = Math.min(Math.max(paddingPct, 0), 0.49) * width; // 0..49%
      const a = start + pad;
      const b = end - pad;

      let t = 0.5;
      if (jumpAlign === "start") t = 0.0;
      else if (jumpAlign === "end") t = 1.0;

      return clamp01(a + (b - a) * t);
    }

    // 2) Si no hay tramos, usar centro conocido o centro del step
    const st = total > 0 ? 1 / total : 1;
    if (centers && centers[index] !== undefined) return clamp01(centers[index]!);
    return clamp01(index * st + st / 2);
  }

  function resolveDynamicOffset(offsetProp?: number) {
    if (typeof offsetProp === "number") return offsetProp;
    const css = getComputedStyle(document.documentElement);
    const fromCssVar = Number.parseFloat(css.getPropertyValue("--nav-offset")) || 0;
    return fromCssVar || 0;
  }

  function defaultJump(index: number) {
    const targetProgress = clamp01(resolveTargetProgress(index) + EPS);
    const sec = sectionRef?.current ?? null;
    const offBase = resolveDynamicOffset(offset);
    const extra = perIndexAdjust[index] ?? 0;
    const offTotal = offBase + extra;

    console.groupCollapsed(
      `%c[StepScrollNavProgress/defaultJump] idx=${index}`,
      "color:#8ab4f8;font-weight:600;"
    );
    console.log("inputs →", {
      index,
      targetProgress,
      ids,
      hasAnchor: !!ids?.[index],
      offBase,
      extraPerIndex: extra,
      offTotal,
      anchorAlign,
      jumpAlign,
      paddingPct,
      hasSectionRef: !!sec
    });

    // 1) ANCHOR (si hay id)
    if (ids?.[index]) {
      const id = ids[index]!;
      const el = document.getElementById(id);
      console.log("[branch] ANCHOR", { id, el });

      if (el) {
        const r = el.getBoundingClientRect();
        const yTop = window.scrollY + r.top;

        let targetY = yTop;
        if (anchorAlign === "center") {
          targetY = yTop - (window.innerHeight / 2 - r.height / 2);
        } else if (anchorAlign === "end") {
          targetY = yTop - (window.innerHeight - r.height);
        }

        const finalY = Math.max(0, targetY - offTotal);
        console.log("anchor metrics →", {
          rTop: r.top,
          elHeight: r.height,
          yTop,
          targetY,
          finalY,
          offTotal
        });

        window.scrollTo({ top: finalY, behavior: "smooth" });
        console.groupEnd();
        return;
      }
    }

    // 2) SECTION (progress dentro de la sección)
    if (sec) {
      const rect = sec.getBoundingClientRect();
      const sectionStart = window.scrollY + rect.top;
      const sectionEnd = sectionStart + Math.max(rect.height - window.innerHeight, 0);
      const scrollable = Math.max(sectionEnd - sectionStart, 0);

      console.log("[branch] SECTION", {
        sectionStart,
        sectionEnd,
        rectHeight: rect.height,
        viewport: window.innerHeight,
        scrollable,
      });

      if (scrollable > 0) {
        const y = sectionStart + targetProgress * scrollable;
        const finalY = Math.max(0, y - offTotal);

        console.log("section metrics →", {
          y,
          finalY,
          targetProgress,
          offTotal,
        });

        window.scrollTo({ top: finalY, behavior: "smooth" });
        console.groupEnd();
        return;
      }
    }

    // 3) Fallback documento
    const docScrollable = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      0
    );
    const yDoc = targetProgress * docScrollable;
    const finalY = Math.max(0, yDoc - offTotal);

    console.log("[branch] DOC FALLBACK", {
      docScrollable,
      yDoc,
      finalY,
      targetProgress,
      offTotal,
    });

    window.scrollTo({ top: finalY, behavior: "smooth" });
    console.groupEnd();
  }

  const handleJump = (i: number) => {
    if (onJumpOverride) onJumpOverride(i);
    else defaultJump(i);
  };

  if (total <= 0) return null;

  // Ventanas de aparición/desaparición basadas en tu timeline.
  const appearInStart  = (segments?.[0]?.start ?? step * 0.08);
  const appearInEnd    = appearInStart + step * 0.25;
  const appearOutStart = (segments?.[total - 1]?.end ?? 1) - step * 0.2;
  const appearOutEnd   = 1;

  // Opacidad, blur y desplazamiento sutil
  const opacityMV = useTransform(progress, [0, appearInStart, appearInEnd, appearOutStart, appearOutEnd], [0, 0, 1, 1, 0]);
  const blurMV    = useTransform(progress, [0, appearInStart, appearInEnd, appearOutStart, appearOutEnd], [10,10, 0, 0,10]);
  const yMV       = useTransform(progress, [0, appearInStart, appearInEnd], [8, 8, 0]);
  const filterMV  = useTransform(blurMV, (v) => `blur(${v}px)`);

  // Rango visual del track para que “complete” del primer tramo al último
  const trackStart = segments?.[0]?.start ?? 0;
  const trackEnd   = segments?.[total - 1]?.end ?? 1;

  // Habilitar/deshabilitar clicks según visibilidad
  const [interactive, setInteractive] = useState(false);
  useMotionValueEvent(opacityMV, "change", (o) => setInteractive(o > 0.3));

  return (
    <motion.div
      style={{
        opacity: opacityMV,
        filter: filterMV,
        y: yMV,
        pointerEvents: interactive ? "auto" : "none",
      }}
      className={clsx(
        "relative flex h-[30vh] my-auto w-min min-w-8 flex-col items-center justify-between",
        "select-none",
        className
      )}
      aria-label="Navegación por pasos"
    >
      {showTrack && <Track progress={progress} start={trackStart} end={trackEnd} />}

      <ul className="flex h-full w-full flex-col items-center justify-between">
        {Array.from({ length: total }).map((_, i) => {
          const label = labels?.[i] ?? ids?.[i] ?? `Sección ${i + 1}`;
          return (
            <li key={i} className="flex items-center justify-center">
              <BulletButton
                active={i === activeIndex}
                label={label}
                onClick={() => handleJump(i)}
                maskClassName={bulletMaskClassName}
              />
            </li>
          );
        })}
      </ul>
    </motion.div>
  );
}
