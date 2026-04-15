import { useState } from "react";
import {
  Github,
  ExternalLink,
  Globe,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./ScrollReveal";
import { ImageModal, PhotoGallery } from "./PhotoGallery";
import { SectionHeader } from "./SectionHeader";

const baseProjects = [
  {
    accent: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.12)",
    index: "01",
  },
  {
    accent: "from-indigo-500 to-violet-500",
    glow: "rgba(99,102,241,0.12)",
    index: "02",
  },
  {
    accent: "from-sky-500 to-cyan-500",
    glow: "rgba(56,189,248,0.12)",
    index: "03",
  },
  {
    accent: "from-emerald-500 to-teal-500",
    glow: "rgba(52,211,153,0.12)",
    index: "04",
  },
  {
    accent: "from-amber-500 to-orange-500",
    glow: "rgba(251,191,36,0.10)",
    index: "05",
  },
  {
    accent: "from-rose-500 to-pink-500",
    glow: "rgba(251,113,133,0.12)",
    index: "06",
  },
  {
    accent: "from-violet-500 to-purple-500",
    glow: "rgba(167,139,250,0.12)",
    index: "07",
  },
];

const projects = [
  {
    title: "Profey Educational Web Application",
    features: [
      "Contributed to the development of a feature-rich educational web platform built with React 18 for optimal performance.",
      "Integrated CMI and Cashplus payment solutions.",
      "Developed a secure REST API with Laravel for data and user management.",
    ],
    technologies: [
      "React 18",
      "Laravel",
      "MySQL",
      "Pusher",
    ],
    rootPath: "PROFEY-WEB",
    photos: [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
      "17.webp",
    ],
    links: [],
    websites: [
      {
        label: "Web app",
        url: "https://profey.fr/",
      },
    ],
    linkedIn: [],
  },
  {
    title: "Leave Management System",
    features: [
      "Designed and deployed an HR management platform to digitalize employee records, leave workflows, and administrative documents.",
      "Integrated WebSockets with Pusher and Laravel Echo for real-time synchronization of requests and approvals.",
      "Built a document module with PDF generation, download, and electronic signature workflows.",
      "Implemented a modular Laravel, MySQL, Bootstrap, and JavaScript architecture with role/permission management and Excel user import.",
    ],
    technologies: [
      "Laravel",
      "MySQL",
      "Bootstrap",
      "JavaScript",
      "Pusher",
      "Laravel Echo",
      "GitHub",
    ],
    type: "",
    rootPath: "RH-APP",
    photos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      // "7.png",
      "8.png",
      "9.png",
      "10.png",
      "11.png",
    ],
    links: [],
    linkedIn: [],
  },
  {
    title: "Project Task Management Application",
    features: [
      "Designed and developed a web-based project task management system (creation, assignment, deadlines, and progress tracking).",
      "Set up structured collaboration between team members and managers to monitor delivery progress.",
      "Implemented role-based access control to secure task organization.",
    ],
    technologies: [],
    rootPath: "TASK-APP",
    photos: [
      "0.png",
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
    ],
    links: [],
    linkedIn: [],
  },
  {
    title: "Chat Application",
    features: [
      "Built a real-time chat application to digitize communication between users.",
      "Integrated WebSockets via Pusher and Laravel Echo for instant synchronization of messages, status, and notifications.",
      "Developed a modular web architecture using Laravel, MySQL, React/JavaScript, and Bootstrap, including authentication and role/permission management.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "React",
      "JavaScript",
      "Bootstrap",
      "Pusher",
      "Laravel Echo",
      "GitHub",
    ],
    rootPath: "CHAT-APP",
    photos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
      "9.png",
    ],
    links: [
      "https://github.com/abdessamad51/chat_app/tree/main/back-end",
      "https://github.com/abdessamad51/chat_app/tree/main/front-end",
    ],
    linkedIn: [],
  },
  {
    title: "Parcel Delivery Website",
    features: [
      "Set up the hosting environment (cPanel).",
      "Installed and configured WordPress and the appropriate theme.",
      "Customized the design to match the company visual identity.",
      "Created the main pages (Home, Services, About, Contact, etc.).",
      "Connected the website with the company professional email address.",
    ],
    technologies: [
      "PHP",
      "HTML",
      "CSS",
      "WordPress",
      "cPanel",
    ],
    rootPath: "TPF",
    photos: ["1.png"],
    websites: [
      {
        label: "Website",
        url: "https://tbftransport.fr",
      },
    ],
    linkedIn: [],
  },
  {
    title: "Online Store for UPS and Batteries",
    features: [
      "Set up the hosting environment (cPanel).",
      "Installed and configured WordPress and the appropriate theme.",
      "Customized the design to match the company visual identity.",
      "Created the main pages (Home, Services, About, Contact, etc.).",
      "Connected the website with the company professional email address.",
    ],
    technologies: [
      "PHP",
      "WordPress",
      "cPanel",
      "HTML",
      "CSS",
    ],
    rootPath: "ONDELEUR",
    photos: ["1.png"],
    websites: [
      {
        label: "Website",
        url: "https://tbftransport.fr",
      },
    ],
    linkedIn: [],
  },
];

