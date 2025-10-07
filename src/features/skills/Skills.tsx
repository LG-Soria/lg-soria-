import { useMemo, useRef } from "react";
import { useScroll, useTransform } from "motion/react";
import { CATEGORIAS } from "./data/categorias";
import StepperPanels from "./compoentes/StepperPanels";
import AnimatedTitle from "./compoentes/AnimatedTitle";

export default function Skills() {
  const sectionHeight = useMemo(() => `${CATEGORIAS.length * 100}vh`, []);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // KNOB — altura del “frame” donde apilamos las cards (mantiene layout estable)
  const CARD_HEIGHT_PX = 440;

  // === Progreso global de la sección (calibrado al centro del viewport) ===
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start center", "end center"],
  });

  // === Fase 1: animación del título ===
  // KNOB — hasta dónde dura la entrada del título dentro del progreso global
  //        (0 → TITLE_END es "solo título", luego arrancan las cards)
  const TITLE_END = 0.12; // 12% del tramo total

  // === Fase 2: progreso de cards recortado ===
  // A partir de que el título terminó (TITLE_END), mapeamos el resto a [0..1]
  const cardProgress = useTransform(scrollYProgress, (v) => {
    const t = (v - TITLE_END) / (1 - TITLE_END);
    return Math.max(0, Math.min(1, t)); // clamp 0..1
  });



  return (
    <section
      id="skills"
      className="mx-auto flex min-h-screen max-w-6xl flex-col items-center space-y-10 border-x px-4 py-16"
    >
      {/* Heading solo para SEO/accesibilidad (visual lo maneja AnimatedTitle) */}
      <h2 className="sr-only">Mis Habilidades</h2>

      <div
        ref={wrapperRef}
        className="relative w-full"
        style={{ height: sectionHeight }}
      >
        {/* Sticky centrado que agrupa Título + Cards */}
        <div className="sticky top-1/2 z-10 w-full -translate-y-1/2">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-2">
            {/* Título: usa el progreso global (scrollYProgress) */}
            <AnimatedTitle progress={scrollYProgress} TITLE_END={TITLE_END} />

            {/* Frame de cards: usa el progreso recortado (cardProgress) */}
            <div className="relative w-full" style={{ height: CARD_HEIGHT_PX }}>
              <StepperPanels progress={cardProgress}  />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
