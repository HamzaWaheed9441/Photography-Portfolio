import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { FilmstripGallery } from "@/components/gallery/FilmstripGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { ScrollNav } from "@/components/gallery/ScrollNav";
import { SEO } from "@/components/seo/SEO";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import ForMoreInstagram from "@/components/ui/ForMoreInstagram";

export default function Home() {
  const { series, photographer, loading, error } = usePortfolio();
  const [activeSection, setActiveSection] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const seoTitle = photographer?.name
    ? `${photographer.name} - ${photographer.tagline || "Professional Photographer"}`
    : "Professional Photographer Portfolio";

  const seoDescription =
    photographer?.tagline ||
    "Professional photography portfolio featuring portrait, wedding, street and architecture work.";

  // Build sections for scroll nav from all series
  const sections = series.map((s) => ({
    id: `section-${s.slug}`,
    label: s.title,
  }));

  // Set initial active section
  useEffect(() => {
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id);
    }
  }, [sections, activeSection]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (series.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    series.forEach((s) => {
      const el = document.getElementById(`section-${s.slug}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [series]);

  // Set page title and preload critical resources
  useEffect(() => {
    document.title = seoTitle;

    return undefined;
  }, [seoTitle]);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  if (loading) {
    return (
      <Layout fullPage>
        <SEO title="Loading..." description="Loading portfolio" />
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout fullPage>
        <SEO title="Error" description="Error loading portfolio" />
        <div className="flex items-center justify-center h-full">
          <div className="text-center max-w-md px-4">
            <p className="text-destructive font-semibold">Error loading portfolio</p>
            <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-foreground text-background rounded hover:opacity-80 transition-opacity"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (series.length === 0) {
    return (
      <Layout fullPage>
        <SEO title="No Series" description="No portfolio series available" />
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">No portfolio series available</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout fullPage>
      <SEO title={seoTitle} description={seoDescription} image={series[0]?.images[0]?.src} type="website" />

      {/* Vertical Scroll Navigation */}
      <ScrollNav sections={sections} activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Stacked Gallery Sections */}
      <div ref={containerRef} className="flex flex-col gap-8 sm:gap-10 lg:gap-14 pb-16">
        {series.map((s, index) => (
          <motion.section
            key={s.id}
            id={`section-${s.slug}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index === 0 ? 0 : 0.15 }}
          >
            {/* Gallery Grid — same component, same layout, same animations */}
            <FilmstripGallery images={s.images} />
          </motion.section>
        ))}
        <ForMoreInstagram />
      </div>
    </Layout>
  );
}
