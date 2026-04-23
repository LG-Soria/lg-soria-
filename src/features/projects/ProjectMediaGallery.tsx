import {
  AnimatePresence,
  motion,
  type MotionValue,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectMediaGalleryProps = {
  images: string[];
  alt: string;
  parallaxY: MotionValue<number>;
};

const AUTO_PLAY_MS = 5000;
const MANUAL_PAUSE_MS = 6500;
const SWIPE_THRESHOLD = 48;

export default function ProjectMediaGallery({
  images,
  alt,
  parallaxY,
}: ProjectMediaGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(rootRef, { amount: 0.35 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);
  const [isManualPaused, setIsManualPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 768px)").matches : true,
  );
  const resumeTimeoutRef = useRef<number | null>(null);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const totalImages = images.length;
  const hasMultiple = totalImages > 1;
  const shouldReduceMotion = Boolean(prefersReducedMotion);

  const getWrappedIndex = useCallback(
    (index: number) => (index + totalImages) % totalImages,
    [totalImages],
  );

  const releaseManualPause = useCallback(() => {
    setIsManualPaused(false);
    resumeTimeoutRef.current = null;
  }, []);

  const applyManualPause = useCallback(() => {
    if (!hasMultiple) return;
    setIsManualPaused(true);

    if (resumeTimeoutRef.current !== null) {
      window.clearTimeout(resumeTimeoutRef.current);
    }

    resumeTimeoutRef.current = window.setTimeout(releaseManualPause, MANUAL_PAUSE_MS);
  }, [hasMultiple, releaseManualPause]);

  const goNext = useCallback(
    (isManual: boolean) => {
      if (!hasMultiple) return;
      if (isManual) applyManualPause();

      setDirection(1);
      setActiveIndex((current) => getWrappedIndex(current + 1));
    },
    [applyManualPause, getWrappedIndex, hasMultiple],
  );

  const goPrev = useCallback(
    (isManual: boolean) => {
      if (!hasMultiple) return;
      if (isManual) applyManualPause();

      setDirection(-1);
      setActiveIndex((current) => getWrappedIndex(current - 1));
    },
    [applyManualPause, getWrappedIndex, hasMultiple],
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!hasMultiple || shouldReduceMotion || !isInView || isHovered || isManualPaused) return;

    const intervalId = window.setInterval(() => {
      goNext(false);
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(intervalId);
  }, [goNext, hasMultiple, isHovered, isInView, isManualPaused, shouldReduceMotion]);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current !== null) {
        window.clearTimeout(resumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setActiveIndex((current) => getWrappedIndex(current));
  }, [getWrappedIndex, totalImages]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple) return;

    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!hasMultiple || !touchStartRef.current) return;

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const elapsed = Date.now() - touchStartRef.current.time;
    touchStartRef.current = null;

    const isHorizontalSwipe =
      Math.abs(deltaX) > SWIPE_THRESHOLD &&
      Math.abs(deltaX) > Math.abs(deltaY) * 1.2 &&
      elapsed < 700;

    if (!isHorizontalSwipe) return;

    if (deltaX < 0) {
      goNext(true);
      return;
    }

    goPrev(true);
  };

  if (!images.length) {
    return null;
  }

  const currentImage = images[activeIndex];
  const canUseParallax = isDesktop && !shouldReduceMotion;

  return (
    <div
      ref={rootRef}
      className="relative h-full w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1] opacity-0 transition-opacity duration-300 group-hover/project:opacity-100 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.03),transparent_48%),linear-gradient(180deg,rgba(2,2,2,0.08),rgba(2,2,2,0.18))]"
      />

      <motion.div
        style={canUseParallax ? { y: parallaxY } : undefined}
        className="absolute inset-x-0 -inset-y-2 will-change-transform"
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={`${currentImage}-${activeIndex}`}
            src={currentImage}
            alt={alt}
            loading="lazy"
            className="absolute inset-x-1 inset-y-2 h-[calc(100%-1rem)] w-[calc(100%-0.5rem)] object-contain object-center brightness-[0.97] transition-[filter] duration-500 group-hover/project:brightness-100 md:inset-x-2 md:inset-y-3 md:h-[calc(100%-1.5rem)] md:w-[calc(100%-1rem)]"
            initial={
              shouldReduceMotion
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: direction > 0 ? 14 : -14 }
            }
            animate={{ opacity: 1, x: 0 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0.95, x: 0 }
                : { opacity: 0, x: direction > 0 ? -14 : 14 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.12, ease: "linear" }
                : { duration: 0.42, ease: [0.24, 1, 0.36, 1] }
            }
          />
        </AnimatePresence>
      </motion.div>

      {hasMultiple && (
        <>
          <button
            type="button"
            aria-label="Imagen anterior"
            onClick={() => goPrev(true)}
            className="absolute inset-y-0 left-0 z-20 w-[34%] cursor-none bg-transparent transition-colors duration-300 hover:bg-gradient-to-r hover:from-black/24 hover:to-transparent"
          />
          <button
            type="button"
            aria-label="Imagen siguiente"
            onClick={() => goNext(true)}
            className="absolute inset-y-0 right-0 z-20 w-[34%] cursor-none bg-transparent transition-colors duration-300 hover:bg-gradient-to-l hover:from-black/24 hover:to-transparent"
          />
          <span className="pointer-events-none absolute right-3 top-3 z-30 rounded-[3px] border border-white/15 bg-black/45 px-2 py-[2px] font-mono text-[0.62rem] tracking-[0.16em] text-white/76 backdrop-blur-[1px]">
            {activeIndex + 1} / {totalImages}
          </span>
        </>
      )}
    </div>
  );
}
