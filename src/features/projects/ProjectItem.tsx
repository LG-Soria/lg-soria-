import { useRef } from "react";
import { motion } from "framer-motion";
import { FiArrowRight } from "@/shared/ui/icons";
import { Project } from "@/shared/types";
import { useProjectAnimation } from "./hooks/useProjectAnimation";

interface ProjectItemProps {
    project: Project;
    index: number;
}

export default function ProjectItem({ project, index }: ProjectItemProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { yParallax, opacity, y } = useProjectAnimation(ref);

    return (
        <motion.div
            ref={ref}
            style={{ opacity, y }}
            className="group relative grid h-auto min-h-[auto] w-full grid-cols-1 items-center gap-8 snap-start border-b border-white/5 py-16 last:border-b-0 md:grid-cols-[60%_40%] md:h-screen md:min-h-screen md:gap-16 md:py-0"
        >
            {/* Columna Izquierda: Imagen */}
            <div className="relative h-[50vh] w-full overflow-hidden rounded-lg border border-white/10 md:h-[80vh]">
                <motion.img
                    style={{ y: yParallax, scale: 1.1 }}
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-100 brightness-90"
                    loading="lazy"
                />
            </div>

            {/* Columna Derecha: Información */}
            <div className="flex flex-col justify-center px-6 md:px-0 md:py-12">
                <div className="relative mb-4 md:mb-6">
                    <span className="block text-6xl font-extrabold leading-none tracking-tighter text-white/5 md:text-8xl">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute top-0 left-0 block text-6xl font-extrabold leading-none tracking-tighter bg-gradient-to-b from-[#0075FF] to-[#0044CC] bg-clip-text text-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:text-8xl">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                </div>

                <motion.h3
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4 text-3xl font-bold leading-tight tracking-tight text-white md:text-[40px] md:mb-6"
                >
                    {project.title}
                </motion.h3>

                <motion.p
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-8 max-w-[90%] text-lg leading-relaxed text-gray-400 md:text-lg"
                >
                    {project.description}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mb-8 flex flex-wrap items-center gap-3"
                >
                    <span className="mr-2 text-sm font-semibold text-gray-500">Stack:</span>
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className="rounded-full border border-blue-500/30 bg-blue-500/5 px-4 py-1.5 text-sm font-medium text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>

                <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    href={project.link}
                    className="group inline-flex items-center gap-2 text-base font-semibold text-white"
                >
                    <span className="relative">
                        Ver Proyecto
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <FiArrowRight className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>
            </div>
        </motion.div>
    );
}
