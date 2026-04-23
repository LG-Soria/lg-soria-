import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillsData } from "./model/data";
import { SkillCard } from "./components/SkillCard";
import { SkillsNavigation } from "./components/SkillsNavigation";
import { BackgroundEffect } from "@/shared/components/BackgroundEffect/BackgroundEffect";
import { createRevealVariants, IN_VIEW_ONCE } from "@/shared/lib/motion";

const SKILLS_INTRO = {
  title: "DETRAS DE CADA PROYECTO",
  subtitle:
    "Desde la estructura hasta la implementacion, una forma de trabajar pensada para construir con claridad, consistencia y direccion.",
  sectionMark: "01",
};

export default function SkillsTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prefersReducedMotion = useReducedMotion();
  const headerVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });
  const carouselVariants = createRevealVariants(prefersReducedMotion, { distance: 24, delay: 0.06 });

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(center - cardCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) setActiveIndex(closestIndex);
  };

  const scrollToCard = (index: number) => {
    const card = cardRefs.current[index];
    const container = scrollContainerRef.current;
    if (!card || !container) return;

    const scrollLeft = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;

    container.scrollTo({
      left: scrollLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let timeoutId: number;
    const onScroll = () => {
      window.cancelAnimationFrame(timeoutId);
      timeoutId = window.requestAnimationFrame(handleScroll);
    };

    container.addEventListener("scroll", onScroll);

    return () => {
      container.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(timeoutId);
    };
  }, [activeIndex]);

  useEffect(() => {
    setTimeout(() => scrollToCard(0), 100);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-cursor="dot"
      className="relative w-full overflow-hidden pb-24 pt-20 md:pb-28 md:pt-28"
    >
      <BackgroundEffect sectionRef={sectionRef} />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW_ONCE}
        variants={headerVariants}
        className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10"
      >
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <h2 className="text-4xl font-semibold tracking-[0.01em] text-white md:text-5xl lg:text-[3.35rem]">
              {SKILLS_INTRO.title}
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/68 md:text-base">
              {SKILLS_INTRO.subtitle}
            </p>
          </div>

          <span className="font-mono text-[4.25rem] leading-none tracking-[-0.04em] text-white/16 md:text-[5.6rem] lg:text-[6.4rem]">
            {SKILLS_INTRO.sectionMark}
          </span>
        </div>

        <div className="mt-10 h-px w-full bg-gradient-to-r from-[#0075FF]/75 via-white/14 to-transparent" />
      </motion.div>

      <motion.div
        ref={scrollContainerRef}
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW_ONCE}
        variants={carouselVariants}
        className="relative z-10 mt-12 flex snap-x snap-mandatory items-center overflow-x-auto px-[50vw] pb-16 pt-4 no-scrollbar md:mt-14"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        <div className="shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-225px)]" />

        {skillsData.map((skill, index) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            isActive={index === activeIndex}
            onClick={() => scrollToCard(index)}
            cardRef={(el) => {
              cardRefs.current[index] = el;
            }}
          />
        ))}

        <div className="shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-225px)]" />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={IN_VIEW_ONCE}
        variants={createRevealVariants(prefersReducedMotion, { distance: 14, delay: 0.08 })}
        className="relative top-12 z-10"
      >
        <SkillsNavigation
          skills={skillsData}
          activeIndex={activeIndex}
          onSelect={scrollToCard}
        />
      </motion.div>
    </section>
  );
}
