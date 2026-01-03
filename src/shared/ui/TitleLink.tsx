import clsx from "clsx";
import { LuArrowRight } from "./icons";

export function TitleLink({
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
                "group relative inline-block select-none cursor-none",
                isLeft ? "text-left" : "text-right",
            )}
        >
            {/* Título + flecha fija (lado configurable) */}
            <span className={clsx("inline-flex items-baseline gap-2", colorText)}>
                {arrowPosition === "left" && Arrow}
                <span
                    className={clsx(
                        "font-semibold tracking-wide",
                        "text-3xl md:text-5xl lg:text-7xl",
                    )}
                >
                    {label}
                </span>
                {arrowPosition === "right" && Arrow}
            </span>

            {/* Subrayado bajo el texto */}
            <span className={clsx("relative mt-1 block", lineWidth)}>
                <span
                    className={clsx(
                        "absolute -bottom-3 left-0 block h-[2px] md:h-[3px] w-full",
                        colorLine,
                        origin,
                        baseScale,
                        hoverScale,
                        "transition-transform duration-300 ease-out",
                    )}
                />
            </span>
        </a>
    );
}
