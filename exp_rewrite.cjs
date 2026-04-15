const fs = require('fs');
let content = fs.readFileSync('src/components/sections/Experience.tsx', 'utf-8');

const newEn = `const projects = [
  {
    title: "Real Estate & Task Management Applications",
    features: [
      "Real Estate App: Translated business needs, executed tests, and integrated payment APIs",
      "Task Management App: Designed architecture and built responsive UI (Bootstrap, jQuery, AJAX)",
      "Developed robust backend logic with Laravel for tasks, users, and permissions",
      "Maintained and enhanced applications while delivering a maintainable structure",
    ],
    technologies: ["Laravel", "jQuery", "Bootstrap", "MySQL", "AJAX", "WebSocket", "Git", "GitHub"],
    period: "November 2024 - March 2025",
    company: "Bit LLC - Freelance",
    type: "PHP Laravel Developer",
    photos: [], links: [], linkedIn: [],
  },
  {
    title: "CRM for Multi-Center Appointment & Billing Management",
    features: [
      "Developed, tested, and maintained CRM features for appointments, users, and cash handling",
      "Followed incident tracking and task management through Asana",
      "Identified and fixed bugs in the existing application",
      "Contributed to application stability and iterative improvements",
    ],
    technologies: ["Symfony", "jQuery", "Bootstrap", "MySQL", "AJAX", "Git", "GitHub", "Asana"],
    period: "June 2025 - August 2025",
    company: "Epiltech - Casablanca",
    type: "PHP Symfony Final-Year Intern",
    photos: [], links: [], linkedIn: [],
  },
  {
    title: "B2BEE Fiber Installation Management & HR System",
    features: [
      "Spearheaded development for the B2BEE application managing optical fiber installation workflows",
      "Resolved critical bugs and developed scalable new features tailored to client infrastructure needs",
      "Translated complex business requirements into technical specifications and comprehensive UML models",
      "Built core modules for an internal HR leave management system, ensuring high maintainability",
    ],
    technologies: ["Laravel", "jQuery", "Bootstrap", "MySQL", "AJAX", "UML", "Git", "GitLab", "Wiki"],
    period: "February 2023 - October 2024",
    company: "Kjr Telecom - Casablanca",
    type: "PHP Laravel Developer",
    photos: [], links: [], linkedIn: [],
  }
];`;

const newFr = `const projectsFr = [
  {
    title: "Applications de Gestion Immobilière & des Tâches",
    features: [
      "App Immobilière : Intégration d'APIs de paiement, exécution de tests et traduction de besoins métier",
      "App de Tâches : Conception de l'architecture et d'une UI responsive (Bootstrap, jQuery, AJAX)",
      "Développement backend en Laravel (tâches, modules métiers, permissions)",
      "Maintenance et ajout de modules tout en préservant une base de code évolutive",
    ],
    technologies: ["Laravel", "jQuery", "Bootstrap", "MySQL", "AJAX", "WebSocket", "Git", "GitHub"],
    period: "Novembre 2024 - Mars 2025",
    company: "Bit LLC - freelance",
    type: "Développeur PHP Laravel",
    photos: [], links: [], linkedIn: [],
  },
  {
    title: "Projet CRM - Gestion des rendez-vous, utilisateurs et encaissements",
    features: [
      "Développement, tests et maintenance du code",
      "Suivi des incidents et prise en charge des tâches Asana",
      "Identification et correction des bugs de l'application existante",
      "Contribution à l'amélioration continue de la stabilité applicative",
    ],
    technologies: ["Symfony", "jQuery", "Bootstrap", "MySQL", "AJAX", "Git", "GitHub", "Asana"],
    period: "Juin 2025 - Août 2025",
    company: "Epiltech - Casablanca",
    type: "Stagiaire PFE PHP Symfony",
    photos: [], links: [], linkedIn: [],
  },
  {
    title: "Application B2BEE (Raccordement Fibre) & Système RH",
    features: [
      "Développement principal de l'application B2BEE pour la gestion des workflows d'installation de fibre optique",
      "Résolution de bugs critiques et développement de nouvelles fonctionnalités sur-mesure pour les clients",
      "Traduction des besoins métier complexes en spécifications techniques et modélisation UML détaillée",
      "Création des interfaces et modules centraux pour un système interne de gestion des congés (RH)",
    ],
    technologies: ["Laravel", "jQuery", "Bootstrap", "MySQL", "AJAX", "UML", "Git", "GitLab", "Wiki"],
    period: "Février 2023 - Octobre 2024",
    company: "Kjr Telecom - Casablanca",
    type: "Développeur PHP Laravel",
    photos: [], links: [], linkedIn: [],
  }
];`;

content = content.replace(/const projects = \[[\s\S]*?const projectsFr = \[/m, newEn + "\n\nconst projectsFr = [");
content = content.replace(/const projectsFr = \[[\s\S]*?function linkLabel/m, newFr + "\n\nfunction linkLabel");

content = content.replace(/{t\("projects\.description"\)}/g, '{t("experience.description")}');

fs.writeFileSync('src/components/sections/Experience.tsx', content);
