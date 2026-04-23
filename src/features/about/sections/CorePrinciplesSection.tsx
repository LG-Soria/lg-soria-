import { LuCode, LuServer, LuGlobe } from "@/shared/ui/icons";
import { motion, useReducedMotion } from "framer-motion";
import {
  createRevealVariants,
  createStaggerContainerVariants,
  IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const SECTION_CONTENT = {
  eyebrow: "CORE PRINCIPLES",
  title: "LO QUE GUÍA MI TRABAJO",
  subtitle:
    "Tres principios que ordenan como pienso, diseño y desarrollo productos digitales.",
} as const;

const CORE_PRINCIPLES = [
  {
    title: "CLARIDAD ESTRUCTURAL",
    description:
      "Busco que cada interfaz tenga orden, jerarquia y una logica clara, para que usarla sea simple y entenderla tambien.",
    Icon: LuCode,
    featured: true,
  },
  {
    title: "SOLIDEZ TÉCNICA",
    description:
      "Trabajo con una base pensada para sostener el crecimiento del proyecto, mantener consistencia y evitar soluciones improvisadas.",
    Icon: LuServer,
    featured: false,
  },
  {
    title: "CRITERIO DE PRODUCTO",
    description:
      "No se trata solo de disenar o implementar, sino de tomar decisiones que tengan sentido en el contexto real del producto.",
    Icon: LuGlobe,
    featured: false,
  },
] as const;

export default function CorePrinciplesSection() {
  const prefersReducedMotion = useReducedMotion();
  const headerVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });
  const cardsContainerVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.08,
    delayChildren: 0.05,
  });
  const cardVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });

  return (
    <section
      id="about-principles"
      data-cursor="inversion"
      className="relative cursor-none border-t border-white/10 px-6 py-20 md:px-10 md:py-22 lg:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(0,117,255,0.08),transparent_44%)]"
      />

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={headerVariants}
          className="grid gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-end"
        >
          <div>
            <p className="font-mono text-[0.68rem] tracking-[0.24em] text-[#0075FF] md:text-xs">
              {SECTION_CONTENT.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.9rem] font-semibold leading-[1.02] tracking-tight text-white sm:text-[2.2rem] md:text-[2.6rem] lg:text-[2.9rem]">
              {SECTION_CONTENT.title}
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-white/68 md:justify-self-end md:text-base">
            {SECTION_CONTENT.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={cardsContainerVariants}
          className="mt-9 grid gap-4 md:grid-cols-[1.1fr_0.9fr] md:gap-5"
        >
          {CORE_PRINCIPLES.filter((item) => item.featured).map((item) => (
            <motion.article
              key={item.title}
              variants={cardVariants}
              className="flex h-full flex-col rounded-md border border-white/12 bg-[linear-gradient(150deg,rgba(255,255,255,0.026)_0%,rgba(255,255,255,0.01)_46%,rgba(0,117,255,0.065)_100%)] p-5 transition-colors duration-300 hover:border-[#0075FF]/30 md:p-7"
            >
              <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-sm border border-[#0075FF]/34 bg-[#0075FF]/12 text-[#B8D8FF]">
                <item.Icon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
              </div>
              <h3 className="text-base font-semibold tracking-[0.02em] text-white md:text-xl">
                {item.title}
              </h3>
              <p className="mt-3 max-w-[32rem] text-sm leading-relaxed text-white/70 md:text-[1rem]">
                {item.description}
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#0075FF]/60 via-white/12 to-transparent" />
            </motion.article>
          ))}

          <div className="grid gap-4">
            {CORE_PRINCIPLES.filter((item) => !item.featured).map((item) => (
              <motion.article
                key={item.title}
                variants={cardVariants}
                className="flex h-full flex-col rounded-md border border-white/12 bg-[linear-gradient(150deg,rgba(255,255,255,0.022)_0%,rgba(255,255,255,0.01)_46%,rgba(0,117,255,0.045)_100%)] p-5 transition-colors duration-300 hover:border-[#0075FF]/28 md:p-6"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-sm border border-[#0075FF]/30 bg-[#0075FF]/10 text-[#B8D8FF]">
                  <item.Icon className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold tracking-[0.02em] text-white md:text-lg">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70 md:text-[0.95rem]">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
