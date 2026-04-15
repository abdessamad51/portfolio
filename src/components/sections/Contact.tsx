import { Mail, Phone, MapPin, Send, Handshake, CheckCircle2, XCircle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ScrollReveal } from "./ScrollReveal";
import { SectionHeader } from "./SectionHeader";

const DEFAULT_CONTACT_EMAIL = "abdessamadrami51@gmail.com";
const CONTACT_NOTIFICATION_EMAIL =
  import.meta.env.VITE_CONTACT_NOTIFICATION_EMAIL?.trim() || DEFAULT_CONTACT_EMAIL;
const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || "";

type ContactPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function buildPlainTextMessage(payload: ContactPayload) {
  return [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    `Subject: ${payload.subject}`,
    "",
    payload.message,
  ].join("\n");
}

function openMailClient(payload: ContactPayload, recipientEmail: string) {
  const subject = encodeURIComponent(`[Portfolio Contact] ${payload.subject}`);
  const body = encodeURIComponent(buildPlainTextMessage(payload));
  window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}

async function submitToFormEndpoint(payload: ContactPayload) {
  const response = await fetch(CONTACT_FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      subject: payload.subject,
      message: payload.message,
      _subject: `[Portfolio Contact] ${payload.subject}`,
      _replyto: payload.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`Contact submission failed with status ${response.status}`);
  }
}

export function Contact() {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const ownerEmail = CONTACT_NOTIFICATION_EMAIL;

  const contactInfo = [
    { icon: Mail, label: t("contact.email"), value: ownerEmail, href: `mailto:${ownerEmail}`, accent: "from-indigo-500 to-violet-500", glow: "rgba(99,102,241,0.12)" },
    { icon: Phone, label: t("contact.phone"), value: "+212 702558750", href: "tel:+212702558750", accent: "from-emerald-500 to-teal-500", glow: "rgba(52,211,153,0.10)" },
    {
      icon: MapPin,
      label: t("contact.location"),
      value: language === "fr" ? "Casablanca, Maroc" : "Casablanca, Morocco",
      href: "#",
      accent: "from-rose-500 to-pink-500",
      glow: "rgba(251,113,133,0.10)",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true); setStatus("idle");

    const payload: ContactPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    try {
      if (CONTACT_FORM_ENDPOINT) {
        await submitToFormEndpoint(payload);
      } else {
        openMailClient(payload, ownerEmail);
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch { setStatus("error"); }
    finally { setIsSubmitting(false); }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="ui-section">
      <div className="ui-shell max-w-6xl">

        <ScrollReveal delay={0.1}>
          <SectionHeader
            Icon={Handshake}
            title={t("contact.title")}
            description={t("contact.description")}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8 mt-16">

          <ScrollReveal delay={0.15}>
            <div className="flex flex-col gap-6 h-full">
              <div className="flex flex-col gap-3">
                {contactInfo.map((info) => {
                  const Icon = info.icon;
                  return (
                    <a key={info.label} href={info.href}
                      className="group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ui-card ui-card-hover"
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${info.glow}`; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = ""; }}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${info.accent} p-px flex-shrink-0`}>
                        <div className="w-full h-full rounded-xl bg-white dark:bg-[#0a0b10] flex items-center justify-center group-hover:bg-slate-50 dark:group-hover:bg-[#0d0e16] transition-colors duration-200">
                          <Icon className="w-4 h-4 text-slate-600 dark:text-white/70 group-hover:text-slate-900 dark:group-hover:text-white/90 transition-colors duration-200" />
                        </div>
                      </div>
                      <div>
                        <p className="text-[11px] text-slate-400 dark:text-white/30 uppercase tracking-widest mb-0.5">{info.label}</p>
                        <p className={`text-sm font-medium bg-gradient-to-r ${info.accent} bg-clip-text text-transparent`}>{info.value}</p>
                      </div>
                      <div className="ml-auto opacity-0 group-hover:opacity-30 transition-opacity duration-200">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-600 dark:text-white"/>
                        </svg>
                      </div>
                    </a>
                  );
                })}
              </div>

              <div className="mt-auto pt-4 border-t border-black/[0.05] dark:border-white/[0.05]">
                <p className="text-slate-400 dark:text-white/25 text-base italic leading-relaxed">
                  {language === "fr"
                    ? "\"La meilleure façon de prédire l'avenir, c'est de le construire.\""
                    : "\"The best way to predict the future is to build it.\""}
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative ui-card p-6 md:p-8 overflow-hidden"
              style={{ boxShadow: "0 0 60px rgba(14,116,214,0.08)" }}>
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-400/30 to-transparent" />
              <span className="absolute bottom-4 right-6 text-7xl font-bold text-black/[0.02] dark:text-white/[0.02] select-none pointer-events-none"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} aria-hidden>✉</span>

              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label={t("contact.name")} htmlFor="name">
                    <PremiumInput id="name" name="name" type="text" placeholder={t("contact.namePlaceholder")} value={formData.name} onChange={handleChange} required />
                  </Field>
                  <Field label={t("contact.email")} htmlFor="email">
                    <PremiumInput id="email" name="email" type="email" placeholder={t("contact.emailPlaceholder")} value={formData.email} onChange={handleChange} required />
                  </Field>
                </div>
                <Field label={t("contact.subject")} htmlFor="subject">
                  <PremiumInput id="subject" name="subject" type="text" placeholder={t("contact.subjectPlaceholder")} value={formData.subject} onChange={handleChange} required />
                </Field>
                <Field label={t("contact.message")} htmlFor="message">
                  <textarea id="message" name="message" rows={5} required
                    placeholder={t("contact.messagePlaceholder")}
                    value={formData.message} onChange={handleChange}
                    className="ui-input resize-none" />
                </Field>

                <button type="submit" disabled={isSubmitting}
                  className="ui-button-primary w-full group">
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                  <Send className={`w-4 h-4 ${isSubmitting ? "animate-pulse" : "group-hover:translate-x-0.5 transition-transform duration-300"}`} />
                  <span>{isSubmitting ? t("contact.sending") : t("contact.send")}</span>
                </button>

                {status !== "idle" && (
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${
                    status === "success"
                      ? "border-emerald-400/20 bg-emerald-50 dark:bg-emerald-400/05 text-emerald-700 dark:text-emerald-400"
                      : "border-rose-400/20 bg-rose-50 dark:bg-rose-400/05 text-rose-700 dark:text-rose-400"
                  }`}>
                    {status === "success" ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <XCircle className="w-4 h-4 flex-shrink-0" />}
                    <span>{status === "success" ? t("send-success") : t("send-failure")}</span>
                  </div>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[11px] uppercase tracking-widest text-slate-400 dark:text-white/35"
      >{label}</label>
      {children}
    </div>
  );
}

function PremiumInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input {...props} className="ui-input" />
  );
}