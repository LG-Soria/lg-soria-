import { Project } from "@/shared/types";

export const projects: Project[] = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "Plataforma completa de comercio electrónico con panel de administración, gestión de inventario y pasarela de pagos integrada.",
        image: "/proyectos/proyecto_1.png",
        stack: ["React", "Node.js", "PostgreSQL", "Stripe"],
        link: "#"
    },
    {
        id: 2,
        title: "Portfolio Minimalista",
        description: "Diseño limpio y moderno enfocado en la presentación visual de trabajos creativos con animaciones fluidas.",
        image: "/proyectos/proyecto_2.png",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "#"
    },
    {
        id: 3,
        title: "Dashboard Analytics",
        description: "Panel de control interactivo para visualización de datos en tiempo real con gráficas dinámicas y exportación de reportes.",
        image: "/proyectos/proyecto_3.png",
        stack: ["Vue.js", "D3.js", "Firebase"],
        link: "#"
    },
    {
        id: 4,
        title: "App de Gestión de Tareas",
        description: "Aplicación de productividad para equipos con asignación de tareas, calendario y notificaciones en tiempo real.",
        image: "/proyectos/proyecto_4.png",
        stack: ["React Native", "Firebase", "Redux"],
        link: "#"
    }
];
