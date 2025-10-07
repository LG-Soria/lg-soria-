import Navbar from "./components/Navbar";
import Button from "./components/ui/Button";
import Contact from "./features/Contact/Contact";
import Footer from "./features/Footer/Footer";
import Home from "./features/home/Home";
import Skills from "./features/skills/Skills";

export default function App() {
  return (
    <div className="min-h-fit bg-neutral-950 text-neutral-100">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 pt-10">
        {/* Comenzar a maquetar tu primera sección */}
        <Home />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
