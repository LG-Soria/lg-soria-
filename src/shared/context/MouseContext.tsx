import { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useMotionValue, MotionValue } from 'framer-motion';

export type CursorType = 'none' | 'inversion' | 'dot';

interface MouseContextType {
    globalMouseX: MotionValue<number>;
    globalMouseY: MotionValue<number>;
    cursorType: CursorType;
    setCursorType: (type: CursorType) => void;
    activeContainer: HTMLElement | null;
    setActiveContainer: (el: HTMLElement | null) => void;
    isOverNavbar: boolean;
    setIsOverNavbar: (isOver: boolean) => void;
}

const MouseContext = createContext<MouseContextType | undefined>(undefined);

export const MouseProvider = ({ children }: { children: ReactNode }) => {
    const globalMouseX = useMotionValue(0);
    const globalMouseY = useMotionValue(0);
    const [cursorType, setCursorType] = useState<CursorType>('none');
    const [activeContainer, setActiveContainer] = useState<HTMLElement | null>(null);
    const [isOverNavbar, setIsOverNavbar] = useState(false);

    useEffect(() => {
        const refreshCursorType = (x: number, y: number) => {
            const element = document.elementFromPoint(x, y) as HTMLElement;
            if (!element) return;

            const cursorTarget = element.closest('[data-cursor]') as HTMLElement;
            if (cursorTarget) {
                const type = cursorTarget.getAttribute('data-cursor') as CursorType;
                setCursorType(type);
                setActiveContainer(cursorTarget);
            } else {
                // If not over a specific cursor target, default to none
                // unless it's the navbar which is handled separately or by its own data-cursor
                if (!isOverNavbar) {
                    setCursorType('none');
                    setActiveContainer(null);
                }
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            globalMouseX.set(e.clientX);
            globalMouseY.set(e.clientY);
            refreshCursorType(e.clientX, e.clientY);
        };

        const handleScroll = () => {
            refreshCursorType(globalMouseX.get(), globalMouseY.get());
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [globalMouseX, globalMouseY, isOverNavbar]);

    return (
        <MouseContext.Provider value={{
            globalMouseX,
            globalMouseY,
            cursorType,
            setCursorType,
            activeContainer,
            setActiveContainer,
            isOverNavbar,
            setIsOverNavbar
        }}>
            {children}
        </MouseContext.Provider>
    );
};

export const useGlobalMouse = () => {
    const context = useContext(MouseContext);
    if (!context) {
        throw new Error('useGlobalMouse must be used within a MouseProvider');
    }
    return context;
};
