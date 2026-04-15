import {
  Code,
  Database,
  Wrench,
  Palette,
  Laptop,
  Power,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const getSkillCategories = (t: (key: string) => string) => [
  {
    title: t("skills.frontend"),
    descKey: "skills.frontend_description",
    icon: Code,
    accent: "from-sky-500 to-indigo-500",
    glow: "rgba(99,102,241,0.15)",
    skills: [
      { name: "HTML5", image: "/assets/frontend/html.webp" },
      { name: "CSS3", image: "/assets/frontend/css.webp" },
      { name: "Bootstrap", image: "/assets/frontend/bootstrap.webp" },
      { name: "JavaScript", image: "/assets/frontend/js.webp" },
      { name: "TypeScript", image: "/assets/frontend/ts.webp" },
      { name: "React.js", image: "/assets/frontend/react.webp" },
      { name: "jQuery"  , image: "/assets/frontend/jquery.png" },
      { name: "AJAX"  },
    ],
  },
  {
    title: t("skills.backend"),
    descKey: "skills.backend_description",
    icon: Laptop,
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.12)",
    skills: [
      { name: "PHP" , image : "/assets/backend/php.png"},
      { name: "Laravel" , image : "/assets/backend/laravel.png"},
      { name: "Symfony" , image : "/assets/backend/symfony.png"},
      { name: "RESTful API"},
      { name: "WebSocket" },
    ],
  },
  {
    title: t("skills.databases"),
    descKey: "skills.databases_description",
    icon: Database,
    accent: "from-orange-500 to-amber-500",
    glow: "rgba(251,146,60,0.12)",
    skills: [
      { name: "MySQL", image: "/assets/databases/mysql.webp" },
      { name: "Redis" , image: "/assets/databases/redis.png" },
    ],
  },
  {
    title: t("skills.tools"),
    descKey: "skills.tools_description",
    icon: Wrench,
    accent: "from-violet-500 to-purple-500",
    glow: "rgba(167,139,250,0.12)",
    skills: [
      { name: "Git", image: "/assets/tools/git.webp" },
      { name: "GitHub", image: "/assets/tools/git.webp" },
      { name: "GitLab", image: "/assets/tools/git.webp" },
      { name: "Docker", image: "/assets/tools/docker.webp" },
      { name: "VS Code", image: "/assets/tools/vs.webp" },
      { name: "Postman"  , image: "/assets/tools/postman.png" },
      { name: "Redmine" },
      { name: "Trello", image: "/assets/tools/trello.webp" },
      { name: "WordPress" , image: "/assets/tools/wordpress.png" },
    ],
  },
  {
    title: t("skills.design"),
    descKey: "skills.design_description",
    icon: Palette,
    accent: "from-rose-500 to-pink-500",
    glow: "rgba(251,113,133,0.13)",
    skills: [
      { name: "UML", image: "/assets/tools/uml.webp" },
      { name: "Merise" },
    ],
  },
];

export function Skills() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const skillCategories = getSkillCategories(t);

  return (
    <section id="skills" className="ui-section">
      <div className="ui-shell max-w-6xl">
        <ScrollReveal delay={0.1}>
          <SectionHeader
            Icon={Power}
            title={t("skills.title")}
            description={t("skills.description")}
          />
        </ScrollReveal>

        <div className="space-y-20">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <ScrollReveal delay={0.1 + catIndex * 0.05} key={category.title}>
                <div className="relative">
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.accent} p-px`}
                    >
                      <div className="w-full h-full rounded-xl bg-white dark:bg-[#0d0e14] flex items-center justify-center">
                        <Icon className="w-4 h-4 text-slate-600 dark:text-white/80" />
                      </div>
                    </div>
                    <h3
                      className={`text-xl font-semibold bg-gradient-to-r ${category.accent} bg-clip-text text-transparent`}
                      style={{ letterSpacing: "0.02em" }}
                    >
                      {category.title}
                    </h3>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-300/70 dark:from-white/[0.1] to-transparent" />
                  </div>

                  <p className="text-slate-500 dark:text-white/55 text-sm leading-relaxed mb-8 max-w-2xl">
                    {t(category.descKey)}
                  </p>

                  <TooltipProvider>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5   gap-3">
                      {category.skills.map((skill, skillIndex) => {
                        const isBackendLast =
                          theme === "dark" &&
                          category.title === t("skills.backend") &&
                          skillIndex > category.skills.length - 4;
                        return (
                          <Tooltip key={skill.name}>
                            <TooltipTrigger asChild>
                              <div
                                className="group relative flex flex-col items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all duration-200 ui-card ui-card-hover"
                                onMouseEnter={(e) => {
                                  (
                                    e.currentTarget as HTMLDivElement
                                  ).style.boxShadow =
                                    `0 8px 32px ${category.glow}`;
                                }}
                                onMouseLeave={(e) => {
                                  (
                                    e.currentTarget as HTMLDivElement
                                  ).style.boxShadow = "";
                                }}
                              >
                                <div className="w-10 h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                  {skill.image ? (
                                    <img
                                      src={skill.image}
                                      alt={skill.name}
                                      loading="lazy"
                                      decoding="async"
                                      style={{
                                        filter: isBackendLast
                                          ? "invert(1) brightness(2)"
                                          : "none",
                                      }}
                                      className="w-full h-full object-contain"
                                    />
                                  ) : (
                                    <span className="w-9 h-9 rounded-full border border-black/[0.08] dark:border-white/[0.12] text-xs font-semibold text-slate-600 dark:text-white/75 flex items-center justify-center">
                                      {skill.name.charAt(0)}
                                    </span>
                                  )}
                                </div>
                                <span
                                  className="text-[10px] text-slate-500 dark:text-white/50 group-hover:text-slate-800 dark:group-hover:text-white/80 text-center leading-tight transition-colors duration-200 line-clamp-2"
                                >
                                  {skill.name}
                                </span>
                                <div
                                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-0 group-hover:w-3/4 bg-gradient-to-r ${category.accent} transition-all duration-300 rounded-full`}
                                />
                              </div>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="bg-white dark:bg-[#0d0e14] border border-black/[0.08] dark:border-white/10 text-slate-700 dark:text-white/80 text-xs px-2 py-1"
                            >
                              {skill.name}
                            </TooltipContent>
                          </Tooltip>
                        );
                      })}
                    </div>
                  </TooltipProvider>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
