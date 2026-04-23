import { projects } from "./model/data";
import ProjectItem from "./ProjectItem";
import { Project } from "@/shared/types";

interface ProjectsListProps {
    items?: Project[];
    compact?: boolean;
    alternate?: boolean;
    contained?: boolean;
}

export default function ProjectsList({
    items = projects,
    compact = false,
    alternate = false,
    contained = false,
}: ProjectsListProps) {
    return (
        <div className="flex flex-col gap-0">
            {items.map((project, index) => (
                <ProjectItem
                    key={project.id}
                    project={project}
                    index={index}
                    compact={compact}
                    contained={contained}
                    reverse={alternate && index % 2 === 1}
                />
            ))}
        </div>
    );
}
