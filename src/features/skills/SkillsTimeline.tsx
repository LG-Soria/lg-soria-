import { useEffect, useState, useRef } from 'react';
import { skillsData } from './model/data';
import { SkillCard } from './components/SkillCard';
import { SkillsNavigation } from './components/SkillsNavigation';
import { BackgroundEffect } from '@/shared/components/BackgroundEffect/BackgroundEffect';
import { useGlobalMouse } from '@/shared/context/MouseContext';

export default function SkillsTimeline() {
    const sectionRef = useRef<HTMLElement>(null);
    const { isOverNavbar } = useGlobalMouse();
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Handle scroll to update active index
    const handleScroll = () => {
        if (!scrollContainerRef.current) return;
        const container = scrollContainerRef.current;
        const center = container.scrollLeft + container.clientWidth / 2;

        let closestIndex = 0;
        let minDistance = Infinity;

        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const distance = Math.abs(center - cardCenter);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex);
        }
    };

    // Scroll to specific card
    const scrollToCard = (index: number) => {
        const card = cardRefs.current[index];
        const container = scrollContainerRef.current;
        if (!card || !container) return;

        const scrollLeft =
            card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        });
    };

    // Debounce scroll handler
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let timeoutId: number;
        const onScroll = () => {
            window.cancelAnimationFrame(timeoutId);
            timeoutId = window.requestAnimationFrame(handleScroll);
        };

        container.addEventListener('scroll', onScroll);

        return () => {
            container.removeEventListener('scroll', onScroll);
            window.cancelAnimationFrame(timeoutId);
        };
    }, [activeIndex]);

    // Initial center
    useEffect(() => {
        setTimeout(() => scrollToCard(0), 100);
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            data-cursor="dot"
            className="w-full py-20 pb-12 overflow-hidden relative"
        >
            <BackgroundEffect sectionRef={sectionRef} />

            <div className="max-w-7xl mx-auto px-6  flex justify-between items-end">
                <div>
                    <h2 className="bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] bg-clip-text text-transparent font-mono text-sm tracking-widest mb-2">
                        SOBRE MIS
                    </h2>
                    <h3 className="text-white text-4xl font-bold">
                        Habilidades Técnicas
                    </h3>
                </div>
                <div className="hidden md:block">
                    <span className="text-[#0EA5E9] font-mono text-xl">
                        0{activeIndex + 1}
                        <span className="text-white/30">/0{skillsData.length}</span>
                    </span>
                </div>
            </div>

            {/* Timeline Container */}
            <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto snap-x snap-mandatory pb-16 pt-8 px-[50vw] no-scrollbar items-center"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {/* Spacer */}
                <div className="shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-225px)]" />

                {skillsData.map((skill, index) => (
                    <SkillCard
                        key={skill.id}
                        skill={skill}
                        isActive={index === activeIndex}
                        onClick={() => scrollToCard(index)}
                        cardRef={(el) => { cardRefs.current[index] = el; }}
                    />
                ))}

                {/* Spacer */}
                <div className="shrink-0 w-[calc(50vw-170px)] md:w-[calc(50vw-225px)]" />
            </div>

            {/* Navigation Dots */}
            <SkillsNavigation
                skills={skillsData}
                activeIndex={activeIndex}
                onSelect={scrollToCard}
            />
        </section>
    );
}
