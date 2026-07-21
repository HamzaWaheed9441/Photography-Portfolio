Markdown
<div align="center">

# Portrait Photographer Portfolio

A professional, performance-optimized portfolio website for portrait photographers, built with modern web technologies and a focus on editorial design, blazing-fast speeds, and rigorous accessibility standards.

[View Live Project](https://hwphotography.gt.tc/)

</div>

---

## 🚀 Features

### Core Gallery Experience
* **Filmstrip Gallery** — Horizontal scrolling gallery with intuitive click-to-center interaction.
* **Keyboard Navigation** — Seamless navigation using arrow keys (left/right), `Home`, and `End`.
* **Auto-Advance** — Optional slideshow mode with intelligent pause on hover/focus (4.5-second intervals).
* **Touch-Optimized** — Native touch scrolling with natural momentum on mobile devices.
* **IntersectionObserver** — Automatic active image detection during manual scrolling.

### Performance Optimization
* **Lazy Loading** — Eager loading for the first 3 images, with intersection-based lazy loading for the rest.
* **Responsive Images** — Multi-resolution `srcSet` integration (800w, 1200w, 1600w).
* **Code Splitting** — Route-based lazy loading utilizing `React.lazy()` and `Suspense`.
* **Hardware Acceleration** — CSS transforms engineered for fluid 60fps scrolling.
* **Loading Skeletons** — Clean animated placeholders displayed during image asset loading.
* **Preconnect** — DNS prefetching configured for rapid image CDN asset delivery.

### Accessibility (WCAG 2.1 AA Compliant)
* **Screen Reader Support** — Semantic HTML structure enhanced with ARIA labels and live regions.
* **Keyboard-Only Navigation** — Full application functionality achievable entirely without a mouse.
* **Focus Management** — Distinct, visible focus indicators across all interactive elements.
* **Touch Targets** — Minimum 44×44px interactive regions for all touch buttons.
* **Reduced Motion** — Built-in compliance respecting the `prefers-reduced-motion` media query.
* **Color Contrast** — Strict adherence to a 4.5:1 minimum ratio for text and 7:1 for captions.

### SEO Optimization
* **Meta & Open Graph** — Unique page titles, descriptions, and social media sharing optimization.
* **Twitter Cards** — Rich previews optimized for Twitter distribution.
* **Structured Data** — Comprehensive JSON-LD schemas for Person, ImageGallery, and ImageObject.
* **Sitemap & Robots** — Complete site structure map and crawling instructions.

### Design System
* **Clean Editorial Aesthetic** — Striking pure white backgrounds paired with true black typography.
* **Typography** — Curated combination of Playfair Display (serif) and Inter (sans-serif).
* **Responsive Layout** — Mobile-first structural design leveraging fluid `clamp()` functions.
* **Design Tokens** — Standardized CSS custom properties to maintain cross-component consistency.

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── gallery/      # Gallery interaction and filmstrip components
│   ├── layout/       # Navigation, footer, and structural layout wrappers
│   ├── about/        # About page layout and biography components
│   └── seo/          # SEO meta tags and schema components
├── pages/            # Route page components
├── context/          # React context for global application state
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces and type definitions
