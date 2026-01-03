import Button from "@/shared/ui/Button";
import ScrollHint from "@/shared/ui/ScrollHint";

export default function Home() {

  const handleConnectClick = () => {
    window.open(
      "https://www.linkedin.com/in/lucas-soria-g",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section
      id="inicio"
      data-cursor="inversion"
      className="relative cursor-none z-20 mx-auto min-h-screen w-full overflow-hidden px-4 py-16"
    >
      {/* Contenido en su propio stack */}
      <div className="flex min-h-[60vh] flex-col max-w-6xl mx-auto items-center justify-center space-y-6 md:space-y-10 text-center px-4">
        <h1 className="text-6xl md:text-9xl font-bold tracking-tight">LG-SORIA</h1>
        <p className="max-w-prose text-2xl md:text-6xl text-white/70">Web Developer</p>
        <Button variant="ghost" withIcon="hover" onClick={handleConnectClick}>
          Conectar
        </Button>
      </div>

      {/* Hint: fuera del stack con space-y */}
      <ScrollHint
        appearAfterMs={2400}
        topThresholdPx={12}
        bottomOffset={196} // más alto para que se vea en el home
        fixed={false} // absoluto dentro de la sección
        label="Scrollea"
      />
      {/*
        Si querés que quede pegado al viewport incluso fuera del hero:
        <ScrollHint fixed label="Scrollea" />
      */}
    </section>
  );
}
