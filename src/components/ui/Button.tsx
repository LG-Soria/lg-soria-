// Button.tsx
import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { FaLinkedinIn } from "react-icons/fa6";

type WithIconMode = "none" | "hover" | "visible";
type IconEffect = "fadeScale" | "slideIn";
type IconPosition = "left" | "right";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
  withIcon?: WithIconMode;        // "none" | "hover" | "visible"
  iconEffect?: IconEffect;        // animación del icono
  icon?: ReactNode;               // componente de ícono (default LinkedIn)
  iconPosition?: IconPosition;    // lado del ícono
  iconSizeRem?: number;           // tamaño icono en rem (default 1)
};

const LAYOUT = {
  base:
    "group inline-flex items-center  whitespace-nowrap " +
    "rounded-xl text-sm font-medium transition-all duration-300 ease-out " +
    "relative cursor-pointer hover:cursor-pointer",
  paddingBase: "px-4 py-2",
  // si no querés variar padding, quita esta línea del join final
  paddingHover: "hover:px-2",
};

const VARIANTS: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-white text-black hover:bg-white/90",
  ghost: "bg-transparent text-white hover:bg-white/10 border border-white/20",
};

/** Efectos centralizados */
const EFFECTS: Record<
  IconEffect,
  {
    // slot contenedor (espaciador o wrapper del icono)
    sideSlotBase: string;
    sideSlotOn: string;          // visible
    sideSlotOnHover: string;     // hover
    // transiciones del propio ícono
    iconBase: string;
    iconOn: string;              // visible
    iconOnHover: string;         // hover
  }
> = {
  fadeScale: {
    sideSlotBase:
      "w-0 overflow-hidden shrink-0 transition-[width] duration-300 ease-out",
    sideSlotOn: "w-0",
    sideSlotOnHover: "group-hover:w-7",
    iconBase:
      "opacity-0 scale-90 pointer-events-none transition-all duration-300 ease-out",
    iconOn: "opacity-100 scale-100",
    iconOnHover: "group-hover:opacity-100 group-hover:scale-100",
  },
  slideIn: {
    sideSlotBase:
      "w-0 overflow-hidden shrink-0 transition-[width] duration-300 ease-out",
    sideSlotOn: "w-7",
    sideSlotOnHover: "group-hover:w-7",
    iconBase:
      "opacity-0 translate-x-1 transition-all duration-300 ease-out",
    iconOn: "opacity-100 translate-x-0",
    iconOnHover: "group-hover:opacity-100 group-hover:translate-x-0",
  },
};

export default function Button({
  variant = "primary",
  withIcon = "none",
  iconEffect = "slideIn",
  icon = <FaLinkedinIn aria-hidden="true" />,
  iconPosition = "right",
  iconSizeRem = 1,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const hasIcon = withIcon !== "none";
  const isVisible = withIcon === "visible";

  const effect = EFFECTS[iconEffect];
  const variantCls = VARIANTS[variant];

  const iconStyle = { fontSize: `${iconSizeRem}rem` };

  // Slot con ÍCONO (izquierda o derecha)
  const IconSlot = ({ side }: { side: IconPosition }) => (
    <span
      className={[
        effect.sideSlotBase,
        isVisible ? effect.sideSlotOn : effect.sideSlotOnHover,
      ].join(" ")}
    >
      <span
        className={[
          effect.iconBase,
          isVisible ? effect.iconOn : effect.iconOnHover,
          "inline-flex items-center mt-1 justify-center",
          side === "left" ? "mr-2" : "ml-2",
        ].join(" ")}
        style={iconStyle}
        aria-hidden="true"
      >
        {icon}
      </span>
    </span>
  );

  // Slot ESPACIADOR (simétrico) para mantener el label centrado
  const SpacerSlot = () => (
    <span
      className={[
        effect.sideSlotBase,
        isVisible ? "w-0": "hover:w-2",
      ].join(" ")}
      aria-hidden="true"
    />
  );

  return (
    <button
      className={[
        LAYOUT.base,
        LAYOUT.paddingBase,
        hasIcon ? LAYOUT.paddingHover : "",
        variantCls,
        className,
      ].join(" ")}
      {...props}
    >
      {/* Orden: [slot izq] [label] [slot der] */}
      {hasIcon && iconPosition === "left" ? <IconSlot side="left" /> : hasIcon ? <SpacerSlot /> : null}

      <span className="inline-block">{children}</span>

      {hasIcon && iconPosition === "right" ? <IconSlot side="right" /> : hasIcon ? <SpacerSlot /> : null}
    </button>
  );
}
