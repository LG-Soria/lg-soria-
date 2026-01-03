import Navbar from "@/shared/components/Navbar";
import Home from "@/features/home/Home";
import SkillsTimeline from "@/features/skills/SkillsTimeline";
import ProjectsSection from "@/features/projects/ProjectsSection";
import Contact from "@/features/Contact/Contact";
import Footer from "@/shared/components/Footer";
import { MouseProvider } from "@/shared/context/MouseContext";
import { InversionCursor } from "@/shared/components/Cursor/InversionCursor";
import { DotCursor } from "@/shared/components/Cursor/DotCursor";

function App() {
    return (
        <MouseProvider>
            <div className="relative bg-black min-h-screen w-full selection:bg-[#0075FF]/30 text-white">
                {/* Global Cursors */}
                <InversionCursor />
                <DotCursor />

                <Navbar />
                <main className="flex flex-col w-full">
                    <Home />
                    <SkillsTimeline />
                    <ProjectsSection />
                    <Contact />
                </main>
                <Footer />
            </div>
        </MouseProvider>
    );
}

export default App;
