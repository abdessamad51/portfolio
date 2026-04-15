import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const getEducation = (t: (key: string) => string) => [
  {
    degree: t("education.degree1"), institution: t("education.institution1"),
    period: t("education.period1"), location: t("education.location1"),
    description: t("education.description1"),
    accent: "from-indigo-500 to-violet-500", lightAccent: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.12)", lightGlow: "rgba(99,102,241,0.08)", index: "01",
  },
  {
    degree: t("education.degree2"), institution: t("education.institution2"),
    period: t("education.period2"), location: t("education.location2"),
    description: t("education.description2"),
    accent: "from-rose-400 to-pink-400", lightAccent: "from-rose-500 to-pink-500",
    glow: "rgba(251,113,133,0.12)", lightGlow: "rgba(251,113,133,0.08)", index: "02",
  },
  {
    degree: t("education.degree3"), institution: t("education.institution3"),
    period: t("education.period3"), location: t("education.location3"),
    description: t("education.description3"),
    accent: "from-emerald-400 to-teal-400", lightAccent: "from-emerald-500 to-teal-500",
    glow: "rgba(52,211,153,0.12)", lightGlow: "rgba(52,211,153,0.08)", index: "03",
  },
];

export function Education() {
  const { t } = useLanguage();
  const education = getEducation(t);

  return (
    <section id="education" className="ui-section">
      <div className="ui-shell max-w-4xl">

        <ScrollReveal delay={0.1}>
          <SectionHeader Icon={GraduationCap} title={t("education.title")} />
        </ScrollReveal>

        <div className="relative mt-16">
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-sky-400/35 via-slate-200/70 dark:via-white/[0.08] to-transparent" />

          <div className="space-y-10">
            {education.map((item, i) => (
              <ScrollReveal delay={0.1 + i * 0.08} key={item.index}>
                <div className="relative group flex gap-8 md:gap-12">
                  {/* Node */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-12 md:w-16 h-12 md:h-16 rounded-full bg-gradient-to-br ${item.accent} p-px flex-shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-105`}
                      style={{ boxShadow: `0 0 24px ${item.glow}` }}
                    >
                      <div className="w-full h-full rounded-full bg-white dark:bg-[#0a0b10] flex items-center justify-center">
                        <span className={`text-sm font-bold bg-gradient-to-br ${item.accent} bg-clip-text text-transparent`}
                          style={{ fontFamily: "'DM Sans', sans-serif" }}>
                          {item.index}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className="relative flex-1 mb-2 p-6 md:p-8 transition-all duration-300 ui-card ui-card-hover"
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 48px ${item.lightGlow}`; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = ""; }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white mb-1 leading-snug">
                      {item.degree}
                    </h3>
                    <p className={`text-sm font-medium bg-gradient-to-r ${item.accent} bg-clip-text text-transparent mb-4`}>
                      {item.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 mb-5">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40">
                        <Calendar className="w-3.5 h-3.5 text-slate-300 dark:text-white/30" />{item.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-white/40">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 dark:text-white/30" />{item.location}
                      </span>
                    </div>
                    <div className="h-px w-full bg-black/[0.05] dark:bg-white/[0.05] mb-5" />
                    <p className="text-sm text-slate-500 dark:text-white/55 leading-relaxed group-hover:text-slate-700 dark:group-hover:text-white/70 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="absolute left-[23px] md:left-[31px] bottom-0 w-px h-16 bg-gradient-to-b from-transparent to-background" />
        </div>
      </div>
    </section>
  );
}