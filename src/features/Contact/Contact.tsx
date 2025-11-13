import { useMemo } from "react";
import { motion } from "motion/react";
import clsx from "clsx";
import { LuArrowRight } from "react-icons/lu";


/**
 * BannerMarquee
 * Componente de banner con texto desplazándose de manera continua.
 * - No depende del ancho del texto: usa un contenedor al 200% y duplica el contenido para un loop perfecto.
 * - Animación lineal e infinita.
 * - Personalizable vía props.
 */
export function BannerMarquee({
  text = "CONTACTO",
  separator = "•",
  speed = 12,
  direction = "left",
  className,
  heightClass = "h-36",
  textClass = "text-6xl md:text-7xl lg:text-8xl",
  bgClass = "bg-white",
  colorClass = "text-black",
}: {
  text?: string;
  separator?: string;
  speed?: number;
  direction?: "left" | "right";
  className?: string;
  heightClass?: string;
  textClass?: string;
  bgClass?: string;
  colorClass?: string;
}) {
const ribbon = useMemo(() => {
  const parts = [];
  for (let i = 0; i < 12; i++) {
    parts.push(
      <span key={`t-${i}`}>{text}</span>,
      <span key={`s-${i}`} className="px-2 bg-gradient-to-b from-[#0075FF]  to-[#0044CC] text-transparent bg-clip-text">
        {separator}
      </span>
    );
  }
  return parts;
}, [text, separator]);

  // Con w-max y bloques shrink-0 se evita que el contenido se comprima; duplicar el contenido permite un loop perfecto.
  const xFrom = direction === "left" ? "0%" : "-50%";
  const xTo = direction === "left" ? "-50%" : "0%";

  return (
    <div
    id="contacto"
      className={clsx(
        "relative w-full overflow-hidden select-none",
        bgClass,
        heightClass,
        className,
      )}
    >
      <motion.div
        className="absolute inset-0 flex w-max items-center"
        style={{ willChange: "transform" }}
        animate={{ x: [xFrom, xTo] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {/* Copia A: shrink-0 evita que se contraiga y se superponga */}
        <div className={clsx("flex h-full shrink-0 items-center", colorClass)}>
          <p
            className={clsx(
              "font-bold tracking-tight whitespace-nowrap",
              textClass,
            )}
          >
            {ribbon}
          </p>
        </div>
        {/* Copia B: ubicada de inmediato después para un loop sin saltos */}
        <div
          className={clsx("flex h-full shrink-0 items-center", colorClass)}
          aria-hidden
        >
          <p
            className={clsx(
              "font-bold tracking-tight whitespace-nowrap",
              textClass,
            )}
          >
            {ribbon}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function TitleLink({
  label,
  href,
  align = "left",
  lineWidth = "w-auto",
  download,
  color = "white",
  hoverGrow = true,
  hoverArrowDirection = undefined, // "down" | "up" | undefined
  arrowPosition = "right", // "left" | "right"
}: {
  label: string;
  href: string;
  align?: "left" | "right";
  lineWidth?: string;
  download?: boolean;
  color?: "white" | "black";
  hoverGrow?: boolean;
  hoverArrowDirection?: "down" | "up" | undefined;
  arrowPosition?: "left" | "right";
}) {
  const isLeft = align === "left";
  const colorText = color === "white" ? "text-white" : "text-black";
  const colorLine = color === "white" ? "bg-white" : "bg-black";

  const baseScale = hoverGrow ? "scale-x-80" : "scale-x-100";
  const hoverScale = hoverGrow ? "group-hover:scale-x-100" : "";
  const origin = isLeft ? "origin-left" : "origin-right";

  // LuArrowRight apunta a la DERECHA por defecto
  const hoverRotation =
    hoverArrowDirection === "down"
      ? "group-hover:rotate-90"
      : hoverArrowDirection === "up"
        ? "group-hover:-rotate-45"
        : "";
  // Bounce corregido: down => baja; up => sube
  const hoverBounce =
    hoverArrowDirection === "down"
      ? "group-hover:translate-y-1"
      : hoverArrowDirection === "up"
        ? "group-hover:-translate-y-1"
        : "";

  const baseArrowRotation =
    arrowPosition === "left" ? "-rotate-180" : "rotate-0";
  const Arrow = (
    <span className="relative inline-flex items-center">
      <LuArrowRight
        size={32}
        className={clsx(
          "inline-block align-baseline text-[1.2em] transition-transform duration-300",
          baseArrowRotation,
          hoverRotation,
          hoverBounce,
        )}
      />

      {hoverArrowDirection === "down" && arrowPosition === "right" && (
        <span
          className={clsx(
            "absolute top-full left-1/2 mt-1 h-[1px] w-4 -translate-x-1/2 bg-current opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
          )}
        />
      )}
    </span>
  );

  return (
    <a
      href={href}
      {...(download
        ? { download: true }
        : { target: "_blank", rel: "noreferrer" })}
      className={clsx(
        "group relative inline-block select-none",
        isLeft ? "text-left" : "text-right",
      )}
    >
      {/* Título + flecha fija (lado configurable) */}
      <span className={clsx("inline-flex items-baseline gap-2", colorText)}>
        {arrowPosition === "left" && Arrow}
        <span
          className={clsx(
            "font-semibold tracking-wide",
            "text-4xl md:text-5xl lg:text-6xl",
          )}
        >
          {label}
        </span>
        {arrowPosition === "right" && Arrow}
      </span>

      {/* Subrayado bajo el texto */}
      <span className={clsx("relative mt-2 block", lineWidth)}>
        <span
          className={clsx(
            "absolute -bottom-1 left-0 block h-[3px] w-full",
            colorLine,
            origin,
            baseScale,
            hoverScale,
            "transition-transform duration-300 ease-out",
          )}
        />
        <span className="invisible">_</span>
      </span>
    </a>
  );
}

/**
 * Ejemplo de uso dentro de la sección de contacto con layout izquierda/derecha
 * acorde al boceto. En desktop se muestran en dos columnas.
 */
export default function Contact() {
  return (
    <section
      id="contacto"
      className="mx-auto flex min-h-[80vh] max-w-6xl flex-col items-center gap-10 bg-black  pb-16 border-x"
    >
      <BannerMarquee
        text="CONTACTO"
        separator="•"
        speed={30}
        direction="left"
        heightClass="h-36"
        textClass="text-6xl md:text-7xl lg:text-8xl"
        bgClass="bg-white"
        colorClass="text-black"
      />

      {/* Grid dos columnas */}
      <div className="grid w-full grid-cols-1 gap-14 md:grid-cols-2 md:gap-16 px-4">
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
