import { useState, useEffect } from "react";
import { HiHome, HiCode, HiBriefcase, HiMail } from "react-icons/hi";
import "./StretchyNavigation.css";

type NavItem = { label: string; href?: string };

interface StretchyNavigationProps {
    items: NavItem[];
    activeId: string;
    onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => void;
}

const ICON_MAP: Record<string, any> = {
    "Inicio": HiHome,
    "Skills": HiCode,
    "Proyectos": HiBriefcase,
    "Contacto": HiMail,
};

export default function StretchyNavigation({ items, activeId, onItemClick }: StretchyNavigationProps) {
    const [isOpen, setIsOpen] = useState(false);

    // No longer hiding overflow to prevent layout shift

    const toggleMenu = () => setIsOpen(!isOpen);

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
        setIsOpen(false);
        onItemClick(e, href);
    };

    return (
        <div className={`stretchy-nav-root  ${isOpen ? "is-open" : ""}`}>
            <button
                className="stretchy-nav-trigger "
                onClick={toggleMenu}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isOpen}
            >
                <span aria-hidden="true"></span>
            </button>

            <ul className="stretchy-nav-items cursor-none">
                {items.map((item, i) => {
                    const Icon = ICON_MAP[item.label] || HiHome;
                    const id = item.href?.startsWith("#") ? item.href.slice(1) : "";
                    const isActive = id === activeId;

                    return (
                        <li key={`${item.label}-${i} `}>
                            <a
                                href={item.href ?? "#"}
                                className={`stretchy-nav-item ${isActive ? "active" : ""}`}
                                onClick={(e) => handleItemClick(e, item.href)}
                            >
                                <Icon className="icon" />
                                <span className="label">{item.label}</span>
                            </a>
                        </li>
                    );
                })}
            </ul>

            <span className="stretchy-nav-bg" aria-hidden="true"></span>
        </div>
    );
}
