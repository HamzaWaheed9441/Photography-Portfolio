import { Link, useLocation } from "react-router-dom";
import { usePortfolio } from "@/context/PortfolioContext";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Mail, Phone, Contact } from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function HeaderNavigation() {
  const { photographer, series } = usePortfolio();
  const location = useLocation();
  const [showContact, setShowContact] = useState(false);

  if (!photographer) return null;

  const isActive = (path: string) => {
    // For home page
    if (path === "/" && location.pathname === "/") return true;
    // For other pages
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="relative w-full">
      {/* Row 1: Name | For Bookings + ThemeToggle */}
      <div className="flex items-center justify-between mb-1 sm:mb-2">
        <div className="shrink-0 flex items-baseline gap-2 sm:gap-3">
          <Link to="/">
            <h1 className="font-sans text-xl sm:text-[3.1rem] lg:text-[2.8rem] leading-tight font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
              {photographer.name}
            </h1>
          </Link>
          <p className="text-sm lg:text-[0.9375rem] text-muted-foreground">
            Photographer
          </p>
        </div>

        {/* Right side: For Bookings + Theme Toggle */}
        <div className="hidden md:flex items-start gap-4">
          <div className="flex flex-col items-end gap-1.5">
            <p className="text-xs lg:text-[0.8125rem] font-medium tracking-wide uppercase text-muted-foreground">
              For Bookings
            </p>
            <div className="flex items-center gap-2 text-sm lg:text-[0.9375rem] text-muted-foreground">
              <Mail className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <a href={`mailto:${photographer.contact.email}`} className="hover:text-foreground transition-colors">
                {photographer.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-sm lg:text-[0.9375rem] text-muted-foreground">
              <Phone className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              <a href={`tel:${photographer.contact.phone}`} className="hover:text-foreground transition-colors">
                {photographer.contact.phone}
              </a>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Mobile: Contact button + ThemeToggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setShowContact((v) => !v)}
            className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full
              bg-gray-200/60 dark:bg-gray-200/20 hover:bg-gray-300/60 dark:hover:bg-gray-200/30
              transition-colors duration-300 cursor-pointer text-muted-foreground"
            aria-label="Show contact details"
          >
            <Contact className="w-4 h-4" />
          </button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile contact dropdown */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col items-end gap-1.5 pb-2">
              <p className="text-[0.625rem] font-medium tracking-wide uppercase text-muted-foreground">
                For Bookings
              </p>
              <a href={`mailto:${photographer.contact.email}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="w-3 h-3" />
                {photographer.contact.email}
              </a>
              <a href={`tel:${photographer.contact.phone}`} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="w-3 h-3" />
                {photographer.contact.phone}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Row 2: Navigation links — all screens */}
      <nav>
        <ul className="flex flex-row flex-wrap items-center gap-3 sm:gap-5 lg:gap-6">
          {series.map((s) => (
            <li key={s.id}>
              <Link
                to={`/series/${s.slug}`}
                className={`text-xs sm:text-base lg:text-[1.0625rem] leading-5 sm:leading-[1.375rem] transition-all duration-200 ${
                  isActive(`/series/${s.slug}`)
                    ? "font-semibold text-foreground"
                    : "font-normal text-muted-foreground hover:text-gray-700"
                }`}
              >
                {s.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/about"
              className={`text-xs sm:text-base lg:text-[1.0625rem] leading-5 sm:leading-[1.375rem] transition-all duration-200 ${
                isActive("/about")
                  ? "font-semibold text-foreground"
                  : "font-normal text-muted-foreground hover:text-gray-700"
              }`}
            >
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
