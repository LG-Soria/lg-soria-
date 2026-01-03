import { useState, useEffect } from "react";
import "./BurgerMenu.css";

type NavItem = { label: string; href?: string };

interface BurgerMenuProps {
    items: NavItem[];
    isOpen: boolean;
    onToggle: (isOpen: boolean) => void;
    onItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => void;
}

export default function BurgerMenu({ items, isOpen, onToggle, onItemClick }: BurgerMenuProps) {

    const handleToggle = () => {
        onToggle(!isOpen);
    };

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
        onToggle(false);
        onItemClick(e, href);
    };

    return (
        <div className={`burger-menu-root ${isOpen ? "is-open" : ""}`}>
            <label className="toggle-container" onClick={handleToggle}>
                <span className="button-toggle"></span>
            </label>

            <nav className="burger-nav">
                {items.map((item, i) => (
                    <a
                        key={`${item.label}-${i}`}
                        href={item.href ?? "#"}
                        className="burger-nav-item"
                        onClick={(e) => handleLinkClick(e, item.href)}
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}
