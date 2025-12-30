import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

interface SectionTransitionProps {
    direction: "expand" | "contract";
    className?: string;
}

export default function SectionTransition({ direction, className = "" }: SectionTransitionProps) {
    const [dimensions, setDimensions] = useState({ width: 1440, containerX: 144 });

    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const maxContainerWidth = 1152;
            const targetWidth = Math.min(width, maxContainerWidth);
            const containerX = (width - targetWidth) / 2;
            setDimensions({ width, containerX });
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const lineVariants: Variants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: { duration: 1.5, ease: "easeInOut" }
        }
    };

    const isExpand = direction === "expand";
    const { width, containerX } = dimensions;

    const startXLeft = containerX + 12.5;
    const startXRight = width - (containerX + 11.5);

    let pathLeft = "";
    let pathRight = "";

    if (isExpand) {
        // Skills -> Projects (Expand)
        // Left: Down from box edge to bottom, then Out to screen edge
        pathLeft = `M ${startXLeft} 0 L ${startXLeft} 200 L 0 200`;
        pathRight = `M ${startXRight} 0 L ${startXRight} 200 L ${width} 200`;
    } else {
        // Projects -> Contact (Contract)
        // Left: Down from screen edge to bottom, then In to box edge
        pathLeft = `M 0 0 L 0 200 L ${startXLeft} 200`;
        pathRight = `M ${width} 0 L ${width} 200 L ${startXRight} 200`;
    }

    return (
        <div className={`w-full overflow-hidden leading-none ${className}`}>
            <motion.svg
                viewBox={`0 0 ${width} 200`}
                preserveAspectRatio="none"
                className="h-24 w-full md:h-12"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
            >
                <motion.path d={pathLeft} fill="none" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" variants={lineVariants} />
                <motion.path d={pathRight} fill="none" stroke="rgba(255, 255, 255, 1)" strokeWidth="2" variants={lineVariants} />
            </motion.svg>
        </div>
    );
}
