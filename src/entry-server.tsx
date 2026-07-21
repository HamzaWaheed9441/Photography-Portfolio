import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "@/context/PortfolioContext";
import { PhotographerProfile } from "@/types/photographer";
import { PortfolioSeries } from "@/types/gallery";

// Direct imports — no lazy loading for SSR
import Home from "./pages/Home";
import SeriesPage from "./pages/SeriesPage";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

interface RenderOptions {
  photographer: PhotographerProfile;
  series: PortfolioSeries[];
}

export function render(url: string, data: RenderOptions) {
  const html = renderToString(
    <StaticRouter location={url}>
      <PortfolioProvider initialData={data}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series/:slug" element={<SeriesPage />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PortfolioProvider>
    </StaticRouter>
  );

  return { html };
}
