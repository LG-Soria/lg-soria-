import { SkillCategory } from '@/shared/types';

interface SkillsNavigationProps {
    skills: SkillCategory[];
    activeIndex: number;
    onSelect: (index: number) => void;
}

export function SkillsNavigation({ skills, activeIndex, onSelect }: SkillsNavigationProps) {
    return (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center items-center">
            <div className="relative flex items-center gap-16 md:gap-32">
                {/* Connecting Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10" />

                {skills.map((skill, index) => (
                    <button
                        key={skill.id}
                        onClick={() => onSelect(index)}
                        className="group relative flex flex-col cursor-none items-center justify-center focus:outline-none"
                        aria-label={`Go to ${skill.title}`}
                    >
                        <div
                            className={`
w-3 h-3 rounded-full border-2 transition-all duration-500 z-10 cursor-none
${index === activeIndex ? 'bg-[#0EA5E9] border-[#0EA5E9] scale-125 shadow-[0_0_15px_#0EA5E9]' : 'bg-black border-white/30 hover:border-white'}
`}
                        />
                        <span
                            className={`
absolute top-6 text-[10px] font-mono tracking-widest uppercase whitespace-nowrap transition-all duration-300
${index === activeIndex ? 'text-[#0EA5E9] opacity-100 translate-y-0' : 'text-gray-500 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}
`}
                        >
                            {skill.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
