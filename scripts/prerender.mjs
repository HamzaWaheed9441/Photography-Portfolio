import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../dist");

const routes = [
  "/",
  "/series/portraits",
  "/series/weddings",
  "/series/street-architectures",
  "/about",
];

async function prerender() {
  // Read the client-built index.html as template
  const template = fs.readFileSync(
    path.resolve(distPath, "index.html"),
    "utf-8"
  );

  // Load JSON data from the built public assets
  const photographer = JSON.parse(
    fs.readFileSync(path.resolve(distPath, "data/photographer.json"), "utf-8")
  );
  const seriesSlugs = ["portraits", "weddings", "street-architectures"];
  const series = seriesSlugs.map((slug) =>
    JSON.parse(
      fs.readFileSync(
        path.resolve(distPath, `data/series/${slug}.json`),
        "utf-8"
      )
    )
  );

  // Import the SSR bundle
  const serverEntry = pathToFileURL(
    path.resolve(distPath, "server/entry-server.js")
  ).href;
  const { render } = await import(serverEntry);

  for (const route of routes) {
    try {
      const { html: appHtml } = render(route, { photographer, series });

      // Inject rendered HTML into the template
      const finalHtml = template.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Determine output path
      const filePath =
        route === "/"
          ? path.resolve(distPath, "index.html")
          : path.resolve(distPath, `${route.slice(1)}/index.html`);

      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, finalHtml);
      console.log(`  Pre-rendered: ${route}`);
    } catch (err) {
      console.warn(`  Warning: Failed to prerender ${route}:`, err.message);
    }
  }

  console.log("\nPre-rendering complete!");
}

prerender().catch(console.error);
