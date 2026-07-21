import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePortfolio } from "@/context/PortfolioContext";
import { FilmstripGallery } from "@/components/gallery/FilmstripGallery";
import { GallerySkeleton } from "@/components/gallery/GallerySkeleton";
import { ScrollNav } from "@/components/gallery/ScrollNav";
import { SEO } from "@/components/seo/SEO";
import { motion } from "framer-motion";
import ForMoreInstagram from "@/components/ui/ForMoreInstagram";
import { GalleryImage } from "@/types/gallery";
import NotFound from "./NotFound";

function chunkByGridSizes(images: GalleryImage[], gridSizes?: number[]): GalleryImage[][] {
  if (!gridSizes || gridSizes.length === 0) return [images];
  const chunks: GalleryImage[][] = [];
  let offset = 0;
  for (const size of gridSizes) {
    chunks.push(images.slice(offset, offset + size));
    offset += size;
  }
  return chunks;
}

export default function SeriesPage() {
  const { slug } = useParams<{ slug: string }>();
  const { getSeriesBySlug, photographer, loading } = usePortfolio();
  const [activeSection, setActiveSection] = useState("");

  const series = slug ? getSeriesBySlug(slug) : null;

  const grids = useMemo(
    () => (series ? chunkByGridSizes(series.images, series.gridSizes) : []),
    [series]
  );

  const seoTitle = series
    ? `${series.title} - ${photographer?.name || "Portrait Photographer"}`
    : photographer?.name || "Portrait Photographer";

  const seoDescription =
    series?.description ||
    `${series?.title || "Photography"} series by ${photographer?.name || "professional photographer"}`;

  const structuredData = series
    ? {
        "@context": "https://schema.org",
        "@type": "ImageGallery",
        name: series.title,
        description: series.description,
        image: series.images.map((img) => ({
          "@type": "ImageObject",
          url: img.src,
          caption: img.caption,
        })),
      }
    : undefined;

  const sections = useMemo(
    () =>
      grids.map((_, i) => ({
        id: `section-${series?.slug}-${i + 1}`,
        label: `${series?.title} — Part ${i + 1}`,
      })),
    [grids, series]
  );

  // Set initial active section
  useEffect(() => {
    if (sections.length > 0 && !activeSection) {
      setActiveSection(sections[0].id);
    }
  }, [sections, activeSection]);

  // Intersection Observer for active section tracking
  useEffect(() => {
    if (!series) return;

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

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [series, sections]);

  // Set page title and preload critical resources
  useEffect(() => {
    if (series) {
      document.title = seoTitle;
    }


  }, [series, seoTitle]);

  const handleNavigate = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  if (loading) {
    return (
      <Layout fullPage>
        <SEO title="Loading..." description="Loading series" />
        <div className="h-full flex items-center justify-center">
          <GallerySkeleton />
        </div>
      </Layout>
    );
  }

  if (!series) {
    return <NotFound />;
  }

  return (
    <Layout fullPage>
      <SEO
        title={seoTitle}
        description={seoDescription}
        image={series.images[0]?.src}
        type="article"
        structuredData={structuredData}
      />

      {/* Vertical Scroll Navigation */}
      <ScrollNav sections={sections} activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Dynamic Gallery Grids — one per grid chunk */}
      <div className="flex flex-col gap-8 sm:gap-10 lg:gap-14 pb-16">
        {grids.map((gridImages, i) => (
          <motion.section
            key={i}
            id={`section-${series.slug}-${i + 1}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i === 0 ? 0 : 0.15 }}
          >
            <FilmstripGallery images={gridImages} />
          </motion.section>
        ))}
        <ForMoreInstagram />
      </div>
    </Layout>
  );
}
