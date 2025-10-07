import { motion, AnimatePresence } from "motion/react";

import { useEffect, useMemo, useRef, useState } from "react";

type NavItem = { label: string; href?: string };

interface NavbarProps {
  title?: string;
  items?: NavItem[];
  showContact?: boolean;
  /** ID/href de la sección de contacto (debe existir en el DOM). */
  contactHref?: `#${string}`;
  /** Offset extra para el scroll suave (además de la altura del header). */
  offset?: number;
}

export default function Navbar({
  title = "LG-Soria",
  items = [
    { label: "Inicio", href: "#inicio" },
    { label: "Skills", href: "#skills" },
  ],
  showContact = true,
  contactHref = "#contacto",
  offset = 40,
}: NavbarProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [borderProgress, setBorderProgress] = useState(0); // 0 = borde completo, 1 = desaparecido
  const headerRef = useRef<HTMLElement | null>(null);

  // Lista final de ítems (se agrega "Contacto" si corresponde y no está duplicado)
  const navItems = useMemo(() => {
    const contactId = contactHref.startsWith("#")
      ? contactHref.slice(1)
      : contactHref;
    const hasContactAlready = items.some(
      (i) => (i.href?.startsWith("#") ? i.href.slice(1) : i.href) === contactId,
    );
    if (!showContact || hasContactAlready) return items;
    return [...items, { label: "Contacto", href: contactHref }];
  }, [items, showContact, contactHref]);

  // IDs de secciones para el scrollspy
  const sectionIds = useMemo(
    () =>
      navItems
        .map((i) => (i.href?.startsWith("#") ? i.href.slice(1) : null))
        .filter(Boolean) as string[],
    [navItems],
  );

  // Efecto del borde superior al scrollear
  useEffect(() => {
    const MAX = 120; // distancia de scroll para completar el efecto

    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 10);
      const p = Math.min(Math.max(y / MAX, 0), 1);
      setBorderProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy
  useEffect(() => {
    if (!sectionIds.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as Element[];
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sectionIds]);

  // Scroll suave con compensación por altura del header + offset extra
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string,
  ) => {
    if (!href || !href.startsWith("#")) return;
    e.preventDefault();

    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;

    // 👇 offset especial para "skills"
    const extraOffset = id === "skills" ? -300 : offset;

    const top =
      el.getBoundingClientRect().top + window.scrollY - (headerH + extraOffset);

    window.scrollTo({ top, behavior: "smooth" });
  };

  // Cálculo visual del borde: se usa una capa absoluta que escala en X y desvanece
  const borderScale = 1 - borderProgress; // 1 → completo, 0 → desaparecido
  const borderOpacity = borderScale; // opacidad vinculada a la escala

return (
  <header
    ref={headerRef}
    className={[
      "sticky top-0 z-50 border-b border-transparent transition-shadow duration-300",
      isScrolled
        ? "bg-neutral-900/60 shadow-[0_2px_8px_rgba(0,0,0,0.15)] supports-[backdrop-filter]:backdrop-blur"
        : "bg-transparent shadow-none",
    ].join(" ")}
  >
    {/* Borde animado: blanco, se contrae hacia el centro y desvanece */}
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white"
      style={{
        opacity: borderOpacity,
        transform: `scaleX(${borderScale})`,
        transformOrigin: "50% 50%",
        transition: "opacity 200ms linear, transform 200ms linear",
      }}
    />

    <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      {/* Logo con cross-fade pro */}
      <div className="relative h-8 w-28">
        <AnimatePresence mode="wait" initial={false}>
          {!isScrolled ? (
            <motion.img
              key="logo1"
              src="/logo.svg"
              alt={title}
              className="absolute inset-0 h-8 w-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.img
              key="logo2"
              src="/logo2.svg"
              alt={title}
              className="absolute inset-0 h-8 w-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      <nav aria-label="Primary">
        <ul className="flex items-center gap-6">
          {navItems.map((item, i) => {
            const id = item.href?.startsWith("#") ? item.href.slice(1) : "";
            const isActive = id && activeId === id;

            return (
              <li key={`${item.label}-${i}`}>
                <a
                  href={item.href ?? "#"}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={[
                    "relative cursor-pointer transition-colors",
                    "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:bg-[#0075FF] after:transition-all after:duration-300",
                    isActive
                      ? "text-white after:w-full"
                      : "after:w-0 hover:text-white/90 hover:after:w-full",
                  ].join(" ")}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  </header>
);

}
