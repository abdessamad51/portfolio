import { useState } from "react";
import {
  Github,
  Goal,
  BriefcaseBusiness,
  Calendar,
  Building2,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./ScrollReveal";
import { ImageModal, PhotoGallery } from "./PhotoGallery";
import { SectionHeader } from "./SectionHeader";

type ExperienceWebsite = {
  label: string;
  url: string;
};

type ExperienceItem = {
  title: string;
  mission: string;
  features: string[];
  technologies: string[];
  period: string;
  company: string;
  type: string;
  photos: string[];
  links: string[];
  linkedIn: string[];
  websites?: ExperienceWebsite[];
  rootPath?: string;
  accent?: string;
  glow?: string;
  index?: string;
};

const experienceDecorators = [
  {
    accent: "from-sky-500 to-cyan-500",
    glow: "rgba(56,189,248,0.14)",
    index: "01",
  },
  {
    accent: "from-amber-500 to-orange-500",
    glow: "rgba(251,191,36,0.14)",
    index: "02",
  },
  {
    accent: "from-violet-500 to-fuchsia-500",
    glow: "rgba(168,85,247,0.14)",
    index: "03",
  },
  {
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(16,185,129,0.14)",
    index: "04",
  },
];

const experiencesEn: ExperienceItem[] = [
  {
    title: "Profey SaaS Platform and Back Office",
    mission:
      "Full-stack contribution to the Profey product ecosystem and back-office operations.",
    features: [
      "Contributed as a full-stack developer to the web platform and internal back office.",
      "Contributed to building user interfaces with React for core product workflows.",
      "Designed and maintained REST APIs, business logic, and database workflows.",
      "Integrated CMI and Cash Plus payment solutions.",
      "Optimized performance through MySQL query tuning and Redis caching.",
      "Handled deployment, configuration, and maintenance on Microsoft Azure.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Redis",
      "Azure",
      "React JS",
      "Git",
      "GitLab",
    ],
    period: "September 2025 - March 2026",
    company: "STARE PROFEY - Freelance",
    type: "Full-Stack Developer",
    photos: [],
    links: [],
    linkedIn: [],
    websites: [{ label: "profey.fr", url: "https://profey.fr/" }],
  },
  {
    title: "WordPress Client Websites",
    mission:
      "Development and maintenance of custom WordPress websites for client businesses.",
    features: [
      "Developed and maintained client websites built on WordPress.",
      "Customized themes and plugins based on business needs.",
      "Handled content integration and page updates.",
      "Delivered projects for onduleurs-maroc.com and tbftransport.fr.",
    ],
    technologies: ["PHP", "WordPress"],
    period: "April 2025 - September 2025",
    company: "Freelance",
    type: "PHP / WordPress Developer",
    photos: [],
    links: [],
    linkedIn: [],
    websites: [
      { label: "onduleurs-maroc.com", url: "https://onduleurs-maroc.com/" },
      { label: "tbftransport.fr", url: "https://tbftransport.fr/" },
    ],
  },
  {
    title: "Real Estate and Task Management Applications",
    mission:
      "Built and evolved two Laravel applications for property and operations management.",
    features: [
      "Maintained, improved, and delivered new modules for a property management application.",
      "Translated business requirements into technical specifications.",
      "Developed, tested, and integrated payment APIs.",
      "Analyzed requirements and designed architecture for a task management platform.",
      "Built responsive frontend and backend modules for tasks, users, and permissions.",
      "Implemented real-time notifications using WebSocket.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "jQuery",
      "Bootstrap",
      "MySQL",
      "Ajax",
      "WebSocket",
      "Git",
      "GitHub",
    ],
    period: "November 2024 - March 2025",
    company: "Bit LLC - Freelance",
    type: "PHP Laravel Developer",
    photos: [],
    links: [],
    linkedIn: [],
  },
  {
    title: "B2BEE Fiber Installations and HR Leave Application",
    mission:
      "Improved telecom business software and delivered HR workflow modules.",
    features: [
      "Identified and fixed bugs in the existing B2BEE fiber management application.",
      "Developed new features to improve user experience and operational workflows.",
      "Wrote and maintained technical documentation in internal wiki pages.",
      "Translated HR requirements into technical specifications and UML models.",
      "Built full interface and backend features for leave management.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "jQuery",
      "Bootstrap",
      "MySQL",
      "Ajax",
      "Git",
      "GitLab",
      "Wiki",
      "UML",
    ],
    period: "February 2023 - October 2024",
    company: "Kjr Telecom - Casablanca",
    type: "PHP Laravel Developer",
    photos: [],
    links: [],
    linkedIn: [],
  },
];

const experiencesFr: ExperienceItem[] = [
  {
    title: "Projet Profey : Plateforme SaaS et Back Office",
    mission:
      "Contribution full-stack au développement de la plateforme web Profey et de son back office.",
    features: [
      "Contribution à la création des interfaces utilisateur avec React pour les workflows clés du produit.",
      "Conception et maintenance des APIs REST, de la logique métier et de la base de données.",
      "Intégration des solutions de paiement CMI et Cash Plus.",
      "Optimisation des performances via l'amélioration des requêtes MySQL et la mise en cache Redis.",
      "Déploiement, configuration et maintenance sur Microsoft Azure.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "MySQL",
      "Redis",
      "Azure",
      "React JS",
      "Git",
      "GitLab",
    ],
    period: "Septembre 2025 - Mars 2026",
    company: "STARE PROFEY - freelance",
    type: "Développeur Full-stack",
    photos: [],
    links: [],
    linkedIn: [],
    websites: [{ label: "profey.fr", url: "https://profey.fr/" }],
  },
  {
    title: "Sites WordPress clients",
    mission:
      "Développement et maintenance de sites WordPress pour des clients.",
    features: [
      "Développement et maintenance de sites web sous WordPress.",
      "Personnalisation de thèmes, plugins et intégration de contenu.",
      "Livraison de sites pour onduleurs-maroc.com et tbftransport.fr.",
    ],
    technologies: ["PHP", "WordPress"],
    period: "Avril 2025 - Septembre 2025",
    company: "Freelance",
    type: "Développeur PHP/WordPress",
    photos: [],
    links: [],
    linkedIn: [],
    websites: [
      { label: "onduleurs-maroc.com", url: "https://onduleurs-maroc.com/" },
      { label: "tbftransport.fr", url: "https://tbftransport.fr/" },
    ],
  },
  {
    title: "Projet Immobilier et Application de Gestion des Tâches",
    mission:
      "Maintenance et développement de deux applications Laravel orientées métier.",
    features: [
      "Maintenance, amélioration et ajout de nouveaux modules fonctionnels pour l'application immobilière.",
      "Traduction des besoins métier en spécifications techniques.",
      "Développement, tests et intégration d'APIs de paiement.",
      "Analyse des besoins et conception de l'architecture applicative pour le projet tâches.",
      "Développement de l'interface responsive et du backend (tâches, utilisateurs, permissions).",
      "Implémentation de notifications en temps réel via WebSocket.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "jQuery",
      "Bootstrap",
      "MySQL",
      "Ajax",
      "WebSocket",
      "Git",
      "GitHub",
    ],
    period: "Novembre 2024 - Mars 2025",
    company: "Bit LLC - freelance",
    type: "Développeur PHP Laravel",
    photos: [],
    links: [],
    linkedIn: [],
  },
  {
    title: "B2BEE : Gestion des Installations Fibre Optique et Application RH",
    mission:
      "Renforcement d'applications internes en telecom et RH avec un focus fiabilité et maintenabilité.",
    features: [
      "Identification et correction de bugs dans l'application existante.",
      "Développement de nouvelles fonctionnalités pour améliorer l'expérience utilisateur.",
      "Rédaction et mise à jour de la documentation technique (Wiki).",
      "Traduction des besoins RH en spécifications techniques et modélisation UML.",
      "Développement complet de l'interface et des fonctionnalités backend pour la gestion des congés.",
    ],
    technologies: [
      "Laravel",
      "PHP",
      "jQuery",
      "Bootstrap",
      "MySQL",
      "Ajax",
      "Git",
      "GitLab",
      "Wiki",
      "UML",
    ],
    period: "Février 2023 - Octobre 2024",
    company: "Kjr Telecom - Casablanca",
    type: "Développeur PHP Laravel",
    photos: [],
    links: [],
    linkedIn: [],
  },
];

function repositoryLabel(index: number, total: number, language: "en" | "fr") {
  if (total === 1) {
    return language === "fr" ? "Code source" : "Source code";
  }

  if (index === 0) {
    return "Backend";
  }

  if (index === 1) {
    return "Frontend";
  }

  return language === "fr" ? `Repo ${index + 1}` : `Repo ${index + 1}`;
}

export function Experience() {
  const { t, language } = useLanguage();
  const [modalData, setModalData] = useState<{
    photos: string[];
    index: number;
  } | null>(null);

  const rawList = language === "en" ? experiencesEn : experiencesFr;
  const list: ExperienceItem[] = rawList.map((item, i) => ({
    ...item,
    ...experienceDecorators[i % experienceDecorators.length],
  }));

  return (
    <section id="experience" className="ui-section">
      <ImageModal
        photos={modalData?.photos ?? []}
        initialIndex={modalData?.index ?? 0}
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
      />
      <div className="ui-shell max-w-5xl">
        <ScrollReveal delay={0.1}>
          <SectionHeader
            Icon={Goal}
            title={t("experience.title")}
            description={t("experience.description")}
          />

          <div className="mt-6 flex flex-wrap items-center gap-2.5">
            <span className="ui-chip border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
              {language === "fr"
                ? `${list.length} experiences clés`
                : `${list.length} key experiences`}
            </span>
            <span className="ui-chip border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-400/20 dark:bg-sky-500/10 dark:text-sky-200">
              {language === "fr" ? "SaaS, WordPress, Laravel" : "SaaS, WordPress, Laravel"}
            </span>
          </div>
        </ScrollReveal>

        <div className="space-y-10">
          {list.map((experience, i) => {
            const hasGallery = Boolean(
              experience.photos?.length && experience.rootPath
            );

            return (
            <ScrollReveal delay={0.1 + i * 0.06} key={experience.index}>
              <div
                className="group ui-card ui-card-hover"
                style={{ transition: "all 0.35s ease" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow =
                    `0 16px 64px ${experience.glow}`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b ${experience.accent} opacity-20 group-hover:opacity-60 transition-opacity duration-300`}
                />

                <div className="p-6 md:p-8 pl-8 md:pl-10">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${experience.accent} p-px flex-shrink-0`}
                    >
                      <div className="w-full h-full rounded-xl bg-white dark:bg-[#0a0b10] flex items-center justify-center">
                        <span
                          className={`text-xs font-bold bg-gradient-to-br ${experience.accent} bg-clip-text text-transparent`}
                        >
                          {experience.index}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-slate-800 dark:text-white leading-snug">
                        {experience.title}
                      </h3>
                      <p className={`text-sm font-medium mt-0.5 bg-gradient-to-r ${experience.accent} bg-clip-text text-transparent`}>
                        {experience.type}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm md:text-[15px] text-slate-600 dark:text-slate-300/85 leading-relaxed mb-5">
                    {experience.mission}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="ui-chip border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                      <BriefcaseBusiness className="w-3.5 h-3.5" />
                      {experience.type}
                    </span>
                    <span className="ui-chip border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                      <Calendar className="w-3.5 h-3.5" />
                      {experience.period}
                    </span>
                    <span className="ui-chip border-slate-200/80 bg-white/70 text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                      <Building2 className="w-3.5 h-3.5" />
                      {experience.company}
                    </span>
                  </div>

                  <div className={`grid gap-6 md:gap-10 ${hasGallery ? "md:grid-cols-2" : ""}`}>
                    <div className="flex flex-col gap-5">
                      <ul className="flex flex-col gap-2.5">
                        {experience.features.map((feature, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-2.5"
                          >
                            <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
                              <svg
                                width="9"
                                height="7"
                                viewBox="0 0 9 7"
                                fill="none"
                                className="text-emerald-600 dark:text-emerald-400"
                              >
                                <path
                                  d="M1 3.5L3.2 6L8 1"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </span>
                            <span className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                      <div className="flex flex-wrap gap-1.5">
                        {experience.technologies.map((tech) => (
                          <span key={tech} className="ui-chip">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col gap-2 mt-auto pt-2">
                        {experience.websites && experience.websites.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.websites.map((site, li) => (
                              <a
                                key={li}
                                href={site.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ui-button-subtle"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                {site.label}
                              </a>
                            ))}
                          </div>
                        )}
                        {experience.links && experience.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {experience.links.map((link, li) => (
                              <a
                                key={li}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ui-button-subtle"
                              >
                                <Github className="w-3.5 h-3.5" />
                                {repositoryLabel(li, experience.links.length, language)}
                              </a>
                            ))}
                          </div>
                        )}
                        {experience.linkedIn && experience.linkedIn.length > 0 && (
                          <a
                            href={experience.linkedIn[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r ${experience.accent} text-white hover:opacity-90 transition-opacity duration-200 w-fit`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {language === "fr" ? "Publication LinkedIn" : "LinkedIn Post"}
                          </a>
                        )}
                      </div>
                    </div>

                    {hasGallery && (
                      <div className="flex items-center">
                        <PhotoGallery
                          photos={experience.photos}
                          rootPath={experience.rootPath as string}
                          onImageClick={(srcs, index) =>
                            setModalData({ photos: srcs, index })
                          }
                        />
                      </div>
                    )}
                  </div>
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
