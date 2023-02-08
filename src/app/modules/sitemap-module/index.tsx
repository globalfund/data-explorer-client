import React from "react";
import {
  grantsPath,
  partnersPaths,
  countryDetailsPaths,
} from "app/modules/sitemap-module/dynamicPaths";

export default function SitemapModule() {
  const baseUrl = "https://data.theglobalfund.org/";
  const staticPaths = [
    baseUrl,
    baseUrl + "about",
    baseUrl + "datasets",
    baseUrl + "grants",
    baseUrl + "results",
    baseUrl + "documents",
    baseUrl + "viz/pledges-contributions/treemap",
    baseUrl + "viz/eligibility",
    baseUrl + "viz/allocations",
    baseUrl + "viz/signed/treemap",
    baseUrl + "viz/commitment/treemap",
    baseUrl + "viz/disbursements/treemap",
    baseUrl + "viz/budgets/flow",
  ];
  const [allPaths, setAllPaths] = React.useState([...staticPaths]);

  React.useEffect(() => {
    (async () => {
      const countryDetails = await countryDetailsPaths();
      const partners = await partnersPaths();
      const grants = await grantsPath();
      setAllPaths([...allPaths, ...countryDetails, ...partners, ...grants]);
    })();
  }, []);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPaths
        .map((url) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>1.0</priority>
            </url>
          `;
        })
        .join("\n")}
    </urlset>
  `;

  return <pre>{sitemap}</pre>;
}
