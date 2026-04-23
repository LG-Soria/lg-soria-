import { motion, useReducedMotion } from "framer-motion";
import {
  createRevealScaleVariants,
  createRevealVariants,
  createStaggerContainerVariants,
  IN_VIEW_ONCE,
} from "@/shared/lib/motion";

const JOURNEY_CONTENT = {
  sectionMark: "01",
  titleLineOne: "DE LO VISUAL",
  titleLineTwoPrefix: "AL",
  titleLineTwoAccent: "SISTEMA.",
  lead:
    "Empece desde el diseño, entendiendo como se organiza una interfaz, como se comunica una idea y como una decision visual puede cambiar la experiencia completa.",
  paragraphs: [
    "Con el tiempo, esa mirada se fue ampliando. Ya no se trataba solo de disenar una pantalla, sino de entender el producto, el contexto y la forma en que todo eso debia construirse.",
    "Hoy trabajo en ese cruce: diseño, producto e implementacion. No como partes separadas, sino como una misma forma de pensar y resolver experiencias digitales.",
  ],
} as const;

const BENTO_BLOCKS = [
  {
    id: "bento-1",
    imageSrc: "/about_1.png",
    imageAlt: "Interfaces y estructura visual",
    imagePosition: "object-[center_24%] lg:object-center",
    className:
      "col-span-1 min-h-40 sm:col-span-4 sm:row-span-2 sm:min-h-[14.8rem] lg:min-h-[16.4rem]",
  },
  {
    id: "bento-2",
    imageSrc: "/about_2.png",
    imageAlt: "Codigo y estructura tecnica",
    imagePosition: "object-[center_22%] lg:object-[center_28%]",
    className: "col-span-1 min-h-28 sm:col-span-2 sm:min-h-[7.1rem]",
  },
  {
    id: "bento-3",
    imageSrc: "/about_3.png",
    imageAlt: "Producto y proceso digital",
    imagePosition: "object-[center_38%] lg:object-[center_44%]",
    className: "col-span-1 min-h-28 sm:col-span-2 sm:min-h-[7.3rem]",
  },
] as const;

export default function JourneySection() {
  const prefersReducedMotion = useReducedMotion();
  const textBlockVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.09,
    delayChildren: 0.08,
  });
  const textItemVariants = createRevealVariants(prefersReducedMotion, { distance: 16 });
  const bentoContainerVariants = createStaggerContainerVariants(prefersReducedMotion, {
    stagger: 0.08,
    delayChildren: 0.04,
  });
  const bentoItemVariants = createRevealScaleVariants(prefersReducedMotion, { distance: 14 });

  return (
    <section
      id="about-journey"
      data-cursor="dot"
      className="relative cursor-none border-t border-white/10 px-6 pb-20 pt-18 md:px-10 md:pb-22 md:pt-22 lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={bentoContainerVariants}
          className="grid grid-cols-1 gap-3 sm:grid-cols-6 sm:gap-4 lg:order-1 lg:pt-2"
        >
          {BENTO_BLOCKS.map((block) => (
            <motion.article
              key={block.id}
              variants={bentoItemVariants}
              className={[
                "group relative overflow-hidden rounded-md border border-white/12 bg-[#0a0a0a] p-4 transition-colors duration-300 hover:border-[#0075FF]/28 sm:p-5",
                block.className,
              ].join(" ")}
            >
              <img
                src={block.imageSrc}
                alt={block.imageAlt}
                className={[
                  "absolute inset-0 h-full w-full object-cover saturate-[0.76] contrast-[1.06] brightness-[0.78]",
                  block.imagePosition,
                ].join(" ")}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.055)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px] opacity-[0.17]" />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(0,117,255,0.13),transparent_45%)]" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black/30 to-transparent" />
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW_ONCE}
          variants={textBlockVariants}
          className="relative lg:order-2"
        >
          <span className="pointer-events-none absolute -top-8 left-0 font-mono text-[5.4rem] leading-none tracking-[-0.06em] text-white/8 md:-top-10 md:text-[7.2rem] lg:text-[8rem]">
            {JOURNEY_CONTENT.sectionMark}
          </span>

          <div className="relative pt-6 md:pt-8">
            <motion.h2 variants={textItemVariants} className="mt-4 text-[2rem] font-semibold leading-[1.01] tracking-tight text-white sm:text-[2.4rem] md:text-5xl lg:text-[3.2rem]">
              <span className="block">{JOURNEY_CONTENT.titleLineOne}</span>
              <span className="mt-1 block md:mt-2">
                {JOURNEY_CONTENT.titleLineTwoPrefix}{" "}
                <span className="text-[#0075FF]">
                  {JOURNEY_CONTENT.titleLineTwoAccent}
                </span>
              </span>
            </motion.h2>

            <motion.p variants={textItemVariants} className="mt-5 max-w-[40rem] text-sm leading-relaxed text-white/68 md:text-base">
              {JOURNEY_CONTENT.lead}
            </motion.p>

            <motion.div variants={textItemVariants} className="mt-7 max-w-[40rem] space-y-5 md:mt-8 md:space-y-5">
              {JOURNEY_CONTENT.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-sm leading-relaxed text-white/68 md:text-base lg:leading-[1.72]"
                >
                  {paragraph}
                </p>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
