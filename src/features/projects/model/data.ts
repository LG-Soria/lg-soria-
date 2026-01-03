import { Project } from "@/shared/types";

export const projects: Project[] = [
    {
        id: 1,
        title: "Job Tracker",
        description: "Aplicación con Next.js de seguimiento de empleos con panel de administración, gestión de datos con PostgreSQL y backend con Nest.js.",
        image: "/proyectos/proyecto_4.png",
        stack: ["Next.js", "PostgreSQL", "Nest.js", "TailwindCSS", "JWT",],
        link: "https://jobtracker-lake.vercel.app/"
    },
    {
        id: 2,
        title: "AquaMaria - Landing Page",
        description: "Landing page para una empresa de alquiler de filtros y dispensers con Next.js, TailwindCSS y Framer Motion.",
        image: "/proyectos/proyecto_3.png",
        stack: ["Vite.js", "TailwindCSS", "Framer Motion"],
        link: "https://aqua-maria-landing.vercel.app/"
    },
    {
        id: 3,
        title: "Senti Pilates, Agenda Virtual - App Web",
        description: "Panel de gestion de clases para gimnasio con organizacion de horarios y control de asistencia.",
        image: "/proyectos/proyecto_2.png",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "https://senti-pilates.vercel.app/"
    },
    {
        id: 4,
        title: "Locas Puntadas - Ecommerce",
        description: "Tienda Personalizada para emprendimiento artenasal con diseño enfocado en fidelidad de marca.",
        image: "/proyectos/proyecto_1.png",
        stack: ["Next.js", "TailwindCSS", "Framer Motion"],
        link: "#"
    }
];
