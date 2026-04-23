import { Project } from "@/shared/types";

const agendaPilatesImages = [
  "Captura de pantalla 2026-04-23 015437.png",
  "Captura de pantalla 2026-04-23 015451.png",
  "Captura de pantalla 2026-04-23 015516.png",
  "Captura de pantalla 2026-04-23 015543.png",
  "Captura de pantalla 2026-04-23 015606.png",
  "Captura de pantalla 2026-04-23 015619.png",
  "Captura de pantalla 2026-04-23 015632.png",
  "Captura de pantalla 2026-04-23 015638.png",
].map((fileName) => encodeURI(`/proyectos/agenda_pilates/${fileName}`));

const gestionAquaMariaImages = [
  "Captura de pantalla 2026-04-23 015707.png",
  "Captura de pantalla 2026-04-23 015722.png",
  "Captura de pantalla 2026-04-23 015808.png",
  "Captura de pantalla 2026-04-23 015824.png",
  "Captura de pantalla 2026-04-23 015838.png",
  "Captura de pantalla 2026-04-23 015906.png",
  "Captura de pantalla 2026-04-23 015936.png",
  "Captura de pantalla 2026-04-23 015950.png",
].map((fileName) => encodeURI(`/proyectos/gestion_aquamaria/${fileName}`));

const kaelEcommerceImages = [
  "Captura de pantalla 2026-04-23 020604.png",
  "Captura de pantalla 2026-04-23 020622.png",
  "Captura de pantalla 2026-04-23 020633.png",
  "Captura de pantalla 2026-04-23 020653.png",
  "Captura de pantalla 2026-04-23 020714.png",
  "Captura de pantalla 2026-04-23 020736.png",
  "Captura de pantalla 2026-04-23 020752.png",
  "Captura de pantalla 2026-04-23 020815.png",
  "Captura de pantalla 2026-04-23 020835.png",
  "Captura de pantalla 2026-04-23 020850.png",
  "Captura de pantalla 2026-04-23 020900.png",
  "Captura de pantalla 2026-04-23 020913.png",
  "Captura de pantalla 2026-04-23 020958.png",
  "Captura de pantalla 2026-04-23 021010.png",
  "Captura de pantalla 2026-04-23 021026.png",
  "Captura de pantalla 2026-04-23 021043.png",
  "Captura de pantalla 2026-04-23 021058.png",
  "Captura de pantalla 2026-04-23 021113.png",
].map((fileName) => encodeURI(`/proyectos/kael_ecommerce/${fileName}`));

export const projects: Project[] = [
  {
    id: 5,
    title: "Agenda Pilates",
    description:
      "Aplicación para planificación de clases y gestión del día a día de un estudio de pilates, con foco en organización, seguimiento y una experiencia clara de administración.",
    image: agendaPilatesImages[0],
    images: agendaPilatesImages,
    stack: ["Next.js", "Nest.js", "Prisma ORM", "PostgreSQL", "Clerk"],
    link: "https://github.com/LG-Soria/pilates_frontend",
  },
  {
    id: 6,
    title: "Gestión AquaMaria",
    description:
      "Sistema de gestión para AquaMaria pensado para centralizar operaciones, pedidos y seguimiento interno con una estructura clara y orientada al uso real.",
    image: gestionAquaMariaImages[0],
    images: gestionAquaMariaImages,
    stack: ["Next.js", "Nest.js", "Prisma ORM", "PostgreSQL", "JWT"],
    link: "https://github.com/LG-Soria/gestion_aquamaria_front",
  },
  {
    id: 7,
    title: "Kael Ecommerce",
    description:
      "Ecommerce con personalización de prendas, cotización para empresas y panel de gestión de pedidos, diseñado para integrar venta, operación y seguimiento en una misma experiencia.",
    image: kaelEcommerceImages[0],
    images: kaelEcommerceImages,
    stack: ["Next.js", "Nest.js", "Prisma ORM", "PostgreSQL", "JWT"],
    link: "https://kael.com.ar",
  },
  {
    id: 1,
    title: "Job Tracker",
    description:
      "Aplicación con Next.js de seguimiento de empleos con panel de administración, gestión de datos con PostgreSQL y backend con Nest.js.",
    image: "/proyectos/proyecto_4.png",
    images: ["/proyectos/proyecto_4.png", "/proyectos/proyecto_3.png"],
    stack: ["Next.js", "PostgreSQL", "Nest.js", "TailwindCSS", "JWT"],
    link: "https://jobtracker-lake.vercel.app/",
  },
  {
    id: 2,
    title: "AquaMaria - Landing Page",
    description:
      "Landing page para una empresa de alquiler de filtros y dispensers con Next.js, TailwindCSS y Framer Motion.",
    image: "/proyectos/proyecto_3.png",
    images: ["/proyectos/proyecto_3.png", "/proyectos/proyecto_2.png"],
    stack: ["Vite.js", "TailwindCSS", "Framer Motion"],
    link: "https://aqua-maria-landing.vercel.app/",
  },
  {
    id: 3,
    title: "Senti Pilates, Agenda Virtual - App Web",
    description:
      "Panel de gestión de clases para gimnasio con organización de horarios y control de asistencia.",
    image: "/proyectos/proyecto_2.png",
    images: ["/proyectos/proyecto_2.png", "/proyectos/proyecto_1.png"],
    stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    link: "https://senti-pilates.vercel.app/",
  },
  {
    id: 4,
    title: "Locas Puntadas - Ecommerce",
    description:
      "Tienda personalizada para emprendimiento artesanal con diseño enfocado en fidelidad de marca.",
    image: "/proyectos/proyecto_1.png",
    images: ["/proyectos/proyecto_1.png", "/proyectos/proyecto_4.png"],
    stack: ["Next.js", "TailwindCSS", "Framer Motion"],
    link: "https://locaspuntadas-ecommerce.vercel.app/",
  },
];
