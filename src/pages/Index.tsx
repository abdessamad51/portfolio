import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Experience } from "@/components/sections/Experience";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { ScrollReveal } from "@/components/sections/ScrollReveal";

const Index = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <div className="relative min-h-screen bg-background text-foreground transition-colors duration-300">
          <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-3xl
              bg-[radial-gradient(ellipse_at_center,rgba(14,116,214,0.12)_0%,transparent_70%)]
              dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.18)_0%,transparent_70%)]" />
            <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full blur-3xl
              bg-[radial-gradient(ellipse_at_center,rgba(45,212,191,0.07)_0%,transparent_70%)]
              dark:bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.12)_0%,transparent_70%)]" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[400px] rounded-full blur-3xl
              bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.05)_0%,transparent_70%)]
              dark:bg-[radial-gradient(ellipse_at_center,rgba(14,165,233,0.10)_0%,transparent_70%)]" />
            <div
              className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "128px 128px",
              }}
            />
          </div>

          <div className="fixed top-0 left-0 right-0 z-50 h-px bg-gradient-to-r from-transparent via-sky-400/40 to-transparent" />

          <Navbar />

          <main className="relative z-10">
            <section className="relative pt-10 md:pt-12">
              <div className="ui-shell rounded-3xl overflow-hidden">
                <Hero />
              </div>
            </section>

            <SectionDivider />
            <Experience />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Education />
            <SectionDivider />
            <ScrollReveal delay={0.2}><Certifications /></ScrollReveal>
            <SectionDivider />
            <ScrollReveal delay={0.2}><Contact /></ScrollReveal>
            <ScrollReveal delay={0.15}><Footer /></ScrollReveal>
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

function SectionDivider() {
  return (
    <div className="relative py-2 flex items-center justify-center overflow-hidden">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300/70 dark:via-white/[0.08] to-transparent" />
    </div>
  );
}

export default Index;