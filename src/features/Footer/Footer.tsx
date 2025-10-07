import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-300 py-8 border">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Logo / Nombre */}
        <div className="text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Lucas Soria
        </div>

        {/* Links de contacto */}
        <div className="flex items-center gap-6 text-lg">
          <a
            href="mailto:lucasoria1996@gmail.com"
            aria-label="Email"
            className="transition-colors"
          >
            <FaEnvelope className="transition-colors duration-300 hover:text-[#0075FF]"  />
          </a>
          <a
            href="https://github.com/LG-Soria"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
            className="transition-colors"
          >
            <FaGithub className="transition-colors duration-300 hover:text-[#0075FF]"  />
          </a>
          <a
            href="https://www.linkedin.com/in/lucas-soria-g/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors"
          >
     <FaLinkedin className="transition-colors duration-300 hover:text-[#0075FF]" />
          </a>
        </div>
      </div>
    </footer>
  );
}
