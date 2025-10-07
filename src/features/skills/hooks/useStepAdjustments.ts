import { useMemo } from "react";

type Adjustments = Partial<Record<number, number>>;

export function useStepAdjustments(): Adjustments {
  return useMemo(() => {
    // Ajustes específicos por índice
    const base: Adjustments = {
      0: -880, // intro larga → bajar más
      1: -800, // segunda sección → bajar más
      2: 100,  // tercera → empujar un poco extra
      3: 200,  // cuarta → empujar un poco más
    };

    // Opcional: ajustes condicionales según viewport
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        // ejemplo: pantallas chicas → reducir desplazamiento
        base[0] = -600;
        base[1] = -550;
      }
    }

    return base;
  }, []);
}
