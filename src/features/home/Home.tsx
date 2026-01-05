import Button from "@/shared/ui/Button";
import ScrollHint from "@/shared/ui/ScrollHint";
import { LuArrowDown } from "@/shared/ui/icons";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handleNextSectionClick = () => {
    const nextSection = document.getElementById("skills");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      data-cursor="inversion"
      className="relative cursor-none z-20 mx-auto min-h-screen w-full overflow-hidden px-4 py-16"
    >
      {/* Contenido en su propio stack */}
      <div className="flex min-h-[60vh] flex-col max-w-6xl mx-auto items-center justify-center space-y-6 md:space-y-10 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tight">LG-SORIA</h1>
        <p className="max-w-prose text-2xl md:text-6xl text-white/70">Web Developer</p>
        <Button
          variant="ghost"
          onClick={handleNextSectionClick}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="cursor-none group"
          hoverScale={true}
          glow={true}
          iconEffect="jump"
          icon={
            <motion.span
              animate={isButtonHovered ? { y: [0, 6, 0] } : { y: 0 }}
              transition={{
                duration: 1.2,
                repeat: isButtonHovered ? Infinity : 0,
                ease: "easeInOut"
              }}
              className="inline-block"
            >
              <LuArrowDown aria-hidden="true" />
            </motion.span>
          }
          withIcon="visible"
        >
          Skills
        </Button>
      </div>

      {/* Hint: fuera del stack con space-y */}
      <ScrollHint
        appearAfterMs={2400}
        topThresholdPx={12}
        bottomOffset={196} // más alto para que se vea en el home
        fixed={false} // absoluto dentro de la sección
        label="Scrollea"
      />
      {/*
        Si querés que quede pegado al viewport incluso fuera del hero:
        <ScrollHint fixed label="Scrollea" />
      */}
    </section>
  );
}
