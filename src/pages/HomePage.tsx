import Home from "@/features/home/Home";
import SkillsTimeline from "@/features/skills/SkillsTimeline";
import ProjectsPreview from "@/features/projects/ProjectsPreview";
import Contact from "@/features/Contact/Contact";

export default function HomePage() {
  return (
    <>
      <Home />
      <SkillsTimeline />
      <ProjectsPreview />
      <Contact />
    </>
  );
}
