import ProjectsList from "./ProjectsList";

export default function ProjectsSection() {
    return (
        <section
            id="proyectos"
            className="relative w-full overflow-hidden px-6 py-16 md:px-0 md:py-32 snap-y snap-mandatory scroll-py-8 box-border"
        >
            {/* Líneas decorativas removidas por nueva transición */}

            <div className="relative mb-16 md:mb-24 text-center">
                <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl text-center">
                    Proyectos
                </h2>
                {/* Continuación de líneas detrás del título si se desea, o solo hasta el título */}
            </div>

            <ProjectsList />
        </section>
    );
}
