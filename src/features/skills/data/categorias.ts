// Tipos
type CategoriaKey = "frontend" | "backend" | "integraciones" | "herramientas";

type Categoria = { key: CategoriaKey; titulo: string; items: string[] };
// Datos
export const CATEGORIAS: Categoria[] = [
  {
    key: "frontend",
    titulo: "Frontend",
    items: [
      "JavaScript (ES6+), TypeScript, HTML5, CSS3, TailwindCSS.",
      "React.js, Next.js, Vite, Electron.",
      "Manejo de rutas con react-router-dom y Next Router.",
      "Gestión de estado con Zustand y React Query.",
      "Componentes reutilizables, hooks personalizados, optimización de rendimiento (memoization, lazy loading, code splitting).",
      "Integración de bibliotecas de gráficos/tablas (Tremor, react-table, recharts).",
      "Formularios complejos con validaciones, búsquedas avanzadas y filtrado de datos.",
    ],
  },
  {
    key: "backend",
    titulo: "Backend y DevOps",
    items: [
      "Node.js con Express, APIs REST, JWT Auth.",
      "Configuración de VPS desde cero: dominios, subdominios, SSL, firewall (UFW).",
      "NGINX como reverse proxy y balanceo básico.",
      "PM2 para orquestación de procesos Node.",
      "Manejo básico de Docker para entornos de prueba.",
    ],
  },
  {
    key: "integraciones",
    titulo: "Integraciones y APIs",
    items: [
      "Mercado Pago (QR, POS, órdenes presenciales y online).",
      "Clover (dispositivos físicos, flujo de conexión y transacciones).",
      "Google Maps API (geolocalización y visualización).",
      "Ranking Veraz API (consultas y visualización de datos).",
      "Implementación de OAuth 2.0 (tokens de acceso y refresh).",
      "Configuración de webhooks para notificaciones en tiempo real.",
    ],
  },
  {
    key: "herramientas",
    titulo: "Herramientas y Otros",
    items: [
      "Git y GitHub (flujo con ramas, PR, resolución de conflictos).",
      "Debugging avanzado en Chrome DevTools.",
      "Postman / Thunder Client para pruebas de API.",
      "Documentación técnica (Markdown, guías de uso, ejemplos).",
    ],
  },
];