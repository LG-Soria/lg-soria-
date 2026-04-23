import clsx from "clsx";
import { LuArrowRight } from "./icons";
import type { ActionIntent } from "./ActionLink";

type TitleLinkProps = {
  label: string;
  href: string;
  align?: "left" | "right";
  lineWidth?: string;
  download?: boolean;
  color?: "white" | "black";
  arrowPosition?: "left" | "right";
  action?: ActionIntent;
  className?: string;
};

export function TitleLink({
  label,
  href,
  align = "left",
  lineWidth = "w-auto",
  download,
  color = "white",
  arrowPosition = "right",
  action,
  className = "",
}: TitleLinkProps) {
  const resolvedAction: ActionIntent = action ?? (download ? "download" : "external");
  const isLeft = align === "left";
  const colorText = color === "white" ? "text-white" : "text-black";
  const colorLine = color === "white" ? "bg-white" : "bg-black";

  const baseScale = "scale-x-80";
  const hoverScale = "group-hover:scale-x-100";
  const origin = isLeft ? "origin-left" : "origin-right";

  const hoverRotation =
    resolvedAction === "download"
      ? "group-hover:rotate-90"
      : resolvedAction === "external" || resolvedAction === "whatsapp"
        ? "group-hover:-rotate-45"
        : "";

  const hoverBounce =
    resolvedAction === "download"
      ? "group-hover:translate-y-1"
      : resolvedAction === "external" || resolvedAction === "whatsapp"
        ? "group-hover:-translate-y-1"
        : "";

  const baseArrowRotation = arrowPosition === "left" ? "-rotate-180" : "rotate-0";
  const Arrow = (
    <span className="relative inline-flex items-center">
      <LuArrowRight
        size={44}
        className={clsx(
          "inline-block align-baseline text-[1.2em] transition-transform duration-300",
          baseArrowRotation,
          hoverRotation,
          hoverBounce,
        )}
      />

      {resolvedAction === "download" && arrowPosition === "right" && (
        <span
          className={clsx(
            "absolute top-full left-1/2 mt-1 h-[1px] w-4 -translate-x-1/2 bg-current opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
          )}
        />
      )}
    </span>
  );

  const isExternalBehavior =
    resolvedAction === "external" || resolvedAction === "whatsapp";

  return (
    <a
      href={href}
      {...(download || resolvedAction === "download"
        ? { download: true }
        : isExternalBehavior
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      className={clsx(
        "group relative inline-block select-none cursor-none",
        isLeft ? "text-left" : "text-right",
        className,
      )}
    >
      <span className={clsx("inline-flex items-baseline gap-2", colorText)}>
        {arrowPosition === "left" && Arrow}
        <span
          className={clsx(
            "font-semibold tracking-wide",
            "text-3xl md:text-5xl lg:text-6xl xl:text-7xl",
          )}
        >
          {label}
        </span>
        {arrowPosition === "right" && Arrow}
      </span>

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