const projectsFr = [
  {
    title: "Application web éducative Profey",
    features: [
      "Contribution au développement d'une plateforme web éducative riche en fonctionnalités, conçue avec React 18 pour des performances optimales",
      "Intégration des solutions de paiement CMI et Cashplus",
      "Développement d'une API REST sécurisée avec Laravel pour la gestion des données et des utilisateurs",
    ],
    technologies: [
      "React 18",
      "Laravel",
      "MySQL",
      "Pusher",
    ],

    rootPath: "PROFEY-WEB",
    photos: [
      "1.webp",
      "2.webp",
      "3.webp",
      "4.webp",
      "5.webp",
      "6.webp",
      "7.webp",
      "8.webp",
      "9.webp",
      "10.webp",
      "11.webp",
      "12.webp",
      "13.webp",
      "14.webp",
      "15.webp",
      "16.webp",
      "17.webp",
    ],
    links: [],
    websites: [
      {
        label: "Application web",
        url: "https://profey.fr/",
      },
    ],
    linkedIn: [],
  },
  {
    title: "Système de Gestion des conges",
    features: [
      "Conception et déploiement d'une plateforme de gestion RH pour digitaliser la gestion des employés, congés et documents administratifs",
      "Intégration de WebSockets via Pusher et Laravel Echo pour la synchronisation en temps réel des demandes et validations",
      "Développement d'un module documentaire avec génération de PDF, téléchargement et circuit de signature électronique",
      "Architecture web modulaire basée sur Laravel, MySQL, Bootstrap et JavaScript, avec gestion des rôles/permissions et import des utilisateurs via Excel",
    ],
    technologies: [
      "Laravel",
      "MySQL",
      "Bootstrap",
      "JavaScript",
      "Pusher",
      "Laravel Echo",
      "GitHub",
      
    ],
    type: "",
    rootPath: "RH-APP",
    photos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      // "7.png",
      "8.png",
      "9.png",
      "10.png",
      "11.png",
    ],
    links: [],
    linkedIn: [
    ]
  },
  {
    title: "Application de gestion des tâches de projet",
    features: [
      "Conception et développement d'un système web de gestion des tâches de projet (création, assignation, échéances et suivi).",
      "Mise en place d'une collaboration structurée entre équipe et managers pour le pilotage de l'avancement.",
      "Implémentation d'un accès basé sur les rôles pour sécuriser l'organisation des tâches.",
    ],
    technologies: [
     
    ],
    rootPath: "TASK-APP",
    photos: [
      "0.png",
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
    ],
    links: [
    ],
    linkedIn: [
      
    ],
  },
  {
    title: "Application de Chat",
    features: [
      "Développement d'une application de chat en temps réel pour digitaliser la communication entre utilisateurs",
      "Développement de l'intégration WebSocket via Pusher et Laravel Echo pour la synchronisation instantanée des messages, statuts et notifications",
      "Développement d’une architecture web modulaire basée sur Laravel, MySQL, React/JavaScript et Bootstrap, avec authentification et gestion des rôles/permissions.",
    ],
    technologies: [
      "PHP",
      "Laravel",
      "MySQL",
      "React",
      "JavaScript",
      "Bootstrap",
      "Pusher",
      "Laravel Echo",
      "GitHub",
    ],
    rootPath: "CHAT-APP",
    photos: [
      "1.png",
      "2.png",
      "3.png",
      "4.png",
      "5.png",
      "6.png",
      "7.png",
      "8.png",
      "9.png",
    ],
    links: [
      "https://github.com/abdessamad51/chat_app/tree/main/back-end",
      "https://github.com/abdessamad51/chat_app/tree/main/front-end",
    ],
    linkedIn: [],
  },
  {
    title: "Site web de livraison de colis",
    features: [
      "Mise en place de l'environnement d'hébergement (cPanel)",
      "Installation et configuration de WordPress et du thème approprié",
      "Personnalisation du design aux couleurs de l'entreprise",
      "Création des pages principales (Accueil, Services, À propos, Contact, etc.)",
      "Lien entre le site web et l'adresse e-mail professionnelle de l'entreprise",
    ],
    technologies: [
      "PHP",
      "HTML",
      "CSS",
      "WordPress",
      "cPanel",
    ],
    rootPath: "TPF",
    photos: [
      "1.png",
    ],
    websites: [
      {
        label: "Site web",
        url: "https://tbftransport.fr"
      }
    ],
    linkedIn: [],
  },
  {
    title: "Un makate vendant des onduleurs et des batteries",
    features: [
     "Mise en place de l'environnement d'hébergement (cPanel)",
      "Installation et configuration de WordPress et du thème approprié",
      "Personnalisation du design aux couleurs de l'entreprise",
      "Création des pages principales (Accueil, Services, À propos, Contact, etc.)",
      "Lien entre le site web et l'adresse e-mail professionnelle de l'entreprise",
    ],
    technologies: [
      "PHP",
      "WordPress",
      "cPanel",
      "HTML",
      "CSS",
    ],
    rootPath: "ONDELEUR",
    photos: [
      "1.png",
    ],
    websites: [
      {
        label: "Site web",
        url: "https://tbftransport.fr"
      }
    ],
    linkedIn: [],
  },
];

