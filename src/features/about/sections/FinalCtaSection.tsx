import { motion, useReducedMotion } from "framer-motion";
import { ActionLink } from "@/shared/ui/ActionLink";
import {
  createRevealScaleVariants,
  createRevealVariants,
  createStaggerContainerVariants,
} from "@/shared/lib/motion";

const FINAL_CTA_CONTENT = {
  headlineLineOnePrefix: "SI HAY ALGO",
  headlineLineOneHighlight: "VALIOSO",
  headlineLineTwoPrefix: "PARA CONSTRUIR,",
  headlineLineTwoHighlight: "HABLEMOS.",
  headlineLineThree: "",
  secondaryText:
    "Si buscas claridad, criterio y una implementacion bien pensada, podemos conversar sobre lo que sigue.",
  primaryCtaLabel: "Ver proyectos",
  secondaryCtaLabel: "Hablar por WhatsApp",
  // Reuse existing placeholder format from Contact section until final number is defined.
  whatsappHref: "https://wa.me/1132551333",
} as const;

export default function FinalCtaSection() {
  const prefersReducedMotion = useReducedMotion();
  const contentVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.12,
    delayChildren: 0.05,
  });
  const itemVariants = createRevealVariants(prefersReducedMotion, { distance: 20 });
  const actionsVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 16, delay: 0.08 });

  return (
    <section
      id="about-cta"
      data-cursor="inversion"
      className="relative cursor-none border-t border-white/10 px-6 pb-22 pt-20 md:px-10 md:pb-24 md:pt-22 lg:pb-28 lg:pt-26"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_52%_12%,rgba(0,117,255,0.1),transparent_46%)]"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={contentVariants}
          className="max-w-[42rem]"
        >
          <motion.h2 variants={itemVariants} className="text-balance text-[2.08rem] font-semibold leading-[0.98] tracking-tight text-white sm:text-[2.7rem] md:text-[3.8rem] lg:text-[4rem]">
            <span className="block">
              {FINAL_CTA_CONTENT.headlineLineOnePrefix}{" "}
              <span className="text-[#0075FF]">{FINAL_CTA_CONTENT.headlineLineOneHighlight}</span>
            </span>
            <span className="mt-1 block md:mt-2">
              {FINAL_CTA_CONTENT.headlineLineTwoPrefix}{" "}
              <span className="text-[#0075FF]">{FINAL_CTA_CONTENT.headlineLineTwoHighlight}</span>
            </span>
            {FINAL_CTA_CONTENT.headlineLineThree ? (
              <span className="mt-1 block md:mt-2">
                {FINAL_CTA_CONTENT.headlineLineThree}
              </span>
            ) : null}
          </motion.h2>

          <motion.p variants={itemVariants} className="mt-5 max-w-lg text-sm leading-relaxed text-white/64 md:mt-6 md:text-base">
            {FINAL_CTA_CONTENT.secondaryText}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.45 }}
          variants={actionsVariants}
          className="flex w-full max-w-lg flex-col gap-3 sm:flex-row sm:gap-4 lg:max-w-none lg:flex-col lg:items-stretch"
        >
          <ActionLink
            to="/projects"
            action="internal"
            variant="primary"
          >
            {FINAL_CTA_CONTENT.primaryCtaLabel}
          </ActionLink>
          <ActionLink
            href={FINAL_CTA_CONTENT.whatsappHref}
            action="whatsapp"
            variant="secondary"
          >
            {FINAL_CTA_CONTENT.secondaryCtaLabel}
          </ActionLink>
        </motion.div>
      </div>
    </section>
  );
}
