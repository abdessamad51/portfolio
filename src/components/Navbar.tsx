import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

const navItems = [
  { key: "nav.about", href: "#about" },
  { key: "nav.experience", href: "#experience" },
  { key: "nav.projects", href: "#projects" },
  { key: "nav.skills", href: "#skills" },
  { key: "nav.education", href: "#education" },
  { key: "nav.certifications", href: "#certifications" },
  { key: "nav.contact", href: "#contact" },
];

export function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveHref(`#${id}`);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    if (!indicatorRef.current || !navRef.current) return;
    const activeEl = navRef.current.querySelector<HTMLElement>(
      `[data-href="${activeHref}"]`,
    );
    if (!activeEl) {
      indicatorRef.current.style.opacity = "0";
      return;
    }
    const navRect = navRef.current.getBoundingClientRect();
    const linkRect = activeEl.getBoundingClientRect();
    indicatorRef.current.style.opacity = "1";
    indicatorRef.current.style.width = `${linkRect.width}px`;
    indicatorRef.current.style.left = `${linkRect.left - navRect.left}px`;
  }, [activeHref]);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
          isScrolled
            ? "border-b border-slate-200/80 dark:border-white/[0.08] bg-white/82 dark:bg-[#0a121f]/82 backdrop-blur-2xl shadow-[0_8px_28px_rgba(15,23,42,0.08)] dark:shadow-[0_14px_38px_rgba(2,6,23,0.45)]"
            : "bg-transparent",
        ].join(" ")}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent transition-opacity duration-500 ${isScrolled ? "opacity-100" : "opacity-0"}`}
        />

        <div className="ui-shell py-3">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="group relative inline-flex flex-col leading-none"
              aria-label="Home"
            >
              <span className="text-base sm:text-lg font-semibold text-gradient">
                Abdessamad Rami
              </span>
            </a>

            <div
              ref={navRef}
              className="relative hidden md:flex items-center gap-1.5"
            >
              <div
                ref={indicatorRef}
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 h-8 rounded-lg bg-sky-50 dark:bg-sky-500/12 border border-sky-200/70 dark:border-sky-400/20 transition-all duration-300 ease-out opacity-0"
                aria-hidden
              />
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  data-href={item.href}
                  className={[
                    "relative z-10 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200",
                    activeHref === item.href
                      ? "text-sky-800 dark:text-sky-200"
                      : "text-slate-500 dark:text-white/55 hover:text-slate-800 dark:hover:text-white/85",
                  ].join(" ")}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="mx-2 h-5 w-px bg-slate-300/80 dark:bg-white/[0.12]" />
              <LanguageToggle />
              <ThemeToggle />
            </div>

            <div className="md:hidden flex items-center gap-3">
              <LanguageToggle />
              <ThemeToggle />
              <button
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="ui-control"
              >
                <span
                  className={`absolute transition-all duration-200 ${isMobileMenuOpen ? "opacity-100" : "opacity-0 rotate-90"}`}
                >
                  <X size={16} className="text-slate-600 dark:text-white/80" />
                </span>
                <span
                  className={`absolute transition-all duration-200 ${isMobileMenuOpen ? "opacity-0 -rotate-90" : "opacity-100"}`}
                >
                  <Menu
                    size={16}
                    className="text-slate-600 dark:text-white/80"
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-400 ${isMobileMenuOpen ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`absolute inset-0 bg-black/30 dark:bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}`}
        />
        <div
          className={[
            "absolute top-[64px] left-4 right-4 rounded-2xl overflow-hidden",
            "border border-slate-200/90 dark:border-white/[0.1]",
            "bg-white/96 dark:bg-[#0d1726]/95 backdrop-blur-2xl",
            "shadow-[0_20px_56px_rgba(0,0,0,0.14)] dark:shadow-[0_32px_64px_rgba(0,0,0,0.62)]",
            "transition-all duration-300 ease-out origin-top",
            isMobileMenuOpen
              ? "opacity-100 scale-y-100 translate-y-0"
              : "opacity-0 scale-y-95 -translate-y-2",
          ].join(" ")}
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />
          <div className="p-3">
            {navItems.map((item, i) => (
              <a
                key={item.key}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={[
                  "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-150",
                  activeHref === item.href
                    ? "bg-sky-50 dark:bg-sky-500/12 text-sky-700 dark:text-sky-200 border border-sky-200 dark:border-sky-400/20"
                    : "text-slate-600 dark:text-white/65 hover:bg-slate-50 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white",
                ].join(" ")}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${i * 35}ms` : "0ms",
                }}
              >
                <span>{t(item.key)}</span>
                {activeHref === item.href && (
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-300 shadow-[0_0_8px_rgba(56,189,248,0.85)]" />
                )}
              </a>
            ))}
          </div>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/60 dark:via-white/[0.08] to-transparent" />
        </div>
      </div>
    </>
  );
}
