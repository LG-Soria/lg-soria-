import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { BackgroundEffect } from "@/shared/components/BackgroundEffect/BackgroundEffect";
import { BannerMarquee } from "@/shared/ui/BannerMarquee";
import { ActionLink } from "@/shared/ui/ActionLink";
import { TitleLink } from "@/shared/ui/TitleLink";
import {
  createRevealVariants,
  createStaggerContainerVariants,
  IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const CONTACT_CTA = {
  eyebrow: "DISPONIBLE PARA NUEVOS PROYECTOS",
  titleLineOne: "CONSTRUYAMOS ALGO",
  titleLineTwo: "CON IMPACTO REAL",
  subtitle:
    "Si hay una idea, un producto o una oportunidad que valga la pena desarrollar, podemos conversarlo.",
  buttonLabel: "Hablar por WhatsApp",
  buttonHref: "https://wa.me/1132551333",
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const sectionVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.08,
    delayChildren: 0.05,
  });
  const blockVariants = createRevealVariants(prefersReducedMotion, { distance: 18 });

  return (
    <section
      ref={sectionRef}
      id="contacto"
      data-cursor="dot"
      className="relative flex flex-col overflow-visible border-x pb-8 md:pb-10 lg:min-h-[82vh] lg:pb-20"
    >
      <BackgroundEffect sectionRef={sectionRef} />

      <BannerMarquee
        text="CONTACTO"
        separator="•"
        speed={60}
        direction="left"
        heightClass="h-24 z-40 sm:h-28 md:h-32 lg:h-36"
        textClass="text-4xl sm:text-5xl md:text-6xl lg:text-8xl"
        bgClass="bg-white"
        colorClass="text-black"
      />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW_ONCE}
        variants={sectionVariants}
      >
        <motion.div variants={blockVariants} className="relative z-10 mx-auto mt-10 w-full max-w-4xl px-6 text-center md:mt-12 md:px-10 lg:mt-16">
          <p className="font-mono text-xs tracking-[0.22em] text-[#0075FF] md:text-sm">
            {CONTACT_CTA.eyebrow}
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white md:mt-4 md:text-5xl">
            <span className="block">{CONTACT_CTA.titleLineOne}</span>
            <span className="block">{CONTACT_CTA.titleLineTwo}</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/68 md:text-base">
            {CONTACT_CTA.subtitle}
          </p>
          <div className="mt-6 md:mt-7 lg:mt-8">
            <ActionLink
              href={CONTACT_CTA.buttonHref}
              action="whatsapp"
              variant="primary"
            >
              {CONTACT_CTA.buttonLabel}
            </ActionLink>
          </div>
        </motion.div>

        <motion.div variants={blockVariants} className="relative z-10 mt-12 grid w-full grid-cols-1 gap-10 px-6 md:mt-14 md:grid-cols-2 md:gap-12 md:px-12 lg:mt-20 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:px-20 xl:gap-16 xl:px-40">
          <div className="min-w-0 flex items-start justify-start">
            <TitleLink
              label="CURRICULUM"
              href="/Lucas_Soria_CV.pdf"
              download
              action="download"
              align="left"
              lineWidth="w-[min(100%,32rem)]"
              color="white"
              arrowPosition="right"
            />
          </div>

          <div className="min-w-0 flex flex-col items-end space-y-6 md:space-y-7 lg:space-y-8">
            <TitleLink
              label="LINKEDIN"
              href="https://www.linkedin.com/in/lucas-soria-g/"
              action="external"
              align="right"
              lineWidth="w-[min(100%,20rem)]"
              color="white"
              arrowPosition="left"
            />
            <TitleLink
              label="GITHUB"
              href="https://github.com/LG-Soria"
              action="external"
              align="right"
              lineWidth="w-[min(100%,20rem)]"
              color="white"
              arrowPosition="left"
            />
            <TitleLink
              label="EMAIL"
              href="mailto:lucasoria1996@gmail.com"
              action="external"
              align="right"
              lineWidth="w-[min(100%,14rem)]"
              color="white"
              arrowPosition="left"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
