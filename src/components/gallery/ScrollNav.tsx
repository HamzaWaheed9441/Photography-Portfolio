import { motion } from "framer-motion";

interface ScrollNavProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  onNavigate: (id: string) => void;
}

export function ScrollNav({ sections, activeSection, onNavigate }: ScrollNavProps) {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-3 sm:right-5 lg:right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4"
      aria-label="Section navigation"
    >
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        return (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className="group relative flex items-center"
            aria-label={`Scroll to ${section.label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Tooltip label */}
            <span className="absolute right-8 whitespace-nowrap bg-foreground text-background text-xs px-2.5 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              {section.label}
            </span>
            {/* Dot */}
            <motion.span
              className={`block rounded-full transition-colors duration-300 ${
                isActive
                  ? "bg-accent"
                  : "bg-gray-300 group-hover:bg-gray-500"
              }`}
              animate={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        );
      })}
    </motion.nav>
  );
}
