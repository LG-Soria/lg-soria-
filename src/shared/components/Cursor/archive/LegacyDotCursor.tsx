import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGlobalMouse } from '@/shared/context/MouseContext';

interface DotCursorProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

export const DotCursor = ({ containerRef }: DotCursorProps) => {
    const { globalMouseX, globalMouseY } = useGlobalMouse();
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(globalMouseX, springConfig);
    const cursorY = useSpring(globalMouseY, springConfig);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleClick = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const id = Date.now();
            setRipples(prev => [...prev, { id, x, y }]);

            // Remove ripple after animation
            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id));
            }, 1000);
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
            container.style.cursor = 'none';
        };
        const handleMouseLeave = () => {
            setIsHovered(false);
            container.style.cursor = 'auto';
        };

        // Check if cursor should be hidden immediately
        container.style.cursor = 'none';

        container.addEventListener('click', handleClick);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            container.removeEventListener('click', handleClick);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.style.cursor = 'auto';
        };
    }, [containerRef]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Ripples */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="absolute w-10 h-10 border border-[#0EA5E9] rounded-full"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Dot Cursor - Fixed positioning for global sync */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="fixed top-0 left-0 w-3 h-3 bg-[#0EA5E9] rounded-full shadow-[0_0_15px_#0EA5E9] z-50 pointer-events-none"
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
