import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";

// Static camera icon with animated flash elements
function CameraIcon({ className, phase }: { className?: string; phase: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      animate={
        phase === "flash"
          ? { rotate: [0, -2, 2, -1, 1, 0], scale: [1, 0.96, 1.02, 1] }
          : { rotate: 0, scale: 1 }
      }
      transition={
        phase === "flash"
          ? { duration: 0.25, ease: "easeOut" }
          : {}
      }
    >
      <rect x="12" y="32" width="76" height="50" rx="6" />
      <path d="M36 32 L42 20 L58 20 L64 32" />
      <circle cx="50" cy="57" r="16" />
      <circle cx="50" cy="57" r="9" />
      {/* Shutter blades — close during flash */}
      <motion.circle
        cx="50" cy="57" r="9"
        fill="currentColor"
        stroke="none"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === "flash"
            ? { scale: [0, 1, 1, 0], opacity: [0, 0.9, 0.9, 0] }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.4, times: [0, 0.2, 0.7, 1], ease: "easeInOut" }}
      />
      <circle cx="46" cy="53" r="3" />
      <circle cx="26" cy="40" r="2.5" />
      {/* Flash burst rays from flash unit */}
      {phase === "flash" && (
        <>
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <motion.line
              key={angle}
              x1="26"
              y1="40"
              x2={26 + Math.cos((angle * Math.PI) / 180) * 8}
              y2={40 + Math.sin((angle * Math.PI) / 180) * 8}
              strokeWidth={1.2}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: [0, 1, 0], pathLength: [0, 1, 1] }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          ))}
        </>
      )}
      <line x1="72" y1="38" x2="78" y2="38" />
      <line x1="72" y1="42" x2="78" y2="42" />
    </motion.svg>
  );
}

export function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"show" | "flash" | "exit">("show");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Light: black bg, white icon/text → white flash → zoom+fade out
  // Dark:  white bg, dark icon/text → dark flash → zoom+fade out
  const bg = isDark ? "#f5f0eb" : "#1a1410";
  const contentColor = isDark ? "#1a1410" : "#f5f0eb";
  const flashColor = isDark ? "#1a1410" : "#ffffff";

  useEffect(() => {
    // 0s: Camera + text appear instantly
    // 2.0s: Flash fires (site loads in background)
    const flashTimer = setTimeout(() => setPhase("flash"), 1200);
    // 2.5s: Start zoom-in + fade away
    const exitTimer = setTimeout(() => setPhase("exit"), 1700);
    // 3.5s: Fully gone
    const doneTimer = setTimeout(() => onComplete(), 2000);

    return () => {
      clearTimeout(flashTimer);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: bg }}
      animate={phase === "exit" ? { opacity: 0 } : { opacity: 1 }}
      transition={phase === "exit" ? { duration: 1, ease: [0.32, 0.72, 0, 1] } : {}}
    >
      {/* FLASH burst — full-screen white/dark */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ backgroundColor: flashColor }}
        initial={{ opacity: 0 }}
        animate={
          phase === "flash" || phase === "exit"
            ? { opacity: [0, 1, 0.8, 0] }
            : { opacity: 0 }
        }
        transition={
          phase === "flash"
            ? { duration: 0.6, times: [0, 0.08, 0.3, 1], ease: "easeOut" }
            : {}
        }
      />

      {/* Camera + text — appear together, then zoom in + fade on exit */}
      <motion.div
        className="relative flex flex-col items-center gap-3 sm:gap-4"
        style={{ color: contentColor }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={
          phase === "exit"
            ? { scale: 2.5, opacity: 0, filter: "blur(20px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={
          phase === "exit"
            ? { duration: 0.8, ease: [0.32, 0.72, 0, 1] }
            : { duration: 0.35, ease: "easeOut" }
        }
      >
        {/* Camera icon with original flash animation */}
        <CameraIcon className="w-20 h-20 sm:w-28 sm:h-28" phase={phase} />

        {/* "H.W Photography" text */}
        <p className="text-sm sm:text-base tracking-[0.3em] uppercase font-light">
          H.W Photography
        </p>
      </motion.div>
    </motion.div>
  );
}
