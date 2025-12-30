import React, { useEffect, useState, useRef } from 'react'
import { LuCode, LuDatabase, LuGlobe, LuWrench } from 'react-icons/lu'

// --- Types ---
interface SkillCategory {
    id: number
    title: string
    description: string
    icon: React.ElementType
    tech: string[]
    highlights: string[]
}

// --- Data ---
const skillsData: SkillCategory[] = [
    {
        id: 1,
        title: 'FRONTEND',
        description: 'Desarrollo de interfaces modernas, responsivas y accesibles con ecosistemas React de última generación.',
        icon: LuCode,
        tech: [
            'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'TailwindCSS',
            'Zustand', 'React Query', 'Framer Motion'
        ],
        highlights: [
            'Componentes reutilizables y hooks personalizados',
            'Optimización de rendimiento (Code splitting, Lazy load)',
            'Integración de gráficos y tablas complejas (Tremor)',
            'Manejo de estados globales asíncronos'
        ]
    },
    {
        id: 2,
        title: 'BACKEND',
        description: 'Construcción de APIs escalables y microservicios que manejan alta concurrencia y lógica compleja.',
        icon: LuDatabase,
        tech: [
            'Node.js', 'Express', 'PostgreSQL', 'MongoDB',
            'Redis', 'Docker', 'NGINX', 'JWT'
        ],
        highlights: [
            'Diseño de APIs RESTful y escalables',
            'Configuración de VPS, SSL y Firewalls',
            'Orquestación de procesos con PM2',
            'Estrategias de caching y optimización de DB'
        ]
    },
    {
        id: 3,
        title: 'INTEGRACIONES',
        description: 'Conexión fluida con servicios de terceros, pasarelas de pago y herramientas de analytics.',
        icon: LuGlobe,
        tech: [
            'Mercado Pago', 'Stripe', 'Google API', 'OAuth 2.0',
            'Webhooks', 'Socket.io', 'Firebase'
        ],
        highlights: [
            'Pasarelas de pago y flujos de checkout',
            'Geolocalización y mapas interactivos',
            'Autenticación social y manejo de sesiones',
            'Sincronización de datos en tiempo real'
        ]
    },
    {
        id: 4,
        title: 'HERRAMIENTAS',
        description: 'Stack completo de desarrollo, diseño y deployment para flujos de trabajo profesionales.',
        icon: LuWrench,
        tech: [
            'Git', 'GitHub', 'Figma', 'Postman',
            'VS Code', 'Vercel', 'Linux'
        ],
        highlights: [
            'Flujos de trabajo CI/CD y control de versiones',
            'Debugging avanzado y profiling',
            'Documentación técnica y guías de uso',
            'Diseño UI/UX centrado en el usuario'
        ]
    }
]

export default function SkillsTimeline() {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollContainerRef = useRef<HTMLDivElement>(null)
    const cardRefs = useRef<(HTMLDivElement | null)[]>([])

    // Handle scroll to update active index
    const handleScroll = () => {
        if (!scrollContainerRef.current) return
        const container = scrollContainerRef.current
        const center = container.scrollLeft + container.clientWidth / 2

        let closestIndex = 0
        let minDistance = Infinity

        cardRefs.current.forEach((card, index) => {
            if (!card) return
            const cardCenter = card.offsetLeft + card.offsetWidth / 2
            const distance = Math.abs(center - cardCenter)

            if (distance < minDistance) {
                minDistance = distance
                closestIndex = index
            }
        })

        if (closestIndex !== activeIndex) {
            setActiveIndex(closestIndex)
        }
    }

    // Scroll to specific card
    const scrollToCard = (index: number) => {
        const card = cardRefs.current[index]
        const container = scrollContainerRef.current
        if (!card || !container) return

        const scrollLeft =
            card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth',
        })
    }

    // Debounce scroll handler
    useEffect(() => {
        const container = scrollContainerRef.current
        if (!container) return

        let timeoutId: number
        const onScroll = () => {
            window.cancelAnimationFrame(timeoutId)
            timeoutId = window.requestAnimationFrame(handleScroll)
        }

        container.addEventListener('scroll', onScroll)

        return () => {
            container.removeEventListener('scroll', onScroll)
            window.cancelAnimationFrame(timeoutId)
        }
    }, [activeIndex])

    // Initial center
    useEffect(() => {
        setTimeout(() => scrollToCard(0), 100)
    }, [])

    return (
        <section id="skills" className="w-full bg-neutral-950 py-20 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
                <div>
                    <h2 className="bg-gradient-to-r from-[#0EA5E9] to-[#3B82F6] bg-clip-text text-transparent font-mono text-sm tracking-widest mb-2">
                        EXPERTISE
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
                <div className="shrink-0 w-[calc(50vw-200px)] md:w-[calc(50vw-250px)]" />

                {skillsData.map((skill, index) => {
                    const isActive = index === activeIndex
                    return (
                        <div
                            key={skill.id}
                            ref={(el) => { cardRefs.current[index] = el }}
                            className="snap-center shrink-0 mx-4 md:mx-8 transition-all duration-700 ease-out"
                            style={{
                                transform: isActive ? 'scale(1)' : 'scale(0.85)',
                                opacity: isActive ? 1 : 0.5,
                                filter: isActive ? 'blur(0px)' : 'blur(2px)',
                                zIndex: isActive ? 10 : 1,
                            }}
                            onClick={() => scrollToCard(index)}
                        >
                            {/**Borde superior */}
                            <div
                                className={`
                w-[340px] md:w-[450px] h-[600px]
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

                                <div className="p-8 h-full flex flex-col relative z-10">
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
                                                    className="group/item flex items-start text-sm text-gray-400 hover:text-white transition-colors cursor-default"
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
                    )
                })}

                {/* Spacer */}
                <div className="shrink-0 w-[calc(50vw-200px)] md:w-[calc(50vw-250px)]" />
            </div>

            {/* Navigation Dots */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center">
                <div className="relative flex items-center gap-16 md:gap-32">
                    {/* Connecting Line */}
                    <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-white/10 -z-10" />

                    {skillsData.map((skill, index) => (
                        <button
                            key={skill.id}
                            onClick={() => scrollToCard(index)}
                            className="group relative flex flex-col items-center justify-center focus:outline-none"
                            aria-label={`Go to ${skill.title}`}
                        >
                            <div
                                className={`
                w-3 h-3 rounded-full border-2 transition-all duration-500 z-10
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
        </section>
    )
}
