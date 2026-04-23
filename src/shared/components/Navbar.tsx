import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useGlobalMouse } from "@/shared/context/MouseContext";
import StretchyNavigation from "./StretchyNavigation/StretchyNavigation";

type NavItem = { label: string; href?: string };

interface NavbarProps {
  title?: string;
  items?: NavItem[];
  showContact?: boolean;
  contactHref?: `#${string}`;
  offset?: number;
}

export default function Navbar({
  title = "LG-Soria",
  items = [
    { label: "Inicio", href: "/" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
    { label: "About", href: "/about" },
  ],
  showContact = false,
  contactHref = "#contacto",
  offset = 0,
}: NavbarProps) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isHomeRoute = pathname === "/";

  const [activeId, setActiveId] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [borderProgress, setBorderProgress] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);
  const { setIsOverNavbar } = useGlobalMouse();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = headerRef.current?.offsetHeight ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - (headerH + offset);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const getRouteFromHref = (href?: string) => {
    if (!href) return "";
    if (href.startsWith("#") || href.startsWith("/#")) return "/";
    if (href.startsWith("/")) return href;
    return "";
  };

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

  const sectionIds = useMemo(
    () =>
      (isHomeRoute
        ? navItems
            .map((i) => (i.href?.startsWith("#") ? i.href.slice(1) : null))
            .filter(Boolean)
        : []) as string[],
    [navItems, isHomeRoute],
  );

  const isItemActive = (href?: string) => {
    if (isHomeRoute) {
      if (href === "/") return activeId === "";

      const id = href?.startsWith("#") ? href.slice(1) : "";
      return Boolean(id && activeId === id);
    }

    const route = getRouteFromHref(href);
    return Boolean(route && route === pathname);
  };

  useEffect(() => {
    const MAX = 120;

    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsScrolled(y > 5);
      const p = Math.min(Math.max(y / MAX, 0), 1);
      setBorderProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHomeRoute || !sectionIds.length) return;

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
  }, [isHomeRoute, sectionIds]);

  useEffect(() => {
    if (!isHomeRoute) setActiveId(pathname);
  }, [isHomeRoute, pathname]);

  useEffect(() => {
    if (!isHomeRoute || !hash.startsWith("#")) return;

    const id = hash.slice(1);
    requestAnimationFrame(() => {
      scrollToSection(id);
      setActiveId(id);
    });
  }, [isHomeRoute, hash, offset]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href?: string,
  ) => {
    if (!href) return;
    if (href === "/") {
      e.preventDefault();

      if (!isHomeRoute) {
        navigate("/");
        return;
      }

      setActiveId("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (href.startsWith("#")) {
      e.preventDefault();

      if (!isHomeRoute) {
        navigate(`/${href}`);
        return;
      }

      scrollToSection(href.slice(1));
      return;
    }

    if (href.startsWith("/#")) {
      e.preventDefault();

      if (isHomeRoute) {
        navigate(href, { replace: true });
        return;
      }

      navigate(href);
      return;
    }

    if (href.startsWith("/")) {
      e.preventDefault();
      if (pathname !== href) navigate(href);
    }
  };

  const borderScale = 1 - borderProgress;
  const borderOpacity = borderScale;

  return (
    <header
      ref={headerRef}
      onMouseEnter={() => setIsOverNavbar(true)}
      onMouseLeave={() => setIsOverNavbar(false)}
      className={[
        "fixed top-0 left-0 right-0 z-50 border-b border-transparent cursor-none transition-all duration-300",
        isScrolled
          ? "bg-black shadow-[0_2px_8px_rgba(0,0,0,0.3)] supports-[backdrop-filter]:backdrop-blur"
          : "bg-transparent shadow-none",
      ].join(" ")}
    >
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

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {navItems.map((item, i) => {
              const isActive = isItemActive(item.href);

              return (
                <li key={`${item.label}-${i}`}>
                  <a
                    href={item.href ?? "#"}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={[
                      "relative cursor-none transition-colors",
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

        <div className="md:hidden">
          <StretchyNavigation
            items={navItems}
            activeId={activeId}
            onItemClick={handleNavClick}
          />
        </div>
      </div>
    </header>
  );
}
