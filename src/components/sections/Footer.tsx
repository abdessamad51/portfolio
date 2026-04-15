import { Mail, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { key: "nav.about",          href: "#about" },
  { key: "nav.experience",     href: "#experience" },
  { key: "nav.projects",       href: "#projects" },
  { key: "nav.skills",         href: "#skills" },
  { key: "nav.education",      href: "#education" },
  { key: "nav.certifications", href: "#certifications" },
  { key: "nav.contact",        href: "#contact" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t, language } = useLanguage();

  return (
    <footer className="relative mt-8 overflow-hidden">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/80 dark:via-sky-400/25 to-transparent" />
      <div className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(ellipse_at_50%_0%,rgba(14,165,233,0.09)_0%,transparent_65%)]" />

      <div className="relative z-10 ui-shell py-14">

        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">

          <div className="flex items-center gap-4">
            <div className="relative flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-sky-400 to-cyan-400 p-px">
                <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-[#0a0b10]">
                  <img src="/photo.webp" alt="Abdessamad Rami"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg"; }} />
                </div>
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white dark:border-[#08090c] shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
            <div>
              <p className="text-xl font-bold text-gradient leading-tight">
                Abdessamad Rami
              </p>
              <p className="text-xs text-slate-400 dark:text-white/35 mt-0.5" style={{ letterSpacing: "0.04em" }}>
                {t("hero.title")}
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-1 gap-y-1">
            {navItems.map((item) => (
              <a key={item.key} href={item.href}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-white/40 hover:text-slate-800 dark:hover:text-white/80 hover:bg-black/[0.04] dark:hover:bg-white/[0.05] transition-all duration-200">
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {[
              { href: "mailto:abdessamadrami51@gmail.com", icon: Mail, label: "Email" },
              { href: "tel:+212702558750", icon: Phone, label: "Phone" },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} aria-label={label}
                className="ui-control group hover:scale-110">
                <Icon className="w-4 h-4 text-slate-500 dark:text-white/50 group-hover:text-slate-800 dark:group-hover:text-white/90 transition-colors duration-200" />
              </a>
            ))}
          </div>
        </div>

        <div className="my-8 h-px bg-gradient-to-r from-transparent via-slate-300/75 dark:via-white/[0.1] to-transparent" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400 dark:text-white/25">
            © {currentYear} Abdessamad Rami. {t("rights.reserved")}
          </p>
          <p className="text-xs text-slate-300 dark:text-white/20 flex items-center gap-1.5">
            {language === "fr" ? "Conçu avec" : "Crafted with"}
            <span className="text-rose-400/70">♥</span>
            {language === "fr" ? "au Maroc" : "in Morocco"}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;