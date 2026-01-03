import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { useGlobalMouse } from '@/shared/context/MouseContext';

interface BackgroundEffectProps {
    sectionRef: React.RefObject<HTMLElement | null>;
}

export const BackgroundEffect = ({ sectionRef }: BackgroundEffectProps) => {
    const { globalMouseX, globalMouseY } = useGlobalMouse();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    // Smooth spring configuration for mouse follow
    const springConfig = { damping: 25, stiffness: 150 };
    const smoothX = useSpring(globalMouseX, springConfig);
    const smoothY = useSpring(globalMouseY, springConfig);

    // Scroll transformations for blobs
    const blob1Y = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const blob2Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const blob3Y = useTransform(scrollYProgress, [0, 1], [0, 50]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-neutral-950"
        >
            {/* Spotlight Effect */}
            <motion.div
                className="absolute inset-0 opacity-40 transition-opacity duration-300"
                style={{
                    background: useTransform(
                        [smoothX, smoothY],
                        ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(14, 165, 233, 0.15), transparent 80%)`
                    ),
                }}
            />

            {/* Floating Background Blobs */}
            <motion.div
                style={{ y: blob1Y }}
                className="absolute top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#0EA5E9]/5 blur-[120px] rounded-full"
            />
            <motion.div
                style={{ y: blob2Y }}
                className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#3B82F6]/5 blur-[120px] rounded-full"
            />
            <motion.div
                style={{ y: blob3Y }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] bg-[#0EA5E9]/3 blur-[100px] rounded-full"
            />

            {/* Subtle Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(#FFFFFF 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />
        </div>
    );
};
