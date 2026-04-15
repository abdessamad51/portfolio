import { Heart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

// 1. Local Translation Dictionary for this component
const localTranslations = {
  en: {
    title: "Languages & Personal Skills",
    languagesTitle: "Languages",
    languagesIssuer: "Communication",
    languagesDesc:
      "Arabic: Native. English: Professional. French: Intermediate.",
    softTitle: "Personal Skills",
    softIssuer: "Professional Behavior",
    softDesc:
      "Stress management and deadline commitment. Problem-solving mindset. Teamwork and collaboration.",
  },
  fr: {
    title: "Langues & Compétences Personnelles",
    languagesTitle: "Langues",
    languagesIssuer: "Communication",
    languagesDesc:
      "Arabe : Natif. Anglais : Professionnel. Français : Intermédiaire.",
    softTitle: "Compétences Personnelles",
    softIssuer: "Savoir-être Professionnel",
    softDesc:
      "Gestion du stress et respect des deadlines. Résolution de problèmes. Travail d'équipe.",
  },
};

const certificationsData = [
  {
    key: "languages",
    date: "Updated 2026",
    accent: "from-blue-500 to-cyan-400",
    glow: "rgba(59,130,246,0.15)",
    index: "01",
  },
  {
    key: "soft",
    date: "Updated 2026",
    accent: "from-rose-500 to-pink-500",
    glow: "rgba(251,113,133,0.15)",
    index: "02",
  },
];

export function Certifications() {
  const { language } = useLanguage();

  // Helper to get local translations based on current app language
  const lt = localTranslations[language as keyof typeof localTranslations];

  return (
    <section id="certifications" className="ui-section">
      <div className="ui-shell max-w-4xl">
        <ScrollReveal delay={0.1}>
          <SectionHeader Icon={Heart} title={lt.title} />
        </ScrollReveal>

        <div className="mt-16 space-y-8">
          {certificationsData.map((cert, i) => {
            // Dynamically select the translated strings based on the cert key
            const title = lt[`${cert.key}Title` as keyof typeof lt];
            const issuer = lt[`${cert.key}Issuer` as keyof typeof lt];
            const description = lt[`${cert.key}Desc` as keyof typeof lt];

            return (
              <ScrollReveal delay={0.1 + i * 0.08} key={cert.index}>
                <div
                  className="group ui-card ui-card-hover"
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 16px 64px ${cert.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <div
                    className={`absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b ${cert.accent} opacity-20 group-hover:opacity-60 transition-opacity duration-300`}
                  />

                  <div className="p-6 md:p-8 pl-8 md:pl-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cert.accent} p-px flex-shrink-0`}
                      >
                        <div className="w-full h-full rounded-xl bg-white dark:bg-[#0a0b10] flex items-center justify-center">
                          <span
                            className={`text-xs font-bold bg-gradient-to-br ${cert.accent} bg-clip-text text-transparent`}
                          >
                            {cert.index}
                          </span>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white leading-snug">
                          {title}
                        </h3>
                        <p className={`text-sm font-medium mt-0.5 bg-gradient-to-r ${cert.accent} bg-clip-text text-transparent`}>
                          {issuer} · {cert.date}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-white/55 leading-relaxed mb-6 max-w-xl">
                      {description}
                    </p>

                    <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
