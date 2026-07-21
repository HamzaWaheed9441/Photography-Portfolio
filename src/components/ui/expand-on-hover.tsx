"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "smallTablet" | "largeTablet" | "desktop">(() => {
    // Initialize with correct value on mount to prevent flash
    if (typeof window === "undefined") return "desktop"; // SSR fallback
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 900) return "smallTablet";
    if (width < 1280) return "largeTablet";
    return "desktop";
  });

  useEffect(() => {
    const checkBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 900) {
        setBreakpoint("smallTablet");
      } else if (width < 1280) {
        setBreakpoint("largeTablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    // No need to call checkBreakpoint() immediately since state is initialized correctly
    window.addEventListener("resize", checkBreakpoint);
    return () => window.removeEventListener("resize", checkBreakpoint);
  }, []);

  return breakpoint;
};

const HoverExpand_001 = ({
  images,
  className,
}: {
  images: { src: string; alt: string; code: string }[];
  className?: string;
}) => {
  const [activeImage, setActiveImage] = useState<number | null>(1);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const breakpoint = useBreakpoint();

  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  }, []);

  // Responsive configuration based on breakpoint
  const config = {
    mobile: {
      layout: "horizontal" as const,
      numVisible: 6,
      expandedPercent: 58,
      collapsedPercent: 7.5,
      height: "min(22rem, 50vh)",
      gap: "gap-[3px]",
      padding: "px-0",
    },
    smallTablet: {
      layout: "horizontal" as const,
      numVisible: 3,
      expandedPercent: 50,
      collapsedPercent: 25,
      height: "min(24rem, 45vh)",
      gap: "gap-2",
      padding: "px-0",
    },
    largeTablet: {
      layout: "horizontal" as const,
      numVisible: 4,
      expandedPercent: 46,
      collapsedPercent: 18,
      height: "min(28rem, 50vh)",
      gap: "gap-3",
      padding: "px-0",
    },
    desktop: {
      layout: "horizontal" as const,
      numVisible: 6,
      expandedWidth: "27.65625rem", // 442px - original fixed size
      collapsedWidth: "9.21875rem", // 147px - original fixed size
      height: "min(36.875rem, 60vh)",
      gap: "gap-5",
      padding: "px-0",
      maxWidth: "max-w-[1200px]",
    },
  }[breakpoint];

  // All layouts use the same horizontal expand component
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      className={cn("relative w-full", config.padding, className)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={cn("w-full mx-auto", "maxWidth" in config ? config.maxWidth : "")}
      >
        <div className={cn("flex w-full items-center justify-center", config.gap)}>
          {images.slice(0, config.numVisible).map((image, index) => {
            const isActive = activeImage === index;
            const numImages = Math.min(images.length, config.numVisible);

            // Desktop uses fixed widths, others use percentages
            // Dynamically adjust collapsed width when fewer images than numVisible
            let width: string;
            let initialWidth: string;
            if ("expandedWidth" in config) {
              width = isActive ? config.expandedWidth : config.collapsedWidth;
              initialWidth = config.collapsedWidth;
            } else {
              const targetTotal = config.expandedPercent + (config.numVisible - 1) * config.collapsedPercent;
              const adjustedCollapsed = numImages > 1
                ? (targetTotal - config.expandedPercent) / (numImages - 1)
                : config.expandedPercent;
              width = isActive ? `${config.expandedPercent}%` : `${adjustedCollapsed}%`;
              initialWidth = `${adjustedCollapsed}%`;
            }

            return (
              <motion.div
                key={index}
                className="relative cursor-pointer overflow-hidden rounded-2xl sm:rounded-3xl"
                initial={{ width: initialWidth, height: "16rem" }}
                animate={{ width, height: config.height }}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                onClick={() => {
                  setActiveImage(index);
                  if (breakpoint === "mobile" && navigator.vibrate) {
                    navigator.vibrate(50);
                  }
                }}
                onHoverStart={() => setActiveImage(index)}
                style={{ willChange: "width" }}
              >
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="absolute h-full w-full bg-gradient-to-t from-black/40 to-transparent z-10"
                    />
                  )}
                </AnimatePresence>
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 14 }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
                      className="absolute flex h-full w-full flex-col items-start justify-end p-3 sm:p-4 z-20"
                    >
                      <p className="text-left text-[0.65rem] sm:text-xs text-white/70 font-medium">{image.code}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl sm:rounded-3xl" />
                )}
                <img
                  src={image.src}
                  className={cn("size-full object-cover transition-opacity duration-500", loadedImages.has(index) ? "opacity-100" : "opacity-0")}
                  alt={image.alt}
                  onLoad={() => handleImageLoad(index)}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
};

export { HoverExpand_001 };
