import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

export function useProjectAnimation(ref: RefObject<HTMLDivElement | null>) {
    const { scrollYProgress: parallaxProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const yParallax = useTransform(parallaxProgress, [0, 1], ["-10%", "10%"]);

    const { scrollYProgress: entryProgress } = useScroll({
        target: ref,
        offset: ["start end", "center center"],
    });

    const opacity = useTransform(entryProgress, [0, 0.5], [0, 1]);
    const y = useTransform(entryProgress, [0, 1], [100, 0]);

    return { yParallax, opacity, y };
}
