import { Outlet, useLocation } from "react-router";
import Navbar from "@/shared/components/Navbar";
import Footer from "@/shared/components/Footer";
import { MouseProvider } from "@/shared/context/MouseContext";
import { InversionCursor } from "@/shared/components/Cursor/InversionCursor";
import { DotCursor } from "@/shared/components/Cursor/DotCursor";

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isFontTestRoute =
    pathname === "/" || pathname === "/about" || pathname === "/projects";

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
    { label: "About", href: "/about" },
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
