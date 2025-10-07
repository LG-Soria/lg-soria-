import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LuArrowDown } from "react-icons/lu";

type ScrollHintProps = {
  appearAfterMs?: number;     // ms de inactividad antes de mostrar
  topThresholdPx?: number;    // scrollY máximo para considerarse "arriba"
  bottomOffset?: number;      // separación desde abajo en px
  fixed?: boolean;            // true: pegado al viewport
  label?: string | null;      // texto bajo la flecha
  className?: string;
};

export default function ScrollHint({
  appearAfterMs = 2400,
  topThresholdPx = 12,
  bottomOffset = 56,
  fixed = false,
  label = "Scrollea",
  className = "",
}: ScrollHintProps) {
  const [visible, setVisible] = useState(false);
  const idleTimer = useRef<number | null>(null);
  const isTopRef = useRef<boolean>(true);

  // Helpers
  const clearIdle = () => {
    if (idleTimer.current) {
      window.clearTimeout(idleTimer.current);
      idleTimer.current = null;
    }
  };
  const scheduleIdle = () => {
    clearIdle();
    idleTimer.current = window.setTimeout(() => {
      // Solo mostrar si seguimos arriba
      if (isTopRef.current) setVisible(true);
    }, appearAfterMs);
  };

  useEffect(() => {
    // Estado inicial: ¿estamos arriba?
    isTopRef.current = (window.scrollY || 0) <= topThresholdPx;
    // Si estamos arriba, arrancar contador
    if (isTopRef.current) scheduleIdle();

    const onScroll = () => {
      const atTop = (window.scrollY || 0) <= topThresholdPx;

      // Si se scrolleó hacia abajo => ocultar y cancelar temporizador
      if (!atTop) {
        isTopRef.current = false;
        if (visible) setVisible(false);
        clearIdle();
        return;
      }

      // Volvimos “arriba”: reprogramar idle para volver a mostrar
      if (!isTopRef.current && atTop) {
        isTopRef.current = true;
        scheduleIdle();
      }
    };

    // Cualquier actividad reinicia el contador (solo cuando estamos arriba)
    const onActivity = () => {
      if (isTopRef.current && !visible) scheduleIdle();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onActivity, { passive: true });
    window.addEventListener("keydown", onActivity);
    window.addEventListener("touchstart", onActivity, { passive: true });
    window.addEventListener("wheel", onActivity, { passive: true });

    return () => {
      clearIdle();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onActivity);
      window.removeEventListener("keydown", onActivity);
      window.removeEventListener("touchstart", onActivity);
      window.removeEventListener("wheel", onActivity);
    };
  }, [appearAfterMs, topThresholdPx, visible]);

  const positionClasses = fixed
    ? "fixed left-1/2 -translate-x-1/2"
    : "absolute inset-x-0";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={[
            "pointer-events-none select-none z-50",
            positionClasses,
            "flex flex-col items-center text-white/70",
            className,
          ].join(" ")}
          style={{ bottom: bottomOffset }}
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.15, ease: "easeInOut" }}
          >
            <LuArrowDown className="text-3xl" />
          </motion.div>
          {label && <span className="mt-1 text-xs tracking-wide">{label}</span>}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
