import { motion, useSpring, useMotionValue, AnimatePresence, useVelocity, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGlobalMouse } from '@/shared/context/MouseContext';

interface InversionCursorProps {
    containerRef: React.RefObject<HTMLElement | null>;
}

export const InversionCursor = ({ containerRef }: InversionCursorProps) => {
    const { globalMouseX, globalMouseY } = useGlobalMouse();
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [overClickable, setOverClickable] = useState(false);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(globalMouseX, springConfig);
    const cursorY = useSpring(globalMouseY, springConfig);

    // Dynamic scale based on velocity
    const xVelocity = useVelocity(globalMouseX);
    const yVelocity = useVelocity(globalMouseY);
    const combinedVelocity = useTransform([xVelocity, yVelocity], ([vx, vy]) =>
        Math.sqrt(Math.pow(vx as number, 2) + Math.pow(vy as number, 2))
    );

    const velocityScale = useTransform(combinedVelocity, [0, 3000], [1, 1.3]);
    const smoothScale = useSpring(velocityScale, { damping: 20, stiffness: 100 });

    // Boundary-based scale (shrink when approaching edges)
    const boundaryScale = useTransform(
        globalMouseY,
        (y: number) => {
            const container = containerRef.current;
            if (!container) return 1;
            const rect = container.getBoundingClientRect();
            const threshold = 150;

            const distTop = Math.max(0, y - rect.top);
            const distBottom = Math.max(0, rect.bottom - y);
            const minDist = Math.min(distTop, distBottom);

            if (minDist < threshold) {
                return 0.15 + (minDist / threshold) * 0.85;
            }
            return 1;
        }
    );

    // Interactive scale state (pulsing or growing)
    const interactionScale = useMotionValue(1);

    // Dynamic scale combining velocity, interaction, and boundaries
    const finalScale = useTransform(
        [smoothScale, interactionScale, boundaryScale],
        ([v, i, b]) => (v as number) * (i as number) * (b as number)
    );

    useEffect(() => {
        if (isPressed) {
            interactionScale.set(0.8);
        } else if (overClickable) {
            interactionScale.set(1.4);
        } else {
            interactionScale.set(1);
        }
    }, [isPressed, overClickable, interactionScale]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Detect clickable element
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');

            // Special check for Navbar: if over navbar, treat as "leaving" or "small dot"
            const isOverNavbar = !!target.closest('nav');

            setOverClickable(!!isClickable && !isOverNavbar);
        };

        const handleMouseEnter = () => {
            setIsHovered(true);
            container.style.cursor = 'none';
        };
        const handleMouseLeave = () => {
            setIsHovered(false);
            container.style.cursor = 'auto';
        };
        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseenter', handleMouseEnter);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseenter', handleMouseEnter);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            container.style.cursor = 'auto';
        };
    }, [containerRef]);

    return (
        <AnimatePresence>
            {isHovered && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        opacity: 1,
                        boxShadow: overClickable
                            ? '0 0 20px rgba(14, 165, 233, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.4)'
                            : '0 0 0px rgba(0,0,0,0)',
                        backdropFilter: overClickable ? 'blur(0px)' : 'blur(1px)'
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.2 },
                        backdropFilter: { duration: 0.4, ease: "easeInOut" }
                    }}
                    className={`fixed top-0 left-0 ${overClickable ? 'w-24 h-24' : 'w-32 h-32'} bg-white rounded-full pointer-events-none mix-blend-difference z-50 flex items-center justify-center border-2 border-transparent transition-colors duration-300`}
                    style={{
                        x: cursorX,
                        y: cursorY,
                        translateX: '-50%',
                        translateY: '-50%',
                        scale: finalScale,
                        borderColor: overClickable ? '#0EA5E9' : 'transparent',
                    }}
                >
                    {/* Ripple/Wave effect inside */}
                    <AnimatePresence>
                        {overClickable && (
                            <>
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                                    className="absolute inset-0 border border-[#3B82F6]/30 rounded-full"
                                />
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: 1.5, opacity: [0, 0.3, 0] }}
                                    transition={{ repeat: Infinity, duration: 2, delay: 0.7, ease: "easeOut" }}
                                    className="absolute inset-0 border border-[#0EA5E9]/20 rounded-full"
                                />
                            </>
                        )}
                    </AnimatePresence>

                    {/* Default center element */}
                    {!overClickable && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.1 }}
                            className="w-1/2 h-1/2 border border-black rounded-full"
                        />
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};
