// components/StepNav/BulletButton.tsx
import { motion } from "motion/react";
import clsx from "clsx";

type Props = {
  active: boolean;
  label: string;
  onClick: () => void;
  /** Clase tailwind del fondo para la máscara (debe coincidir con fondo real) */
  maskClassName?: string; // ej: "bg-neutral-900" ó "bg-black"
};

export default function BulletButton({ active, label, onClick, maskClassName = "bg-neutral-900" }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "group relative grid h-6 w-6 place-items-center rounded-full transition-transform z-10", // z-10 por encima del track
        active ? "scale-110" : "scale-100",
        "cursor-pointer"
      )}
      aria-label={`Ir a ${label}`}
    >
      {/* Backplate (máscara) para tapar el trazo detrás del anillo */}
      <span
        className={clsx(
          "absolute inset-0 rounded-full",
          maskClassName // debe “igualar” el fondo de tu contenedor
        )}
        aria-hidden
      />

      {/* Anillo */}
      <span
        className={clsx(
          "absolute inset-0 rounded-full border",
          active ? "border-white/80" : "border-white/30"
        )}
        aria-hidden
      />

      {/* Punto */}
      <span
        className={clsx(
          "h-2.5 w-2.5 rounded-full",
          active ? "bg-gradient-to-br from-[#0075FF] to-[#0044CC]" : "bg-white/40"
        )}
        aria-hidden
      />

      {/* Tooltip */}
      <motion.span
        initial={{ opacity: 0, x: 4 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="pointer-events-none absolute right-7 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-white/10 px-2 py-0.5 text-xs text-white/80 backdrop-blur-sm opacity-0 group-hover:opacity-100"
      >
        {label}
      </motion.span>
    </button>
  );
}
