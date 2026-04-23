import { motion, useReducedMotion } from "framer-motion";
import {
  createRevealScaleVariants,
  createRevealVariants,
  createStaggerContainerVariants,
} from "@/shared/lib/motion";

const HERO_CONTENT = {
  eyebrow: "MI RECORRIDO",
  headlineLineOne: "DEL DISEÑO,",
  headlineLineTwoAccent: "AL PRODUCTO",
  headlineLineTwoRest: "",
  headlineLineThree: "Y A LA IMPLEMENTACION.",
  description:
    "Empece desde lo visual, pero con el tiempo esa mirada se convirtio en una forma mas integral de pensar y construir productos digitales.",
  badgeYears: "+8 ANOS",
  badgeLabel: "ENTRE DISEÑO Y DESARROLLO",
} as const;

const HERO_MEDIA = {
  // Set this path when the final portrait/hero image is available.
  imageSrc: "/about_photo.png",
  imageAlt: "Retrato profesional",
} as const;

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const contentVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.1,
    delayChildren: 0.04,
  });
  const itemVariants = createRevealVariants(prefersReducedMotion, { distance: 18 });
  const mediaVariants = createRevealScaleVariants(prefersReducedMotion, {
    distance: 18,
    delay: 0.08,
  });

  return (
    <section
      id="about-hero"
      data-cursor="inversion"
      className="relative cursor-none overflow-hidden px-6 pb-18 pt-22 md:px-10 md:pb-22 md:pt-26 lg:pb-24 lg:pt-30"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(0,117,255,0.18),transparent_46%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.07),transparent_34%),linear-gradient(180deg,#040404_0%,#050505_46%,#020202_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-8 h-52 w-52 rounded-full bg-[#0075FF]/16 blur-[80px] md:h-64 md:w-64"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-9 lg:min-h-[66vh] lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-12">
        <motion.div
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          className="max-w-[37rem]"
        >
          <motion.p variants={itemVariants} className="font-mono text-[0.68rem] tracking-[0.24em] text-[#0075FF] md:text-xs">
            {HERO_CONTENT.eyebrow}
          </motion.p>

          <motion.h1 variants={itemVariants} className="mt-5 text-[2.08rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-[2.7rem] md:text-[3.65rem] lg:text-[3.9rem]">
            <span className="block">{HERO_CONTENT.headlineLineOne}</span>
            <span className="mt-1 block md:mt-2">
              <span className="text-[#0075FF]">{HERO_CONTENT.headlineLineTwoAccent}</span>
              {HERO_CONTENT.headlineLineTwoRest ? (
                <>
                  {" "}
                  <span>{HERO_CONTENT.headlineLineTwoRest}</span>
                </>
              ) : null}
            </span>
            {HERO_CONTENT.headlineLineThree ? (
              <span className="mt-1 block text-[0.72em] leading-[1.02] md:mt-2">
                {HERO_CONTENT.headlineLineThree}
              </span>
            ) : null}
          </motion.h1>

          <motion.p variants={itemVariants} className="mt-6 max-w-[34rem] text-sm leading-relaxed text-white/68 md:mt-7 md:text-base lg:text-lg">
            {HERO_CONTENT.description}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.34 }}
          variants={mediaVariants}
          className="relative w-full max-w-[36.5rem] lg:justify-self-end"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-md border border-white/12 bg-[#0a0a0a] sm:aspect-[4/3] lg:aspect-[5/6]">
            <img
              src={HERO_MEDIA.imageSrc}
              alt={HERO_MEDIA.imageAlt}
              className="h-full w-full object-cover object-[center_20%] saturate-[0.74] contrast-[1.08] brightness-[0.8] sm:object-[center_18%] lg:object-[center_14%]"
              loading="lazy"
            />

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/52 via-black/18 to-transparent" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_22%,rgba(0,117,255,0.12),transparent_44%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/45 to-transparent" />
            <div className="pointer-events-none absolute -inset-px bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%,rgba(0,117,255,0.16))] opacity-45" />
          </div>

          <div className="absolute -bottom-4 right-4 rounded-md border border-[#0075FF]/42 bg-black/90 px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm md:-bottom-5 md:right-5 md:px-5 md:py-3.5">
            <p className="font-mono text-xs tracking-[0.18em] text-[#B8D8FF]">
              {HERO_CONTENT.badgeYears}
            </p>
            <p className="mt-1 text-[0.68rem] font-semibold tracking-[0.12em] text-white/90 md:text-[0.72rem]">
              {HERO_CONTENT.badgeLabel}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
