import { SkillCategory } from '@/shared/types';
import { motion, AnimatePresence } from 'framer-motion';

interface SkillCardProps {
    skill: SkillCategory;
    isActive: boolean;
    onClick: () => void;
    // We pass the ref from the parent to handle the scroll spy logic
    cardRef?: (el: HTMLDivElement | null) => void;
}

export function SkillCard({ skill, isActive, onClick, cardRef }: SkillCardProps) {
    return (
        <motion.div
            ref={cardRef}
            layout
            className="snap-center shrink-0 mx-4 md:mx-8 transition-all duration-700 ease-out"
            initial={{ opacity: 0, y: 20 }}
            animate={{
                opacity: isActive ? 1 : 0.4,
                scale: isActive ? 1 : 0.85,
                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                zIndex: isActive ? 10 : 1,
                y: 0
            }}
            whileHover={{ scale: isActive ? 1.02 : 0.9 }}
            onClick={onClick}
        >
            {/**Card Container */}
            <div
                className={`
w-[340px] md:w-[450px] h-[520px] md:h-[600px]
bg-black border transition-all duration-500
flex flex-col relative overflow-hidden group
${isActive ? 'border-[#0EA5E9] shadow-[0_0_30px_rgba(14,165,233,0.15)]' : 'border-white/10 hover:border-white/20'}
`}
            >
                {/* Top Border Animation */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] transform origin-left"
                    animate={{ scaleX: isActive ? 1 : 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />

                <div className="p-6 md:p-8 h-full cursor-none flex flex-col relative z-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <motion.div
                            animate={{
                                borderColor: isActive ? '#0EA5E9' : 'rgba(255,255,255,0.2)',
                                color: isActive ? '#0EA5E9' : 'rgba(255,255,255,0.5)'
                            }}
                            className={`
      p-2 md:p-3 border transition-colors duration-300
      ${!isActive && 'md:group-hover:border-[#0EA5E9] md:group-hover:text-[#0EA5E9]'}
    `}
                        >
                            <skill.icon className="w-5 h-5 md:w-6 md:h-6" />
                        </motion.div>
                        <span
                            className={`
      font-mono text-sm
      ${isActive ? 'text-[#0EA5E9]' : 'text-[#0EA5E9] md:text-white/30 md:group-hover:text-[#0EA5E9]'}
    `}
                        >
                            0{skill.id}
                        </span>
                    </div>

                    {/* Title */}
                    <motion.h4
                        animate={{ color: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.7)' }}
                        className="text-2xl font-bold mb-4 tracking-tight transition-colors duration-300"
                    >
                        {skill.title}
                    </motion.h4>

                    {/* Description */}
                    <motion.p
                        animate={{ color: isActive ? 'rgba(156,163,175,1)' : 'rgba(75,85,99,1)' }}
                        className="text-sm leading-relaxed mb-6 md:mb-8 transition-colors duration-300"
                    >
                        {skill.description}
                    </motion.p>

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
                            {skill.tech.map((tech, idx) => (
                                <motion.span
                                    key={tech}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className={`
            px-3 py-1.5 rounded-lg text-xs font-medium
            transition-all duration-300
            ${isActive ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20 hover:bg-[#0EA5E9]/20 hover:text-white hover:border-[#0EA5E9]/40' : 'bg-slate-900/30 text-slate-600 border border-slate-800/30'}
          `}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                    </div>

                    {/* Key Highlights - Hidden on mobile */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex-1 overflow-y-auto pr-2 custom-scrollbar hidden md:block"
                            >
                                <h5 className="text-xs font-semibold uppercase tracking-wider mb-3 text-gray-500">
                                    Destacados
                                </h5>
                                <ul className="space-y-3">
                                    {skill.highlights.map((highlight, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ x: -10, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="group/item flex items-start pl-1 text-sm text-gray-400 hover:text-white transition-colors cursor-none"
                                        >
                                            <span className="mt-1.5 mr-3 w-1.5 h-1.5 rounded-full shrink-0 bg-white/20 group-hover/item:scale-150 transition-all duration-300" />
                                            <span className="group-hover/item:translate-x-1 transition-transform duration-300">
                                                {highlight}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Background Icon Decoration */}
                <motion.div
                    animate={{ rotate: isActive ? 10 : 0, scale: isActive ? 1.1 : 1 }}
                    className="absolute bottom-0 right-0 p-4 opacity-5 pointer-events-none"
                >
                    <skill.icon className="w-32 h-32 md:w-48 md:h-48 -mb-8 -mr-8 md:-mb-12 md:-mr-12 text-white" />
                </motion.div>
            </div>
        </motion.div>
    );
}
