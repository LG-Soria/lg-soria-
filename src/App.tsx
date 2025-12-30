import Navbar from "@/components/Navbar";
import Home from "@/features/home/Home";
import SkillsTimeline from "@/features/skills/SkillsTimeline";
import ProjectsSection from "@/features/projects/ProjectsSection";
import Contact from "@/features/Contact/Contact";
import Footer from "@/features/Footer/Footer";

function App() {
    return (
        <div className="relative bg-black min-h-screen w-full overflow-x-hidden selection:bg-[#0075FF]/30 text-white">
            <Navbar />
            <main className="flex flex-col w-full">
                <Home />
                <SkillsTimeline />
                <ProjectsSection />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;
