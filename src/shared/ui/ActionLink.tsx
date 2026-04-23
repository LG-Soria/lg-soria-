import clsx from "clsx";
import { type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link } from "react-router";
import { FaWhatsapp, LuArrowRight, LuArrowUpRight } from "./icons";

export type ActionIntent = "internal" | "external" | "download" | "whatsapp";
export type ActionVariant = "primary" | "secondary" | "inline";

type NavigationProps = {
  href?: string;
  to?: string;
  download?: boolean;
};

type CommonAnchorProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "className" | "children" | "href"
>;

type ActionIndicatorProps = {
  action: ActionIntent;
  className?: string;
};

type ActionLinkProps = NavigationProps &
  CommonAnchorProps & {
    action: ActionIntent;
    variant: ActionVariant;
    children: ReactNode;
    className?: string;
    indicatorClassName?: string;
  };

type DisplayEditorialLinkProps = NavigationProps &
  CommonAnchorProps & {
    action: ActionIntent;
    label: string;
    className?: string;
    align?: "left" | "right";
    lineWidth?: string;
    color?: "white" | "black";
    arrowPosition?: "left" | "right";
  };

const BUTTON_BASE_CLASS =
  "group relative inline-flex cursor-none items-center justify-center gap-2 overflow-hidden rounded-sm border px-6 py-3 text-sm font-semibold tracking-[0.1em] transition-[color,border-color,background-color,box-shadow,transform] duration-300";

const BUTTON_VARIANT_CLASS: Record<Exclude<ActionVariant, "inline">, string> = {
  primary:
    "border-[#0075FF]/60 bg-[#0075FF] text-white hover:border-[#3C9AFF]/75 hover:bg-[#0063D6] hover:shadow-[0_0_22px_rgba(0,117,255,0.32)]",
  secondary:
    "border-white/30 bg-transparent text-white/86 hover:border-[#0075FF]/62 hover:text-[#C9E0FF]",
};

function getLinkBehavior({
  action,
  href,
  target,
  rel,
}: {
  action: ActionIntent;
  href?: string;
  target?: string;
  rel?: string;
}) {
  const isMail = href?.toLowerCase().startsWith("mailto:");
  const wantsNewTab = (action === "external" || action === "whatsapp") && !isMail;
  const resolvedTarget = target ?? (wantsNewTab ? "_blank" : undefined);
  const resolvedRel = resolvedTarget === "_blank" ? rel ?? "noreferrer" : rel;
  return { resolvedTarget, resolvedRel };
}

