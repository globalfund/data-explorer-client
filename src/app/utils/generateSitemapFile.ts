import { Sitemap } from "app/hooks/useGenerateSitemap";

export const generateXML = (sitemap: Sitemap[]) => {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map(
          (item) => `
        <url>
          <loc>${item.loc}</loc>
          <lastmod>${item.lastmod}</lastmod>
          <changefreq>${item.changefreq}</changefreq>
          <priority>${item.priority}</priority>
        </url>`,
        )
        .join("")}
    </urlset>`;

  const blob = new Blob([xml], { type: "application/xml" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sitemap.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  //   URL.revokeObjectURL(link);
};
