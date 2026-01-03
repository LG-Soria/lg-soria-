import { SkillCategory } from '@/shared/types';

interface SkillCardProps {
    skill: SkillCategory;
    isActive: boolean;
    onClick: () => void;
    // We pass the ref from the parent to handle the scroll spy logic
    cardRef?: (el: HTMLDivElement | null) => void;
}

export function SkillCard({ skill, isActive, onClick, cardRef }: SkillCardProps) {
    return (
        <div
            ref={cardRef}
            className="snap-center shrink-0 mx-4 md:mx-8 transition-all duration-700 ease-out"
            style={{
                transform: isActive ? 'scale(1)' : 'scale(0.85)',
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                zIndex: isActive ? 10 : 1,
            }}
            onClick={onClick}
        >
            {/**Borde superior */}
            <div
                className={`
width-[340px] md:w-[450px] h-[600px]
bg-black border transition-all duration-500
flex flex-col relative overflow-hidden group
${isActive ? 'border-[#0EA5E9] shadow-[0_0_30px_rgba(14,165,233,0.15)]' : 'border-white/10 hover:border-white/20'}
`}
            >
                {/* Top Border Animation */}
                <div
                    className={`
  absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] transform origin-left transition-transform duration-500
  ${isActive ? 'scale-x-100' : 'scale-x-0'}
`}
                />

                <div className="p-8 h-full cursor-none flex flex-col relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div
                            className={`
      p-3 border transition-colors duration-300
      ${isActive ? 'border-[#0EA5E9] text-[#0EA5E9]' : 'border-white/20 text-white/50'}
    `}
                        >
                            <skill.icon className="w-6 h-6" />
                        </div>
                        <span
                            className={`
      font-mono text-sm
      ${isActive ? 'text-[#0EA5E9]' : 'text-white/30'}
    `}
                        >
                            0{skill.id}
                        </span>
                    </div>

                    {/* Title */}
                    <h4
                        className={`
    text-2xl font-bold mb-4 tracking-tight transition-colors duration-300
    ${isActive ? 'text-white' : 'text-white/70'}
  `}
                    >
                        {skill.title}
                    </h4>

                    {/* Description */}
                    <p
                        className={`
    text-sm leading-relaxed mb-8 transition-colors duration-300
    ${isActive ? 'text-gray-400' : 'text-gray-600'}
  `}
                    >
                        {skill.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="mb-6">
                        <h5
                            className={`
      text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300
      ${isActive ? 'text-gray-500' : 'text-gray-700'}
    `}
                        >
                            Tecnologías
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            {skill.tech.map((tech) => (
                                <span
                                    key={tech}
                                    className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-300
            ${isActive ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20 hover:bg-[#0EA5E9]/20 hover:text-white hover:border-[#0EA5E9]/40' : 'bg-slate-900/30 text-slate-600 border border-slate-800/30'}
          `}
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <h5
                            className={`
      text-xs font-semibold uppercase tracking-wider mb-3 transition-colors duration-300
      ${isActive ? 'text-gray-500' : 'text-gray-700'}
    `}
                        >
                            Destacados
                        </h5>
                        <ul className="space-y-3">
                            {skill.highlights.map((highlight, i) => (
                                <li
                                    key={i}
                                    className="group/item flex items-start pl-1 text-sm text-gray-400 hover:text-white transition-colors cursor-none"
                                >
                                    <span
                                        className={`
            mt-1.5 mr-3 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300
            ${isActive ? 'bg-white/20' : 'bg-white/10'}
            group-hover/item:scale-150
          `}
                                    />
                                    <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                                        {highlight}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Background Icon Decoration */}
                <div className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none">
                    <skill.icon className="w-48 h-48 -mb-12 -mr-12 text-white" />
                </div>
            </div>
        </div>
    );
}