function linkLabel(li: number, total: number, language: "en" | "fr") {
  if (total > 1) {
    if (li === 0) return "Backend";
    if (li === 1) return "Frontend";
    return `Repo ${li + 1}`;
  }

  return language === "fr" ? "Code source" : "Source code";
}

export function Projects() {
  const { t, language } = useLanguage();
  const [modalData, setModalData] = useState<{
    photos: string[];
    index: number;
  } | null>(null);

  const rawList = language === "en" ? projects : projectsFr;
  const list = rawList.map((p, i) => ({ ...p, ...baseProjects[i] }));

  return (
    <section id="projects" className="ui-section">
      <ImageModal
        photos={modalData?.photos ?? []}
        initialIndex={modalData?.index ?? 0}
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
      />
      <div className="ui-shell max-w-5xl">
        <ScrollReveal delay={0.1}>
          <SectionHeader
            Icon={Globe}
            title={t("projects.title")}
            description={t("projects.description")}
          />
        </ScrollReveal>

        <div className="space-y-12">
          {list.map((project, i) => {
            const previewFeatures = project.features.slice(0, 3);
            const previewTech = project.technologies.slice(0, 8);
            const extraTech = Math.max(project.technologies.length - previewTech.length, 0);
            const hasGallery = Boolean(project.photos?.length && project.rootPath);

            return (
              <ScrollReveal delay={0.1 + i * 0.06} key={project.index}>
                <article
                  className="group relative overflow-hidden rounded-[1.75rem] border border-slate-200/80 dark:border-white/10 bg-white/85 dark:bg-[#0b101a]/85 shadow-[0_16px_40px_rgba(15,23,42,0.08)] dark:shadow-[0_18px_45px_rgba(2,8,20,0.35)] backdrop-blur-sm"
                  style={{ transition: "all 0.35s ease" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow =
                      `0 20px 72px ${project.glow}`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${project.accent}`} />

                  <div className={`grid ${hasGallery ? "lg:grid-cols-[1.05fr_0.95fr]" : ""}`}>
                    {hasGallery && (
                      <div className="p-4 md:p-5 lg:p-6">
                        <div className="h-full rounded-2xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-white/[0.03] p-2 md:p-3">
                          <PhotoGallery
                            photos={project.photos}
                            rootPath={project.rootPath}
                            onImageClick={(srcs, index) =>
                              setModalData({ photos: srcs, index })
                            }
                          />
                        </div>
                      </div>
                    )}

                    <div className="p-6 md:p-8 lg:p-9 flex flex-col gap-5 md:gap-6">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className={`inline-flex items-center justify-center h-8 min-w-8 px-2.5 rounded-lg bg-gradient-to-r ${project.accent} text-white text-xs font-bold`}>
                          {project.index}
                        </span>
                        {/* <span className="inline-flex items-center rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-medium text-slate-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200">
                          {project.type}
                        </span> */}
                      </div>

                      <h3 className="text-xl md:text-2xl font-semibold text-slate-900 dark:text-white leading-snug">
                        {project.title}
                      </h3>

                      <ul className="space-y-2.5">
                        {previewFeatures.map((feature, fi) => (
                          <li key={fi} className="flex items-start gap-3">
                            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500 dark:bg-sky-300" />
                            <span className="text-sm text-slate-600 dark:text-slate-300/85 leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* {project.features.length > previewFeatures.length && (
                        <p className="text-xs text-slate-500 dark:text-slate-400/80">
                          {language === "fr"
                            ? "Résumé condensé pour une lecture rapide."
                            : "Condensed summary for quick reading."}
                        </p>
                      )} */}

                      <div className="h-px bg-slate-200/80 dark:bg-white/10" />

                      <div className="flex flex-wrap gap-2">
                        {previewTech.map((tech) => (
                          <span key={tech} className="ui-chip">
                            {tech}
                          </span>
                        ))}
                        {extraTech > 0 && (
                          <span className="ui-chip">+{extraTech}</span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-2.5 pt-1">
                        {project.links && project.links.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.links.map((link, li) => (
                              <a
                                key={li}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ui-button-subtle"
                              >
                                <Github className="w-3.5 h-3.5" />
                                {linkLabel(li, project.links.length, language)}
                              </a>
                            ))}
                          </div>
                        )}

                        {project.websites && project.websites.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {project.websites.map((link, li) => (
                              <a
                                key={li}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ui-button-subtle"
                              >
                                <Globe className="w-3.5 h-3.5" />
                                {link.label}
                              </a>
                            ))}
                          </div>
                        )}

                        {project.linkedIn && project.linkedIn.length > 0 && (
                          <a
                            href={project.linkedIn[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium bg-gradient-to-r ${project.accent} text-white hover:opacity-90 transition-opacity duration-200`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {language === "fr" ? "Publication LinkedIn" : "LinkedIn Post"}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
