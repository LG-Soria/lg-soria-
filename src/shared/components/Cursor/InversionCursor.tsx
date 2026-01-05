import { motion, useSpring, useMotionValue, AnimatePresence, useVelocity, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGlobalMouse } from '@/shared/context/MouseContext';

export const InversionCursor = () => {
    const { globalMouseX, globalMouseY, cursorType, activeContainer, isOverNavbar } = useGlobalMouse();
    const [isPressed, setIsPressed] = useState(false);
    const [overClickable, setOverClickable] = useState(false);

    const isVisible = cursorType === 'inversion' && !isOverNavbar;

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

    // Boundary-based scale (Dynamic calculation based on live rect)
    const boundaryScale = useTransform(
        globalMouseY,
        (y: number) => {
            if (!activeContainer) return 1;
            const rect = activeContainer.getBoundingClientRect();
            // Tight zone for transformation
            const threshold = 80;

            const distTop = Math.max(0, y - rect.top);
            const distBottom = Math.max(0, rect.bottom - y);
            const minDist = Math.min(distTop, distBottom);

            if (minDist < threshold) {
                // Sharper easing: keep it large longer then drop fast
                const normalized = minDist / threshold;
                return 0.15 + Math.pow(normalized, 1.5) * 0.85;
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
        const targetValue = isPressed ? 0.8 : overClickable ? 1.4 : 1;
        animate(interactionScale, targetValue, {
            duration: 0.3,
            ease: [0.23, 1, 0.32, 1] // Custom ease for snappier but smooth feel
        });
    }, [isPressed, overClickable, interactionScale]);

    useEffect(() => {
        if (!isVisible) return;

        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const isClickable = target.closest('a, button, [role="button"], input[type="submit"], input[type="button"]');
            setOverClickable(!!isClickable);
        };

        const handleMouseDown = () => setIsPressed(true);
        const handleMouseUp = () => setIsPressed(false);

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        // Hide native cursor globally when inversion cursor is active
        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'auto';
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        opacity: 1,
                        width: overClickable ? '6rem' : '8rem', // w-24 : w-32
                        height: overClickable ? '6rem' : '8rem', // h-24 : h-32
                        boxShadow: overClickable
                            ? '0 0 20px rgba(14, 165, 233, 0.4), inset 0 0 10px rgba(59, 130, 246, 0.4)'
                            : '0 0 0px rgba(0,0,0,0)',
                        backdropFilter: overClickable ? 'blur(0px)' : 'blur(1px)'
                    }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                        opacity: { duration: 0.2 },
                        backdropFilter: { duration: 0.4, ease: "easeInOut" },
                        width: { duration: 0.3, ease: "easeOut" },
                        height: { duration: 0.3, ease: "easeOut" }
                    }}
                    className="fixed top-0 left-0 bg-white rounded-full pointer-events-none mix-blend-difference z-[9999] flex items-center justify-center border-2 border-transparent transition-colors duration-300"
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
