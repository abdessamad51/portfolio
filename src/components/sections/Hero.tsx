import { ArrowRight, BadgeCheck, BriefcaseBusiness, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="about" className="ui-section !pt-8 md:!pt-10 !pb-16 md:!pb-20 min-h-[calc(100vh-4rem)] flex items-start">
      <div className="ui-shell grid items-center gap-10 lg:gap-14 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="animate-fade-in relative">
          <div className="pointer-events-none absolute -top-16 -left-12 w-40 h-40 rounded-full bg-sky-400/15 blur-3xl" />

          <div className="inline-flex items-center gap-2 rounded-full border border-sky-200 dark:border-sky-400/20 bg-sky-50/80 dark:bg-sky-500/10 px-4 py-1.5 text-xs font-semibold text-sky-700 dark:text-sky-200 mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            {t("hero.openToWork")}
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.02] text-slate-900 dark:text-white mb-5">
            <span className="block">{t("hero.greeting")}</span>
            <span className="text-gradient relative inline-block mt-1">
              Abdessamad Rami
            </span>
          </h1>

          <p className="text-lg md:text-2xl text-slate-700 dark:text-slate-200/90 mb-5 font-semibold">
            {t("hero.title")}
          </p>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300/80 mb-8 max-w-2xl leading-relaxed">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-7">
            <a href="#projects" className="ui-button-primary group">
              {t("hero.viewWork")}
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a href="#contact" className="ui-button-secondary">
              {t("hero.contactMe")}
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5 mb-8">
            {[
              "React",
              "Laravel",
              "TypeScript",
              "Firebase",
            ].map((tech) => (
              <span key={tech} className="ui-hero-chip">
                {tech}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 max-w-3xl">
            <div className="ui-card ui-card-hover p-4 md:p-5">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
              <p className="flex items-center gap-2 text-sm font-semibold text-emerald-700 dark:text-emerald-300 mb-2">
                <BadgeCheck className="h-4 w-4" />
                {t("hero.coreExperience")}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">{t("hero.experience1")}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">{t("hero.experience2")}</p>
            </div>

            <div className="ui-card ui-card-hover p-4 md:p-5">
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/50 to-transparent" />
              <p className="flex items-center gap-2 text-sm font-semibold text-sky-700 dark:text-sky-300 mb-2">
                <BriefcaseBusiness className="h-4 w-4" />
                {t("hero.productImpact")}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">{t("hero.projects1")}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300/80 leading-relaxed">{t("hero.projects2")}</p>
            </div>
          </div>
        </div>

        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <div className="ui-card relative p-6 md:p-8 lg:p-10 text-center overflow-visible">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/35 to-transparent" />

            {/* <div className="hidden lg:block absolute -left-8 top-8 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-white/[0.05] px-4 py-3 text-left shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300/75">Experience</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">2+ years</p>
            </div> */}

            {/* <div className="hidden lg:block absolute -right-8 bottom-8 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/90 dark:bg-white/[0.05] px-4 py-3 text-left shadow-[0_12px_30px_rgba(15,23,42,0.12)] backdrop-blur-md">
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-300/75">Projects</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">10+</p>
            </div> */}

            <div className="relative mx-auto w-56 h-56 md:w-72 md:h-72 rounded-[2rem] border border-sky-200/70 dark:border-sky-400/20 bg-gradient-to-b from-white to-sky-50/80 dark:from-[#0f1728] dark:to-[#0a1120] p-2 animate-float-y">
              <div className="w-full h-full rounded-[1.6rem] overflow-hidden shadow-[0_20px_40px_rgba(14,116,214,0.18)]">
                <img
                  src="/photo.webp"
                  alt="Abdessamad Rami"
                  className="w-full h-full object-cover"
                  fetchPriority="high"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>

            <p className="mt-6 text-sm text-slate-500 dark:text-slate-300/70 leading-relaxed max-w-sm mx-auto">
              {t("hero.summary")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
