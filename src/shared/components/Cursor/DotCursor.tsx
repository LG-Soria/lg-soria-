import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useGlobalMouse } from '@/shared/context/MouseContext';

export const DotCursor = () => {
    const { globalMouseX, globalMouseY, cursorType, isOverNavbar } = useGlobalMouse();
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
    const [overClickable, setOverClickable] = useState(false);
    const [activeLabel, setActiveLabel] = useState("");

    const isVisible = isOverNavbar || cursorType === 'dot';

    const springConfig = { damping: 25, stiffness: 200 };
    const cursorX = useSpring(globalMouseX, springConfig);
    const cursorY = useSpring(globalMouseY, springConfig);

    const getLabel = (element: HTMLElement): string => {
        const text = element.innerText?.trim().toUpperCase() || element.getAttribute('aria-label')?.toUpperCase() || '';
        const href = element.getAttribute('href')?.toLowerCase() || '';

        if (href.endsWith('.pdf')) return 'VER';
        if (href.startsWith('mailto:')) return 'ENVIAR';

        return 'IR A';
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const clickable = target.closest('a, button, [role="button"]');

            if (clickable && (cursorType !== 'inversion' || isOverNavbar)) {
                setOverClickable(true);
                setActiveLabel(getLabel(clickable as HTMLElement));
            } else {
                setOverClickable(false);
            }
        };

        const handleClick = (e: MouseEvent) => {
            if (!isVisible) return;
            const id = Date.now();
            setRipples(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);

            setTimeout(() => {
                setRipples(prev => prev.filter(r => r.id !== id));
            }, 1000);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('click', handleClick);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('click', handleClick);
            document.body.style.cursor = 'auto';
        };
    }, [isVisible, cursorType]);

    // Handle body cursor hiding separately to avoid flicker
    useEffect(() => {
        if (isVisible) {
            document.body.style.cursor = 'none';
        } else {
            document.body.style.cursor = 'auto';
        }
    }, [isVisible]);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]">
            {/* Ripples */}
            <AnimatePresence>
                {ripples.map(ripple => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ scale: 4, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="fixed w-10 h-10 border border-[#0EA5E9] rounded-full"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            translateX: '-50%',
                            translateY: '-50%',
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Dot Cursor / Label */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        layout
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            backgroundPosition: overClickable ? ["0% 50%", "100% 50%", "0% 50%"] : "0% 50%"
                        }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{
                            backgroundPosition: {
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            },
                        }}
                        className={`fixed top-0 left-0 flex items-center justify-center pointer-events-none z-50
                            ${overClickable
                                ? 'px-4 py-1.5 bg-gradient-to-r from-[#0075FF] via-[#3B82F6] to-[#0044CC] rounded-xl whitespace-nowrap shadow-[0_10px_20px_rgba(0,117,255,0.3)]'
                                : 'w-3 h-3 bg-[#0EA5E9] rounded-full shadow-[0_0_15px_#0EA5E9]'
                            }`}
                        style={{
                            x: cursorX,
                            y: cursorY,
                            translateX: '-50%',
                            translateY: '-50%',
                            backgroundSize: overClickable ? '200% 200%' : '100% 100%',
                        }}
                    >
                        {/* Pulse Effect */}
                        {overClickable && (
                            <motion.div
                                initial={{ opacity: 0, scale: 1 }}
                                animate={{
                                    opacity: [0, 0.5, 0],
                                    scale: [1, 1.2, 1.4]
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeOut"
                                }}
                                className="absolute inset-0 border-2 border-[#0075FF] rounded-xl"
                            />
                        )}

                        {overClickable && (
                            <motion.span
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="text-[10px] font-medium text-white tracking-[0.2em]"
                            >
                                {activeLabel}
                            </motion.span>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