function ActionIndicator({ action, className }: ActionIndicatorProps) {
  const transitionClass = "transition-all duration-300 ease-out";

  if (action === "internal") {
    return (
      <LuArrowRight
        aria-hidden="true"
        className={clsx(className, transitionClass, "group-hover:translate-x-0.5")}
      />
    );
  }

  if (action === "download") {
    return (
      <LuArrowRight
        aria-hidden="true"
        className={clsx(
          className,
          transitionClass,
          "group-hover:translate-y-0.5 group-hover:rotate-90",
        )}
      />
    );
  }

  if (action === "whatsapp") {
    return (
      <span
        aria-hidden="true"
        className={clsx("relative inline-flex items-center justify-center", className)}
      >
        <FaWhatsapp
          className={clsx(
            "absolute inset-0 h-full w-full",
            transitionClass,
            "opacity-100 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:opacity-0",
          )}
        />
        <LuArrowUpRight
          className={clsx(
            "absolute inset-0 h-full w-full",
            transitionClass,
            "translate-x-0.5 translate-y-0.5 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
          )}
        />
      </span>
    );
  }

  return (
    <span
      aria-hidden="true"
      className={clsx("relative inline-flex items-center justify-center", className)}
    >
      <LuArrowRight
        className={clsx(
          "absolute inset-0 h-full w-full",
          transitionClass,
          "opacity-100 group-hover:-translate-x-0.5 group-hover:translate-y-0.5 group-hover:opacity-0",
        )}
      />
      <LuArrowUpRight
        className={clsx(
          "absolute inset-0 h-full w-full",
          transitionClass,
          "translate-x-0.5 translate-y-0.5 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      />
    </span>
  );
}

function renderNavigation({
  href,
  to,
  shouldDownload,
  className,
  children,
  target,
  rel,
  action,
  rest,
}: {
  href?: string;
  to?: string;
  shouldDownload: boolean;
  className: string;
  children: ReactNode;
  target?: string;
  rel?: string;
  action: ActionIntent;
  rest: CommonAnchorProps;
}) {
  const { resolvedTarget, resolvedRel } = getLinkBehavior({ action, href, target, rel });

  if (to) {
    return (
      <Link to={to} className={className} target={resolvedTarget} rel={resolvedRel} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      download={shouldDownload || undefined}
      target={resolvedTarget}
      rel={resolvedRel}
      {...rest}
    >
      {children}
    </a>
  );
}

export function ActionLink({
  action,
  variant,
  children,
  className,
  indicatorClassName,
  href,
  to,
  download,
  target,
  rel,
  ...rest
}: ActionLinkProps) {
  const shouldDownload = action === "download" || !!download;
  const showsLineReinforcement = action !== "internal";
  const isInternalButton = action === "internal" && variant !== "inline";
  const isProjectsInternal =
    isInternalButton && (to === "/projects" || href === "/projects");

  if (!href && !to) {
    return null;
  }

  if (variant === "inline") {
    return renderNavigation({
      href,
      to,
      shouldDownload,
      action,
      target,
      rel,
      rest,
      className: clsx(
        "group relative inline-flex cursor-none items-center gap-2 pb-1 text-sm font-medium tracking-wide text-white/72 transition-colors duration-300 hover:text-[#B8D8FF]",
        className,
      ),
      children: (
        <>
          <span>{children}</span>
          <ActionIndicator action={action} className={clsx("h-4 w-4", indicatorClassName)} />
          <span
            aria-hidden="true"
            className={clsx(
              "absolute bottom-0 left-0 h-[1px] w-full origin-left bg-white/30 transition-all duration-300",
              showsLineReinforcement
                ? "scale-x-[0.86] group-hover:scale-x-100 group-hover:bg-[#8CC4FF] group-hover:h-[2px]"
                : "scale-x-[0.72] group-hover:scale-x-[0.82] group-hover:bg-white/55",
            )}
          />
        </>
      ),
    });
  }

  const buttonVariantClass = BUTTON_VARIANT_CLASS[variant];

  return renderNavigation({
    href,
    to,
    shouldDownload,
    action,
    target,
    rel,
    rest,
    className: clsx(
      BUTTON_BASE_CLASS,
      buttonVariantClass,
      isProjectsInternal &&
        "h-11 gap-2 rounded-[6px] px-6 py-0 text-[0.79rem] tracking-[0.09em] hover:-translate-y-[1px]",
      isProjectsInternal &&
        (variant === "primary"
          ? "border-[#63ABFF]/52 bg-[#0073F2]/88 text-[#F4F8FF] hover:border-[#95C6FF]/66 hover:bg-[#0A7DFF]/90 hover:shadow-[0_8px_20px_rgba(0,63,158,0.26)]"
          : "border-white/28 bg-white/[0.015] text-white/88 hover:border-[#79B8FF]/52 hover:bg-white/[0.045] hover:text-[#ECF6FF]"),
      className,
    ),
    children: (
      <>
        <span className="relative z-[1]">{children}</span>
        <ActionIndicator
          action={action}
          className={clsx(
            "h-4 w-4",
            isProjectsInternal && "h-[0.92rem] w-[0.92rem] -translate-y-[0.5px]",
            indicatorClassName,
          )}
        />
        {showsLineReinforcement && (
          <span
            aria-hidden="true"
            className={clsx(
              "pointer-events-none absolute bottom-1.5 left-4 right-4 h-[1px] origin-left scale-x-[0.88] transition-all duration-300",
              variant === "primary"
                ? "bg-white/42 group-hover:scale-x-100 group-hover:bg-white/95 group-hover:h-[2px]"
                : "bg-white/22 group-hover:scale-x-100 group-hover:bg-[#9CCBFF] group-hover:h-[2px]",
            )}
          />
        )}
      </>
    ),
  });
}

export function DisplayEditorialLink({
  action,
  label,
  href,
  to,
  download,
  target,
  rel,
  className,
  align = "left",
  lineWidth = "w-auto",
  color = "white",
  arrowPosition = "right",
  ...rest
}: DisplayEditorialLinkProps) {
  const shouldDownload = action === "download" || !!download;
  const isLeft = align === "left";
  const textColorClass = color === "white" ? "text-white" : "text-black";
  const lineBaseColorClass = color === "white" ? "bg-white/60" : "bg-black/55";
  const lineHoverColorClass = color === "white" ? "group-hover:bg-[#D8EAFF]" : "group-hover:bg-black";

  if (!href && !to) {
    return null;
  }

  const indicator = (
    <ActionIndicator
      action={action}
      className="h-[0.95em] w-[0.95em] md:h-[1em] md:w-[1em] lg:h-[1.02em] lg:w-[1.02em]"
    />
  );

  return renderNavigation({
    href,
    to,
    shouldDownload,
    action,
    target,
    rel,
    rest,
    className: clsx(
      "group relative inline-block select-none cursor-none",
      isLeft ? "text-left" : "text-right",
      className,
    ),
    children: (
      <>
        <span className={clsx("inline-flex items-baseline gap-2", textColorClass)}>
          {arrowPosition === "left" && indicator}
          <span className="font-semibold tracking-wide text-3xl md:text-5xl lg:text-6xl xl:text-7xl">
            {label}
          </span>
          {arrowPosition === "right" && indicator}
        </span>

        <span className={clsx("relative mt-1 block", lineWidth)}>
          <span
            aria-hidden="true"
            className={clsx(
              "absolute -bottom-3 left-0 block w-full origin-left transition-all duration-300 ease-out",
              lineBaseColorClass,
              lineHoverColorClass,
              isLeft ? "origin-left" : "origin-right",
              action === "internal"
                ? "h-[2px] scale-x-[0.78] group-hover:scale-x-[0.86] group-hover:h-[2px]"
                : "h-[2px] scale-x-[0.82] group-hover:scale-x-100 group-hover:h-[3px]",
            )}
          />
        </span>
      </>
    ),
  });
}
