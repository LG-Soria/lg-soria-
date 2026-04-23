import { motion, useReducedMotion } from "framer-motion";
import {
  createRevealScaleVariants,
  createRevealVariants,
  createStaggerContainerVariants,
  IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const SECTION_CONTENT = {
  eyebrow: "STRENGTHS / TECH BLOCK",
  title: "MI APORTE EN CADA PROYECTO",
  subtitle:
    "Cuatro areas donde conecto diseño, producto y desarrollo para empujar un proyecto con mas claridad y solidez.",
} as const;

const TECH_STRENGTHS = [
  {
    number: "01",
    title: "ARQUITECTURA FRONTEND",
    description:
      "Estructuro interfaces y componentes pensando en escalabilidad, orden y mantenibilidad, para que el proyecto pueda crecer sin volverse fragil.",
    tags: ["React", "TypeScript", "Componentes"],
  },
  {
    number: "02",
    title: "CRITERIO VISUAL APLICADO",
    description:
      "No me quedo en lo estetico: uso jerarquia, ritmo y consistencia para que cada decision visual mejore la experiencia y refuerce el producto.",
    tags: ["UI", "Jerarquia", "Consistencia"],
  },
  {
    number: "03",
    title: "VISION DE PRODUCTO",
    description:
      "Trabajo entendiendo contexto, prioridades y uso real, para que lo que se construye tenga sentido mas alla de la pantalla.",
    tags: ["Producto", "UX", "Contexto"],
  },
  {
    number: "04",
    title: "EJECUCION SOLIDA",
    description:
      "Busco una implementacion clara, prolija y confiable, donde la calidad tecnica acompane la idea en lugar de frenarla.",
    tags: ["Calidad", "Implementacion", "Confiabilidad"],
  },
] as const;

export default function StrengthsSection() {
  const prefersReducedMotion = useReducedMotion();
  const introVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });
  const panelVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 22, delay: 0.04 });
  const itemsContainerVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.07,
    delayChildren: 0.06,
  });
  const itemVariants = createRevealVariants(prefersReducedMotion, { distance: 14 });

  return (
    <section
      id="about-strengths"
      data-cursor="dot"
      className="relative cursor-none border-t border-white/10 px-6 py-20 md:px-10 md:py-22 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_22%,rgba(0,117,255,0.1),transparent_42%)]"
      />

      <div className="mx-auto grid w-full max-w-6xl gap-7 lg:grid-cols-[0.36fr_0.64fr] lg:gap-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={introVariants}
          className="lg:pt-2"
        >
          <p className="font-mono text-[0.68rem] tracking-[0.24em] text-[#0075FF] md:text-xs">
            {SECTION_CONTENT.eyebrow}
          </p>
          <h2 className="mt-3 text-[1.9rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-[2.2rem] md:text-[2.5rem] lg:text-[2.8rem]">
            {SECTION_CONTENT.title}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/68 md:text-base">
            {SECTION_CONTENT.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={panelVariants}
          className="overflow-hidden rounded-md border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.02)_0%,rgba(255,255,255,0.008)_46%,rgba(0,117,255,0.045)_100%)]"
        >
          <motion.div variants={itemsContainerVariants} className="grid grid-cols-1 md:grid-cols-2">
            {TECH_STRENGTHS.map((item) => (
              <motion.article
                key={item.number}
                variants={itemVariants}
                className={[
                  "relative flex h-full flex-col p-5 transition-colors duration-300 hover:bg-white/[0.01] md:p-6",
                  "border-t border-white/10 first:border-t-0",
                  "md:[&:nth-child(2)]:border-l md:[&:nth-child(4)]:border-l",
                  "md:[&:nth-child(2)]:border-t-0",
                ].join(" ")}
              >
                <p className="font-mono text-[0.66rem] tracking-[0.2em] text-[#A9D2FF] md:text-xs">
                  {item.number}
                </p>
                <h3 className="mt-2 text-base font-semibold tracking-[0.015em] text-white md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 max-w-[32rem] text-sm leading-relaxed text-white/69 md:text-[0.95rem]">
                  {item.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-sm border border-white/16 bg-black/22 px-2.5 py-1 text-[0.64rem] font-medium tracking-[0.12em] text-white/75"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
