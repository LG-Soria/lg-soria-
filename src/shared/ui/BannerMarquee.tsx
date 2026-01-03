import { useMemo } from "react";
import { motion } from "motion/react";
import clsx from "clsx";

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
