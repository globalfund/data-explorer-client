import fs from "fs";
import path from "path";
interface Sitemap {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

export const generateXML = (
  sitemap: Sitemap[],
  outputFilePath = "public/sitemap.xml",
) => {
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

  // Write to disk
  const fullPath = path.resolve(process.cwd(), outputFilePath);
  fs.writeFileSync(fullPath, xml, { encoding: "utf-8" });

  console.log(`Sitemap generated at ${fullPath}`);
};
