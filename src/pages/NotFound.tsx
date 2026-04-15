import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background px-6">
      <div className="pointer-events-none absolute inset-0 blur-bg" />
      <div className="relative ui-card p-10 md:p-12 text-center max-w-lg w-full">
        <p className="inline-flex mb-4 rounded-full bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-400/20 px-3 py-1 text-xs font-semibold">
          Route not found
        </p>
        <h1 className="mb-3 text-5xl md:text-6xl font-extrabold text-gradient">404</h1>
        <p className="mb-8 text-base md:text-lg text-slate-600 dark:text-slate-300/80">Oops! Page not found</p>
        <a href="/" className="ui-button-primary">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
