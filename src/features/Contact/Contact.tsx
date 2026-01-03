import { useRef } from "react";
import { BannerMarquee } from "../../shared/ui/BannerMarquee";
import { TitleLink } from "../../shared/ui/TitleLink";
import { BackgroundEffect } from "@/shared/components/BackgroundEffect/BackgroundEffect";
import { useGlobalMouse } from "@/shared/context/MouseContext";

/**
 * Ejemplo de uso dentro de la sección de contacto con layout izquierda/derecha
 * acorde al boceto. En desktop se muestran en dos columnas.
 */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="contacto"
      data-cursor="dot"
      className="flex min-h-[80vh] overflow-visible flex-col gap-10 relative
        pb-16 border-x"
    >
      <BackgroundEffect sectionRef={sectionRef} />
      <BannerMarquee
        text="CONTACTO"
        separator="•"
        speed={60}
        direction="left"
        heightClass="h-36 z-40"
        textClass="text-6xl md:text-7xl lg:text-8xl"
        bgClass="bg-white"
        colorClass="text-black"
      />

      {/* Grid dos columnas - En desktop ocupa más ancho para estar en los laterales */}
      <div className="grid w-full grid-cols-1 mt-16 gap-14 md:grid-cols-2 md:gap-16 px-6 md:px-20 lg:px-32 xl:px-40">
        {/* Izquierda: CURRICULUM con flecha a la derecha y crecimiento de línea */}
        <div className="flex items-start justify-start">
          <TitleLink
            label="CURRICULUM"
            href="/Lucas_Soria_CV.pdf"
            download
            align="left"
            lineWidth="w-[min(100%,32rem)]"
            color="white"
            hoverGrow
            hoverArrowDirection="down"
            arrowPosition="right"
          />
        </div>

        {/* Derecha: otros enlaces, subrayado más corto que texto, flecha al lado izquierdo */}
        <div className="flex flex-col items-end space-y-8">
          <TitleLink
            label="LINKEDIN"
            href="https://www.linkedin.com/in/lucas-soria-g/"
            align="right"
            lineWidth="w-[min(100%,20rem)]"
            color="white"
            hoverGrow
            hoverArrowDirection="up"
            arrowPosition="left"
          />
          <TitleLink
            label="GITHUB"
            href="https://github.com/LG-Soria"
            align="right"
            lineWidth="w-[min(100%,20rem)]"
            color="white"
            hoverGrow
            hoverArrowDirection="up"
            arrowPosition="left"
          />
          <TitleLink
            label="EMAIL"
            href="mailto:lucasoria1996@gmail.com"
            align="right"
            lineWidth="w-[min(100%,14rem)]"
            color="white"
            hoverGrow
            hoverArrowDirection="up"
            arrowPosition="left"
          />
        </div>
      </div>
    </section>
  );
}
