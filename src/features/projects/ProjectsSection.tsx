import { motion, useReducedMotion } from "framer-motion";
import ProjectsList from "./ProjectsList";
import { projects } from "./model/data";
import {
    createRevealScaleVariants,
    createRevealVariants,
    createStaggerContainerVariants,
    IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const PROJECTS_PAGE_HEADER = {
    eyebrow: "ARCHIVO DE PROYECTOS",
    titleLead: "PROYECTOS",
    titleAccent: "REALES",
};

const PROJECTS_PAGE_CTA = {
    titleLineOne: "HABLEMOS DE TU",
    titleLineTwo: "PROXIMO PROYECTO",
    primaryButtonLabel: "Iniciar conversacion",
    primaryButtonHref: "https://wa.me/XXXXXXXXXXX",
    secondaryButtonLabel: "Descargar CV",
    secondaryButtonHref: "/Lucas_Soria_CV.pdf",
};

const PROJECTS_PAGE_DESCRIPTIONS: Record<number, string> = {
    1: "Plataforma para organizar la busqueda laboral en un solo flujo, con seguimiento claro de postulaciones y decisiones.",
    2: "Sitio de presentacion para un servicio de filtros y dispensers, orientado a explicar la propuesta con claridad y facilitar el primer contacto.",
    3: "Herramienta de gestion para clases y asistencia, pensada para ordenar la operacion diaria del estudio y simplificar la coordinacion.",
    4: "Ecommerce para una marca artesanal, enfocado en mostrar catalogo, identidad y proceso de compra de forma simple y consistente.",
};

export default function ProjectsSection() {
    const prefersReducedMotion = useReducedMotion();
    const projectsPageItems = projects.map((project) => ({
        ...project,
        description: PROJECTS_PAGE_DESCRIPTIONS[project.id] ?? project.description,
    }));
    const introVariants = createStaggerContainerVariants(prefersReducedMotion, {
        stagger: 0.08,
        delayChildren: 0.04,
    });
    const introItemVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });
    const listVariants = createRevealVariants(prefersReducedMotion, { distance: 20, delay: 0.04 });
    const ctaVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 20 });
    const ctaButtonsVariants = createStaggerContainerVariants(prefersReducedMotion, {
        stagger: 0.08,
        delayChildren: 0.05,
    });
    const ctaButtonItemVariants = createRevealVariants(prefersReducedMotion, { distance: 12 });

    return (
        <section
            id="proyectos"
            data-cursor="inversion"
            className="relative w-full cursor-none overflow-hidden pb-20 pt-24 md:pb-24 md:pt-28 lg:pb-28"
        >
            <motion.div
                initial="hidden"
                animate="visible"
                variants={introVariants}
                className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10"
            >
                <motion.div variants={introItemVariants} className="inline-flex items-center gap-3">
                    <span aria-hidden="true" className="h-5 w-px bg-[#0075FF]/85 md:h-6" />
                    <p className="font-mono text-xs tracking-[0.22em] text-[#0075FF] md:text-sm">
                        {PROJECTS_PAGE_HEADER.eyebrow}
                    </p>
                </motion.div>

                <motion.h1
                    variants={introItemVariants}
                    className="mt-6 text-balance text-[2.25rem] font-semibold leading-[1.04] tracking-[0.01em] text-white sm:text-[2.8rem] md:text-[3.45rem] lg:text-[4.05rem]"
                >
                    <span className="block text-white">{PROJECTS_PAGE_HEADER.titleLead}</span>
                    <span className="block text-[#0075FF]">{PROJECTS_PAGE_HEADER.titleAccent}</span>
                </motion.h1>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={IN_VIEW_ONCE}
                variants={listVariants}
                className="relative z-10 mx-auto mt-12 w-full max-w-8xl px-6 md:mt-14 md:px-10"
            >
                <ProjectsList items={projectsPageItems} alternate contained />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={ctaVariants}
                className="relative z-10 mx-auto mt-20 w-full max-w-6xl px-6 md:mt-24 md:px-10"
            >
                <div className="border-t border-white/12 pt-12 md:pt-14">
                    <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-[2.7rem] lg:text-[3.1rem]">
                        <span className="block">{PROJECTS_PAGE_CTA.titleLineOne}</span>
                        <span className="block">{PROJECTS_PAGE_CTA.titleLineTwo}</span>
                    </h2>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.55 }}
                        variants={ctaButtonsVariants}
                        className="mt-7 flex flex-wrap items-center gap-4"
                    >
                        <motion.a
                            variants={ctaButtonItemVariants}
                            href={PROJECTS_PAGE_CTA.primaryButtonHref}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex cursor-none items-center justify-center rounded-sm border border-white/35 bg-transparent px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-[#0075FF]/60 hover:text-[#B8D8FF]"
                        >
                            {PROJECTS_PAGE_CTA.primaryButtonLabel}
                        </motion.a>
                        <motion.a
                            variants={ctaButtonItemVariants}
                            href={PROJECTS_PAGE_CTA.secondaryButtonHref}
                            download
                            className="inline-flex cursor-none items-center justify-center rounded-sm border border-white/35 bg-transparent px-7 py-3 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:border-[#0075FF]/60 hover:text-[#B8D8FF]"
                        >
                            {PROJECTS_PAGE_CTA.secondaryButtonLabel}
                        </motion.a>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
