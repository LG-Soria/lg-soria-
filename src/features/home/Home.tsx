import Button from "@/components/ui/Button";
import ScrollHint from "@/components/ui/ScrollHint";

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
      className="relative z-20 mx-auto min-h-screen max-w-6xl overflow-hidden border border-b-0 px-4 py-16"
    >
      {/* Contenido en su propio stack */}
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-10">
        <h1 className="text-9xl font-bold tracking-tight">LG-SORIA</h1>
        <p className="max-w-prose text-6xl text-white/70">Web Developer</p>
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
