import { Outlet, useLocation } from "react-router";
import { useLayoutEffect } from "react";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { MouseProvider } from "@/shared/context/MouseContext";
import { InversionCursor } from "@/shared/components/Cursor/InversionCursor";
import { DotCursor } from "@/shared/components/Cursor/DotCursor";

export default function SiteLayout() {
  const { pathname, hash } = useLocation();
  const isFontTestRoute =
    pathname === "/" || pathname === "/about" || pathname === "/projects";

  useLayoutEffect(() => {
    if (hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Cómo trabajo", href: "#skills" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
    { label: "Sobre mí", href: "/about" },
  ];

  return (
    <MouseProvider>
      <div
        className={`relative min-h-screen w-full bg-black text-white selection:bg-[#0075FF]/30 ${isFontTestRoute ? "portfolio-font-test" : ""}`}
      >
        <InversionCursor />
        <DotCursor />

        <Navbar
          key={pathname}
          items={navItems}
          showContact={false}
        />

        <main className="flex w-full flex-col">
          <Outlet />
        </main>
        <Footer />
      </div>
    </MouseProvider>
  );
}
