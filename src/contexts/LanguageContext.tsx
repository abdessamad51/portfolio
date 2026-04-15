

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Language = "en" | "fr";

const LANGUAGE_STORAGE_KEY = "app-language";

function getInitialLanguage(): Language {
  if (typeof window === "undefined") {
    return "fr";
  }

  const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return stored === "en" || stored === "fr" ? stored : "fr";
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.experience": "Experience",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.education": "Education",
    "nav.certifications": "Strengths",
    "nav.contact": "Contact",
    

    // Hero
    "hero.greeting": "Hi there, I am",
    "hero.title":
      "Full-Stack Web Developer | React & Laravel Specialist",
    "hero.description":
      "Full-Stack Web Developer with 2 years of experience, specialized in building scalable and high-performance solutions. Strong frontend skills (React.js, Bootstrap, jQuery) and backend expertise (Laravel, MySQL).",
    "hero.experience1":
      "- 2 years of professional full-stack development experience",
    "hero.experience2":
      "- Frontend: React.js, Bootstrap, jQuery | Backend: Laravel, MySQL",
    "hero.projects1":
      "- Built and maintained web application backends with admin dashboards",
    "hero.projects2":
      "- Improved performance through SQL tuning, Redis caching, and Azure deployments",
    "hero.openToWork": "Open to impactful product teams",
    "hero.coreExperience": "Core experience",
    "hero.productImpact": "Product impact",
    "hero.summary":
      "Building reliable backend systems and polished frontend experiences for modern web products.",
    "hero.viewWork": "Explore My Portfolio",
    "hero.contactMe": "Get In Touch",

    // Education
    "education.title": "Academic Background",
    "education.degree1": "Professional Bachelor's Degree in Software Engineering and Information Systems",
    "education.institution1": "ENSA Kénitra",
    "education.period1": "Graduated: August 2025",
    "education.location1": "Kénitra, Morocco",
    "education.description1":
      "Recently graduated with a Professional Bachelor's degree focused on software engineering methods, web technologies, and information systems.",
    "education.degree2":
      "Specialized Technician Diploma in IT Development",
    "education.institution2": "ISTA Casablanca",
    "education.period2": "Graduated: October 2022",
    "education.location2": "Casablanca, Morocco",
    "education.description2": "Completed a practical and industry-oriented curriculum in software development and web technologies.",
    "education.degree3": "Baccalaureate in Physical and Chemical Sciences",
    "education.institution3": "Lycée Abdellah El Mediouni",
    "education.period3": "Graduated: October 2020",
    "education.location3": "Casablanca, Morocco",
    "education.description3": "Completed high school studies with a scientific track in physics and chemistry.",
    "education.degree4": "Continuous Learning in Web Engineering",
    "education.institution4": "Self-learning & Professional Practice",
    "education.period4": "2023 - Present",
    "education.location4": "Morocco",
    "education.description4":
      "Continuous upskilling through real-world projects and evolving web technologies.",

    // Skills
    "skills.title": "Technical Skills",
    "skills.description":
      "A practical technical stack built around production web applications, performance, and maintainable architecture.",
    "skills.frontend": "Frontend Development",
    "skills.frontend_description":
      "Building responsive user interfaces using React.js, Bootstrap, jQuery, JavaScript, and TypeScript.",
    "skills.backend": "Backend Architecture",
    "skills.backend_description":
      "Developing robust backend systems with Laravel, PHP, Symfony, and Django, with API integration and permission management.",
    "skills.databases": "Data Management",
    "skills.databases_description":
      "Working with MySQL and SQL Server, including SQL query optimization and database modeling.",
    "skills.mobile": "Mobile Engineering",
    "skills.mobile_description":
      "Supporting mobile app backends and administration dashboards, including deployment and maintenance workflows.",
    "skills.tools": "DevOps & Methodology",
    "skills.tools_description":
      "Using Git, GitHub, GitLab, Docker, Trello, Redmine, Postman, Visual Studio, and WordPress in daily development.",
    "skills.design": "Software Design",
    "skills.design_description":
      "Applying UML and Merise modeling to transform business needs into clear technical designs.",

    // Experience
    "experience.title": "Professional Experience",
    "experience.description": "A curated timeline of freelance and full-stack missions delivered across SaaS, WordPress, telecom, HR, and business applications.",

    // Projects
    "projects.title": "Featured Projects",
    "projects.period": "Timeline",
    "projects.type": "Project Category",
    "projects.company": "Organization",
    "projects.description":
      "Highlight of end-to-end solutions combining robust backends and efficient user interfaces.",

    // Certifications
    "certifications.title": "Languages & Personal Skills",

    // Contact
    "contact.title": "Contact & Collaboration",
    "contact.description":
      "Currently open to professional opportunities and technical collaborations. Let's discuss how my skills can contribute to your next project.",
    "contact.email": "Professional Email",
    "contact.phone": "Phone",
    "contact.location": "Current Location",
    "contact.name": "Full Name",
    "contact.subject": "Inquiry Subject",
    "contact.message": "Message Body",
    "contact.send": "Submit Message",
    "contact.namePlaceholder": "Enter your name",
    "contact.emailPlaceholder": "Enter your email address",
    "contact.subjectPlaceholder": "Regarding...",
    "contact.messagePlaceholder": "How can I help you?",
    "rights.reserved": "All rights reserved.",
    "contact.footer":
      "© 2026 Abdessamad Rami. Developed with React & Tailwind CSS.",
    "send-success": "Message transmitted successfully.",
    "send-failure": "Transmission failed. Please attempt again or contact via LinkedIn.",
    "contact.sending": "Processing...",
  },

  fr: {
    // Navbar
    "nav.about": "À propos",
    "nav.experience": "Expériences",
    "nav.projects": "Projets",
    "nav.skills": "Compétences Techniques",
    "nav.education": "Parcours Académique",
    "nav.certifications": "Atouts",
    "nav.contact": "Contact",

    // Hero
    "hero.greeting": "Bonjour, je suis",
    "hero.title":
      "Développeur Web Full-Stack | Spécialiste React & Laravel",
    "hero.description":
      "Développeur web Full Stack avec 2 ans d'expérience, spécialisé dans des solutions performantes et évolutives. Maîtrise du frontend (React.js, Bootstrap, jQuery) et du backend (Laravel, MySQL).",
    "hero.experience1":
      "- 2 ans d'expérience professionnelle en développement full-stack",
    "hero.experience2":
      "- Frontend: React.js, Bootstrap, jQuery | Backend: Laravel, MySQL",
    "hero.projects1":
      "- Développement et maintenance de backends web et dashboards d'administration",
    "hero.projects2":
      "- Optimisation des performances via SQL, Redis et déploiement Azure",
    "hero.openToWork": "Ouvert à des équipes produit à fort impact",
    "hero.coreExperience": "Expérience clé",
    "hero.productImpact": "Impact produit",
    "hero.summary":
      "Conception de backends fiables et d'interfaces frontend soignées pour des produits web modernes.",
    "hero.viewWork": "Consulter mes projets",
    "hero.contactMe": "Me contacter",

    // Education
    "education.title": "Formation",
    "education.degree1": "Licence Professionnelle en Génie Logiciel et Systèmes d'Information",
    "education.institution1": "ENSA Kénitra",
    "education.period1": "Diplômé: Août 2025",
    "education.location1": "Kénitra, Maroc",
    "education.description1":
      "Formation orientée ingénierie logicielle, systèmes d'information et conception d'applications web modernes.",
    "education.degree2":
      "Diplôme de Technicien Spécialisé en Développement Informatique",
    "education.institution2": "ISTA Casablanca",
    "education.period2": "Diplômé: Octobre 2022",
    "education.location2": "Casablanca, Maroc",
    "education.description2": "Parcours professionnalisant axé sur le développement web, les bases de données et la mise en production.",
    "education.degree3": "Baccalauréat en Sciences Physiques et Chimiques",
    "education.institution3": "Lycée Abdellah El Mediouni",
    "education.period3": "Diplômé: Octobre 2020",
    "education.location3": "Casablanca, Maroc",
    "education.description3": "Base scientifique solide en physique, chimie et raisonnement analytique.",
    "education.degree4": "Apprentissage Continu en Développement Web",
    "education.institution4": "Veille technologique & Projets réels",
    "education.period4": "2023 - Présent",
    "education.location4": "Maroc",
    "education.description4":
      "Mise à niveau continue via la pratique terrain et les nouvelles technologies.",

    // Skills
    "skills.title": "Compétences Techniques",
    "skills.description":
      "Stack technique orienté produits web en production, avec un focus sur la performance et la maintenabilité.",
    "skills.frontend": "Développement Frontend",
    "skills.frontend_description":
      "Création d'interfaces responsive avec React.js, Bootstrap, jQuery, JavaScript et TypeScript.",
    "skills.backend": "Architecture Backend",
    "skills.backend_description":
      "Développement de backends robustes avec Laravel, PHP, Symfony et Django, incluant API et gestion des permissions.",
    "skills.databases": "Gestion de Données",
    "skills.databases_description":
      "Conception et optimisation de bases de données MySQL et SQL Server, avec tuning des requêtes SQL.",
    "skills.mobile": "Ingénierie Mobile",
    "skills.mobile_description":
      "Contribution au backend des applications mobiles et dashboards d'administration, avec maintenance et déploiement.",
    "skills.tools": "DevOps & Méthodologies",
    "skills.tools_description":
      "Utilisation de Git, GitHub, GitLab, Docker, Trello, Redmine, Postman, Visual Studio et WordPress au quotidien.",
    "skills.design": "Conception Logicielle",
    "skills.design_description":
      "Utilisation de la modélisation UML et Merise pour traduire les besoins métier en spécifications techniques.",

    // Experience
    "experience.title": "Expériences Professionnelles",
    "experience.description": "Parcours des missions freelance et full-stack réalisées sur des produits SaaS, WordPress, telecom, RH et applications métier.",

    // Projects
    "projects.title": "Projets Phares",
    "projects.period": "Période",
    "projects.type": "Catégorie",
    "projects.company": "Organisation",
    "projects.description":
      "Mise en avant de projets de bout en bout alliant des backends robustes et des interfaces performantes.",

    // Certifications
    "certifications.title": "Langues & Compétences Personnelles",

    // Contact
    "contact.title": "Contact & Collaboration",
    "contact.description":
      "Disponible pour des opportunités professionnelles ou des collaborations techniques. Discutons de la manière dont je peux contribuer à vos futurs projets.",
    "contact.email": "Email Professionnel",
    "contact.phone": "Téléphone",
    "contact.location": "Localisation",
    "contact.name": "Nom complet",
    "contact.subject": "Objet de la demande",
    "contact.message": "Message",
    "contact.send": "Envoyer le message",
    "contact.namePlaceholder": "Votre nom",
    "contact.emailPlaceholder": "Votre adresse email",
    "contact.subjectPlaceholder": "Sujet...",
    "contact.messagePlaceholder": "Comment puis-je vous aider ?",
    "rights.reserved": "Tous droits réservés.",
    "contact.footer":
      "© 2026 Abdessamad Rami. Conçu avec React & Tailwind CSS.",
    "send-success": "Message transmis avec succès.",
    "send-failure": "Échec de l'envoi. Veuillez réessayer ou me contacter via LinkedIn.",
    "contact.sending": "Traitement en cours...",
  },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

