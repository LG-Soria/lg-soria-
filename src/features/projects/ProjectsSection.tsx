import { useRef } from "react";
import ProjectsList from "./ProjectsList";
import { useGlobalMouse } from "@/shared/context/MouseContext";

export default function ProjectsSection() {

    return (
        <section
            id="proyectos"
            data-cursor="inversion"
            className="relative w-full overflow-hidden cursor-none px-16   py-16 md:px-32 md:py-32 snap-y snap-mandatory scroll-py-8 box-border"
        >

            <div className="relative mb-16 md:mb-24 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl text-center">
                    Proyectos
                </h2>
            </div>

            <ProjectsList />
        </section>
    );
}
