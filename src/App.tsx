import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const CONTACT_NOTIFICATION_EMAIL = import.meta.env.VITE_CONTACT_NOTIFICATION_EMAIL?.trim() || "";
const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim() || "";
const VISIT_NOTIFICATION_EMAIL =
  import.meta.env.VITE_VISIT_NOTIFICATION_EMAIL?.trim() || CONTACT_NOTIFICATION_EMAIL;
const VISIT_FORM_ENDPOINT =
  import.meta.env.VITE_VISIT_FORM_ENDPOINT?.trim() || CONTACT_FORM_ENDPOINT;
const VISIT_NOTIFY_COOLDOWN_HOURS = Number(import.meta.env.VITE_VISIT_NOTIFY_COOLDOWN_HOURS || "12");
const VISIT_NOTIFY_COOLDOWN_MS =
  (Number.isFinite(VISIT_NOTIFY_COOLDOWN_HOURS) && VISIT_NOTIFY_COOLDOWN_HOURS > 0
    ? VISIT_NOTIFY_COOLDOWN_HOURS
    : 12) *
  60 *
  60 *
  1000;
const VISIT_STORAGE_KEY = "portfolio:lastVisitNotificationSentAt";

function getLastVisitNotificationTime() {
  try {
    const storedValue = window.localStorage.getItem(VISIT_STORAGE_KEY);
    const parsed = Number(storedValue);
    return Number.isFinite(parsed) ? parsed : 0;
  } catch {
    return 0;
  }
}

function setLastVisitNotificationTime(timestamp: number) {
  try {
    window.localStorage.setItem(VISIT_STORAGE_KEY, String(timestamp));
  } catch {
    // Ignore storage failures (private mode or restricted environments).
  }
}

function buildVisitMessage() {
  const page = window.location.href;
  const referrer = document.referrer || "Direct";
  const language = navigator.language || "unknown";
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "unknown";
  const visitedAt = new Date().toISOString();

  return {
    page,
    referrer,
    language,
    timezone,
    visitedAt,
    userAgent: navigator.userAgent,
    text: [
      "New portfolio visit detected.",
      `Page: ${page}`,
      `Referrer: ${referrer}`,
      `Language: ${language}`,
      `Timezone: ${timezone}`,
      `Visited At: ${visitedAt}`,
      "",
      `User Agent: ${navigator.userAgent}`,
    ].join("\n"),
  };
}

async function sendVisitNotification() {
  if (!VISIT_FORM_ENDPOINT || !VISIT_NOTIFICATION_EMAIL) {
    return;
  }

  const now = Date.now();
  const lastSentAt = getLastVisitNotificationTime();
  if (now - lastSentAt < VISIT_NOTIFY_COOLDOWN_MS) {
    return;
  }

  const visit = buildVisitMessage();
  const response = await fetch(VISIT_FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: "Portfolio Visit Tracker",
      email: VISIT_NOTIFICATION_EMAIL,
      subject: "Portfolio visit alert",
      message: visit.text,
      event: "portfolio_visit",
      page: visit.page,
      referrer: visit.referrer,
      language: visit.language,
      timezone: visit.timezone,
      userAgent: visit.userAgent,
      visitedAt: visit.visitedAt,
      _subject: "Portfolio visit alert",
    }),
  });

  if (!response.ok) {
    throw new Error(`Visit notification failed with status ${response.status}`);
  }

  setLastVisitNotificationTime(now);
}

const App = () => {
  const handleVisitNotification = async () => {
    try {
      await sendVisitNotification();
    } catch (error) {
      console.error("Error sending visit notification:", error);
    }
  };

  useEffect(() => {
    handleVisitNotification();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
