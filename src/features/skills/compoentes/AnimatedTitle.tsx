import { MotionValue, useTransform,motion } from "framer-motion";

/** Título que aparece desde arriba y queda centrado encima de las cards. */
export default function AnimatedTitle({
  progress,
  TITLE_END,
}: {
  progress: MotionValue<number>;
  TITLE_END: number;
}) {
  // KNOB — curva de entrada del título (inicio→fin de la fase título)
  // Podés mover 0.05/ TITLE_END para ajustar duración de fade/slide
  const titleOpacity = useTransform(progress, [0.0, 0.05, TITLE_END], [0, 1, 1]);
  const titleY = useTransform(progress, [0.0, TITLE_END], [-36, 0]); // entra desde arriba

  return (
    <motion.h2
      style={{ opacity: titleOpacity, y: titleY }}
      className="text-center text-3xl font-semibold text-white/85 sm:text-4xl md:text-5xl lg:text-6xl"
    >
      Mis Habilidades
    </motion.h2>
  );
}
