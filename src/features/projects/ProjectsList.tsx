import { projects } from "./projectsData";
import ProjectItem from "./ProjectItem";

export default function ProjectsList() {
    return (
        <div className="flex flex-col gap-0">
            {projects.map((project, index) => (
                <ProjectItem key={project.id} project={project} index={index} />
            ))}
        </div>
    );
}
