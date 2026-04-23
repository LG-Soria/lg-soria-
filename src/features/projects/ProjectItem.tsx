import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiArrowRight } from "@/shared/ui/icons";
import { Project } from "@/shared/types";
import { useProjectAnimation } from "./hooks/useProjectAnimation";
import ProjectMediaGallery from "./ProjectMediaGallery";
import {
    createRevealScaleVariants,
    createRevealVariants,
    createStaggerContainerVariants,
} from "@/shared/lib/motion";

interface ProjectItemProps {
    project: Project;
    index: number;
    compact?: boolean;
    contained?: boolean;
    reverse?: boolean;
}

export default function ProjectItem({
    project,
    index,
    compact = false,
    contained = false,
    reverse = false,
}: ProjectItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();
    const { yParallax, opacity, y } = useProjectAnimation(ref);
    const isCompactReverse = compact && reverse;
    const isFullReverse = !compact && reverse;
    const isContained = !compact && contained;
    const containedImageVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 18 });
    const containedTextContainerVariants = createStaggerContainerVariants(prefersReducedMotion, {
        stagger: 0.06,
        delayChildren: 0.03,
    });
    const containedTextItemVariants = createRevealVariants(prefersReducedMotion, { distance: 12 });
    const containedViewport = { once: true, amount: 0.32 };
    const compactGridClass = isCompactReverse
        ? "md:grid-cols-[37%_60%]"
        : "md:grid-cols-[60%_38%]";
    const fullGridClass = isFullReverse
        ? "md:grid-cols-[40%_60%]"
        : "md:grid-cols-[60%_40%]";
    const containedGridClass = isFullReverse
        ? "md:grid-cols-[42%_58%]"
        : "md:grid-cols-[58%_42%]";
    const projectImages =
        project.images?.length
            ? project.images
            : project.image
                ? [project.image]
                : [];

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className={compact
                ? `group group/project relative grid h-auto w-full grid-cols-1 items-center gap-7 snap-start border-b border-white/8 py-10 last:border-b-0 ${compactGridClass} sm:gap-8 sm:py-11 md:gap-10 md:py-12 lg:gap-14 lg:py-16`
                : isContained
                    ? `group group/project relative grid h-auto w-full grid-cols-1 items-center gap-7 snap-start border-b border-white/8 py-12 last:border-b-0 ${containedGridClass} md:gap-10 md:py-14 lg:gap-12 lg:py-16`
                    : `group group/project relative grid h-auto min-h-[auto] w-full grid-cols-1 items-center gap-8 snap-start border-b border-white/5 py-16 last:border-b-0 ${fullGridClass} md:h-screen md:min-h-screen md:gap-16 md:py-0`
            }
        >
            {/* Columna de Imagen */}
            <motion.div
                initial={isContained ? "hidden" : false}
                whileInView={isContained ? "visible" : undefined}
                viewport={isContained ? containedViewport : undefined}
                variants={isContained ? containedImageVariants : undefined}
                className={compact
                ? `relative min-w-0 h-[34vh] w-full overflow-hidden rounded-lg border border-white/12 sm:h-[38vh] md:h-[42vh] lg:h-[66vh] ${isCompactReverse ? "md:order-2" : "md:order-1"}`
                : isContained
                    ? `relative h-[40vh] w-full overflow-hidden rounded-lg border border-white/10 md:h-[52vh] lg:h-[60vh] ${isFullReverse ? "md:order-2" : "md:order-1"}`
                    : `relative h-[50vh] w-full overflow-hidden rounded-lg border border-white/10 md:h-[80vh] ${isFullReverse ? "md:order-2" : "md:order-1"}`
            }>
                <ProjectMediaGallery
                    images={projectImages}
                    alt={project.title}
                    parallaxY={yParallax}
                />
            </motion.div>

            {/* Columna de Informacion */}
            <motion.div
                initial={isContained ? "hidden" : false}
                whileInView={isContained ? "visible" : undefined}
                viewport={isContained ? containedViewport : undefined}
                variants={isContained ? containedTextContainerVariants : undefined}
                className={compact
                ? `min-w-0 flex flex-col justify-center px-1 md:px-0 md:py-4 ${isCompactReverse ? "md:order-1" : "md:order-2"}`
                : isContained
                    ? `flex flex-col justify-center px-2 md:px-0 md:py-6 lg:py-8 ${isFullReverse ? "md:order-1" : "md:order-2"}`
                    : `flex flex-col justify-center px-6 md:px-0 md:py-12 ${isFullReverse ? "md:order-1" : "md:order-2"}`
            }>
                <motion.div
                    variants={isContained ? containedTextItemVariants : undefined}
                    className={compact ? "relative mb-3 md:mb-4 lg:mb-6" : isContained ? "relative mb-3 md:mb-5" : "relative mb-4 md:mb-6"}
                >
                    <span className={compact
                        ? "block text-5xl font-extrabold leading-none tracking-tighter text-white/6 md:text-7xl"
                        : isContained
                            ? "block text-5xl font-extrabold leading-none tracking-tighter text-white/6 md:text-7xl"
                            : "block text-6xl font-extrabold leading-none tracking-tighter text-white/5 md:text-8xl"
                    }>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={compact
                        ? "absolute top-0 left-0 block text-5xl font-extrabold leading-none tracking-tighter bg-gradient-to-b from-[#0075FF] to-[#0044CC] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-7xl"
                        : isContained
                            ? "absolute top-0 left-0 block text-5xl font-extrabold leading-none tracking-tighter bg-gradient-to-b from-[#0075FF] to-[#0044CC] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-7xl"
                            : "absolute top-0 left-0 block text-6xl font-extrabold leading-none tracking-tighter bg-gradient-to-b from-[#0075FF] to-[#0044CC] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-8xl"
                    }>
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </motion.div>

                <motion.h3
                    initial={isContained ? undefined : { opacity: 0, x: 20 }}
                    whileInView={isContained ? undefined : { opacity: 1, x: 0 }}
                    viewport={isContained ? undefined : { once: true }}
                    transition={isContained ? undefined : { duration: 0.5, delay: 0.2 }}
                    variants={isContained ? containedTextItemVariants : undefined}
                    className={compact
                        ? "mb-3 text-3xl font-bold leading-tight tracking-tight text-white md:mb-4 md:text-[2.65rem] lg:mb-6"
                        : isContained
                            ? "mb-3 text-3xl font-bold leading-tight tracking-tight text-white md:mb-5 md:text-[2.1rem] lg:text-[2.35rem]"
                            : "mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-[40px] md:mb-6"
                    }
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    initial={isContained ? undefined : { opacity: 0, x: 20 }}
                    whileInView={isContained ? undefined : { opacity: 1, x: 0 }}
                    viewport={isContained ? undefined : { once: true }}
                    transition={isContained ? undefined : { duration: 0.5, delay: 0.3 }}
                    variants={isContained ? containedTextItemVariants : undefined}
                    className={compact
                        ? "mb-6 max-w-[96%] text-lg leading-relaxed text-gray-400 md:mb-7 md:text-[1.15rem] lg:mb-8"
                        : isContained
                            ? "mb-6 max-w-[95%] text-base leading-relaxed text-gray-400 md:mb-7 md:text-[1.02rem]"
                            : "mb-8 max-w-[90%] text-lg leading-relaxed text-gray-400 md:text-lg"
                    }
                >
                    {project.description}
                </motion.p>

                <motion.div
                    initial={isContained ? undefined : { opacity: 0, y: 20 }}
                    whileInView={isContained ? undefined : { opacity: 1, y: 0 }}
                    viewport={isContained ? undefined : { once: true }}
                    transition={isContained ? undefined : { duration: 0.5, delay: 0.4 }}
                    variants={isContained ? containedTextItemVariants : undefined}
                    className={compact
                        ? "mb-6 flex flex-wrap items-center gap-3.5 md:mb-7 lg:mb-8"
                        : isContained
                            ? "mb-6 flex flex-wrap items-center gap-3 md:mb-7"
                            : "mb-8 flex flex-wrap items-center gap-3"}
                >
                    <span className="mr-2 text-sm font-semibold text-gray-500">Stack:</span>
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className={compact
                                ? "rounded-full border border-blue-500/30 bg-blue-500/5 px-5 py-2 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
                                : isContained
                                    ? "rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-500 hover:text-white md:text-sm"
                                    : "rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
                            }
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>

                <motion.a
                    initial={isContained ? undefined : { opacity: 0, y: 20 }}
                    whileInView={isContained ? undefined : { opacity: 1, y: 0 }}
                    viewport={isContained ? undefined : { once: true }}
                    transition={isContained ? undefined : { duration: 0.5, delay: 0.5 }}
                    variants={isContained ? containedTextItemVariants : undefined}
                    href={project.link}
                    target="_blank"
                    className={compact
                        ? "group/link inline-flex items-center gap-2 text-[1.05rem] font-semibold text-white cursor-none"
                        : isContained
                            ? "group/link inline-flex items-center gap-2 text-[0.98rem] font-semibold text-white cursor-none md:text-base"
                            : "group/link inline-flex items-center gap-2 text-base font-semibold text-white cursor-none"
                    }
                >
                    <span className="relative">
                        Ver Proyecto
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover/project:w-full"></span>
                    </span>
                    <FiArrowRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover/project:translate-x-1 group-hover/link:-translate-y-[1px] group-hover/link:rotate-[-40deg]" />
                </motion.a>
            </motion.div>
        </motion.div>
    );
}
