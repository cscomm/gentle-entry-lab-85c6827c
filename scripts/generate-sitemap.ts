import { writeFileSync } from "fs";
import { resolve } from "path";
import { routes } from "./prerender";

const BASE_URL = "https://silica.co.kr";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

// Build entries from prerender routes + root
const changefreqByPath = (path: string): SitemapEntry["changefreq"] => {
  if (path === "/") return "weekly";
  if (path === "/about") return "weekly";
  if (path.startsWith("/products/")) return "monthly";
  if (path === "/board") return "daily";
  return "yearly";
};

const priorityByPath = (path: string): string => {
  if (path === "/") return "1.0";
  if (path === "/about") return "0.9";
  if (path === "/products/fused-silica-block" || path === "/products/fused-silica-sand" || path === "/products/fused-silica-powder" || path === "/products/high-purity-quartz" || path === "/products/silica-gel") return "0.8";
  if (path.startsWith("/products/")) return "0.7";
  if (path === "/board") return "0.7";
  return "0.3";
};

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  ...routes.map((route) => ({
    path: route.path,
    changefreq: changefreqByPath(route.path),
    priority: priorityByPath(route.path),
  })),
];

function generateSitemap(entries: SitemapEntry[]) {
  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
  ].join("\n");
}

const outputPath = resolve("public", "sitemap.xml");
writeFileSync(outputPath, generateSitemap(entries));
console.log(`[sitemap] generated ${entries.length} entries → ${outputPath}`);
