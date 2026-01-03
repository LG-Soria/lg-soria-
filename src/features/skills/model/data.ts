import { LuCode, LuDatabase, LuGlobe, LuWrench, LuServer } from "@/shared/ui/icons";
import { SkillCategory } from "@/shared/types";

export const skillsData: SkillCategory[] = [
    {
        id: 1,
        title: 'FRONTEND',
        description:
            'Desarrollo de interfaces modernas, responsivas y accesibles con ecosistema React de última generación.',
        icon: LuCode,
        tech: [
            'HTML5', 'CSS3',
            'JavaScript', 'TypeScript',
            'React.js', 'Next.js', 'Vite',
            'TailwindCSS',
            'Zustand', 'React Query',
            'Framer Motion',
            'Tremor',
        ],
        highlights: [
            'Componentes reutilizables y hooks personalizados',
            'Rendimiento (code splitting, lazy loading, optimización de re-renders)',
            'Accesibilidad (a11y) y UI consistente (design system)',
            'Gráficos y tablas complejas (Tremor / tablas avanzadas)',
        ],
    },
    {
        id: 2,
        title: 'BACKEND',
        description:
            'Construcción de APIs y servicios con lógica de negocio clara, seguridad y buena arquitectura.',
        icon: LuDatabase,
        tech: [
            'Node.js', 'TypeScript',
            'Express', 'Nest.js',
            'PostgreSQL', 'MongoDB',
            'JWT', 'Prisma',
        ],
        highlights: [
            'Diseño de APIs REST y patrones de arquitectura (capas, módulos)',
            'Autenticación/autorización (JWT, roles, sesiones)',
            'Optimización de consultas y modelado de datos',
            'Manejo de errores, validación y buenas prácticas de seguridad',
        ],
    },
    {
        id: 3,
        title: 'DEVOPS & DEPLOY',
        description:
            'Deployment, infraestructura y automatización para entornos confiables y mantenibles.',
        icon: LuServer,
        tech: [
            'Linux', 'Docker', 'Docker Compose',
            'NGINX', 'PM2',
            'Vercel',
            'SSL/Let’s Encrypt', 'SSH', 'UFW',
        ],
        highlights: [
            'Configuración de VPS, dominios, reverse proxy y SSL',
            'Contenerización y despliegue reproducible',
            'Gestión de procesos y logs (PM2)',
            'Buenas prácticas básicas de hardening y networking',
        ],
    },
    {
        id: 4,
        title: 'INTEGRACIONES',
        description:
            'Conexión con servicios de terceros: pagos, autenticación, webhooks y sincronización de datos.',
        icon: LuGlobe,
        tech: [
            'Mercado Pago',
            'Google API', 'OAuth 2.0',
            'Webhooks',
            'Socket.io',

        ],
        highlights: [
            'Pasarelas de pago y flujos de checkout',
            'Autenticación social y manejo de sesiones (OAuth)',
            'Sincronización de eventos (webhooks) y tiempo real (Socket.io)',
            'Integración con APIs externas y manejo de rate limits/errors',
        ],
    },
    {
        id: 5,
        title: 'HERRAMIENTAS',
        description:
            'Stack de desarrollo y colaboración para flujos de trabajo profesionales.',
        icon: LuWrench,
        tech: [
            'Git', 'GitHub',
            'VS Code', 'Postman',
            'Figma',
        ],
        highlights: [
            'Control de versiones and buenas prácticas de branches',
            'Debugging y profiling',
            'Documentación técnica y handoff ordenado',
            'Diseño UI/UX centrado en el usuario',
        ],
    },
];
