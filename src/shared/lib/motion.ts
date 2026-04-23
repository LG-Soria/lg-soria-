import type { Transition, Variants } from "framer-motion";

const SOFT_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

type RevealOptions = {
  distance?: number;
  duration?: number;
  delay?: number;
};

type StaggerOptions = {
  stagger?: number;
  delayChildren?: number;
};

export const IN_VIEW_ONCE = { once: true, amount: 0.2 } as const;

const reducedTransition: Transition = { duration: 0.01, ease: "linear" };

export function createRevealVariants(
  reduceMotion: boolean | null,
  { distance = 20, duration = 0.56, delay = 0 }: RevealOptions = {},
): Variants {
  const shouldReduceMotion = Boolean(reduceMotion);

  return {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? reducedTransition
        : { duration, delay, ease: SOFT_EASE },
    },
  };
}

export function createRevealScaleVariants(
  reduceMotion: boolean | null,
  { distance = 20, duration = 0.62, delay = 0 }: RevealOptions = {},
): Variants {
  const shouldReduceMotion = Boolean(reduceMotion);

  return {
    hidden: shouldReduceMotion
      ? { opacity: 1, y: 0, scale: 1 }
      : { opacity: 0, y: distance, scale: 0.985 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: shouldReduceMotion
        ? reducedTransition
        : { duration, delay, ease: SOFT_EASE },
    },
  };
}

export function createStaggerContainerVariants(
  reduceMotion: boolean | null,
  { stagger = 0.1, delayChildren = 0 }: StaggerOptions = {},
): Variants {
  const shouldReduceMotion = Boolean(reduceMotion);

  return {
    hidden: {},
    visible: {
      transition: shouldReduceMotion
        ? { duration: 0.01 }
        : { staggerChildren: stagger, delayChildren, ease: SOFT_EASE },
    },
  };
}
