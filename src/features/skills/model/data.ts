import { LuCode, LuDatabase, LuGlobe, LuWrench } from "@/shared/ui/icons";
import { SkillCategory } from "@/shared/types";

export const skillsData: SkillCategory[] = [
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
];
