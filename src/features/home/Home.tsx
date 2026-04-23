import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ActionLink } from "@/shared/ui/ActionLink";
import { useProjectAnimation } from "@/features/projects/hooks/useProjectAnimation";
import {
  createRevealScaleVariants,
  createRevealVariants,
  createStaggerContainerVariants,
  IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const HERO_CONTENT = {
  eyebrow: "PRINCIPIOS QUE GUÍAN MI TRABAJO",
  headlineLineOne: "SISTEMA",
  headlineAccent: "CREATIVIDAD",
  headlineLineTwo: "CONSTRUIR CON CRITERIO.",
  description:
    "Combino mirada de producto, criterio visual y desarrollo frontend para convertir ideas en experiencias digitales claras y consistentes.",
  primaryCta: {
    label: "Ver proyectos",
    href: "/projects",
  },
  secondaryCta: {
    label: "Hablar por WhatsApp",
    href: "https://wa.me/1132551333",
  },
};

export default function Home() {
  const transitionRef = useRef<HTMLElement>(null);
  const transitionImageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { yParallax } = useProjectAnimation(transitionImageRef);
  const heroContainerVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.12,
    delayChildren: 0.06,
  });
  const heroItemVariants = createRevealVariants(prefersReducedMotion, { distance: 18 });
  const transitionVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 22 });

  return (
    <>
      <section
        id="inicio"
        data-cursor="inversion"
        className="relative z-20 w-full cursor-none overflow-hidden px-6 pb-6 pt-20 md:px-10 md:pb-8 md:pt-24 lg:pb-10 lg:pt-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(0,117,255,0.22),transparent_45%),radial-gradient(circle_at_78%_12%,rgba(255,255,255,0.08),transparent_36%),linear-gradient(180deg,#030303_0%,#050505_38%,#020202_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-[#0075FF]/20 blur-[90px] md:h-72 md:w-72"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-40 h-44 w-44 rounded-full bg-white/6 blur-[75px] md:h-60 md:w-60"
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={heroContainerVariants}
          className="relative mx-auto flex min-h-[58vh] max-w-6xl items-end pb-6 md:min-h-[62vh] md:pb-8 lg:min-h-[70vh] lg:pb-16"
        >
          <div className="max-w-[52rem]">
            <motion.div variants={heroItemVariants} className="mb-5 inline-flex items-center gap-3 md:mb-6 lg:mb-7">
              <span aria-hidden="true" className="h-5 w-px bg-[#0075FF]/85 md:h-6" />
              <p className="font-mono text-xs tracking-[0.24em] text-[#0075FF] md:text-sm">
                {HERO_CONTENT.eyebrow}
              </p>
            </motion.div>

            <motion.h1
              variants={heroItemVariants}
              className="text-balance text-[2.25rem] font-semibold leading-[1.03] tracking-tight text-white sm:text-[2.85rem] md:text-6xl lg:text-[4.15rem]"
            >
              <span className="block">{HERO_CONTENT.headlineLineOne}</span>
              <span className="block text-[#0075FF]">{HERO_CONTENT.headlineAccent}</span>
              <span className="block text-white">{HERO_CONTENT.headlineLineTwo}</span>
            </motion.h1>

            <motion.p variants={heroItemVariants} className="mt-6 max-w-xl text-base leading-relaxed text-white/68 md:mt-7 md:text-lg lg:mt-8">
              {HERO_CONTENT.description}
            </motion.p>

            <motion.div variants={heroItemVariants} className="mt-7 flex flex-wrap items-center gap-6 md:mt-8 lg:mt-9">
              <ActionLink
                to={HERO_CONTENT.primaryCta.href}
                action="internal"
                variant="primary"
              >
                {HERO_CONTENT.primaryCta.label}
              </ActionLink>
              <ActionLink
                href={HERO_CONTENT.secondaryCta.href}
                action="whatsapp"
                variant="secondary"
              >
                {HERO_CONTENT.secondaryCta.label}
              </ActionLink>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section
        ref={transitionRef}
        data-cursor="inversion"
        className="relative -mt-6 w-full cursor-none pb-0 pt-0 md:-mt-8 md:pb-0"
      >
        <motion.div
          ref={transitionImageRef}
          variants={transitionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          className="relative h-[42vh] overflow-hidden border-b border-white/10 bg-neutral-950 md:h-[56vh]"
        >
          <motion.img
            src="/image_parallax.jpg"
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover object-center transition-all duration-700"
            style={prefersReducedMotion ? { scale: 1.1 } : { y: yParallax, scale: 1.1 }}
            loading="lazy"
          />
          <div className="pointer-events-none absolute inset-0 bg-black/20" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_74%_18%,rgba(0,117,255,0.18),transparent_44%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/26" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020202] via-[#020202]/55 to-transparent md:h-32" />
        </motion.div>
      </section>
    </>
  );
}
