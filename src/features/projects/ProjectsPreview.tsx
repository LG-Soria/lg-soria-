import { Link } from "react-router";
import { motion, useReducedMotion } from "framer-motion";
import ProjectsList from "./ProjectsList";
import { projects } from "./model/data";
import {
    createRevealVariants,
    createStaggerContainerVariants,
    IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const PROJECTS_PREVIEW = {
    title: "PROYECTOS REALES",
    subtitle: "Una seleccion de trabajos donde la estructura, el criterio visual y la implementacion se convierten en experiencia concreta.",
    sectionMark: "02",
    ctaLabel: "Ver todos los proyectos",
};

export default function ProjectsPreview() {
    const featuredProjects = projects.slice(0, 2);
    const prefersReducedMotion = useReducedMotion();
    const sectionVariants = createStaggerContainerVariants(prefersReducedMotion, {
        stagger: 0.08,
        delayChildren: 0.04,
    });
    const blockVariants = createRevealVariants(prefersReducedMotion, { distance: 18 });

    return (
        <motion.section
            id="proyectos"
            data-cursor="inversion"
            initial="hidden"
            whileInView="visible"
            viewport={IN_VIEW_ONCE}
            variants={sectionVariants}
            className="relative w-full cursor-none overflow-hidden pb-16 pt-16 md:pb-20 md:pt-20 lg:pb-28 lg:pt-28"
        >
            <motion.div variants={blockVariants} className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
                <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end md:gap-7 lg:gap-8">
                    <div>
                        <h2 className="text-4xl font-semibold tracking-[0.01em] text-white md:text-5xl lg:text-[3.35rem]">
                            {PROJECTS_PREVIEW.title}
                        </h2>
                        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/68 md:mt-5 md:text-base">
                            {PROJECTS_PREVIEW.subtitle}
                        </p>
                    </div>

                    <span className="font-mono text-[4.25rem] leading-none tracking-[-0.04em] text-white/16 md:text-[5.6rem] lg:text-[6.4rem]">
                        {PROJECTS_PREVIEW.sectionMark}
                    </span>
                </div>

                <div className="mt-7 h-px w-full bg-gradient-to-r from-[#0075FF]/75 via-white/14 to-transparent md:mt-8 lg:mt-10" />
            </motion.div>

            <motion.div variants={blockVariants} className="relative z-10 mx-auto mt-8 w-full max-w-8xl px-6 md:mt-9 md:px-10 lg:mt-14">
                <ProjectsList items={featuredProjects} compact alternate />
            </motion.div>

            <motion.div variants={blockVariants} className="relative z-10 mx-auto mt-8 flex w-full max-w-7xl justify-center px-6 md:mt-10 md:px-10 lg:mt-12">
                <Link
                    to="/projects"
                    className="inline-flex cursor-none items-center justify-center rounded-sm border border-white/35 bg-transparent px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-[#0075FF]/60 hover:text-[#B8D8FF]"
                >
                    {PROJECTS_PREVIEW.ctaLabel}
                </Link>
            </motion.div>
        </motion.section>
    );
}
