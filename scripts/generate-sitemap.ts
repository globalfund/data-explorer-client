// scripts/generate-sitemap.ts

import axios, { AxiosResponse } from "axios";
// import { NON_REDIRECT_ROUTES } from "../src/app/router/data";
import { generateXML } from "../src/app/utils/generateSitemapFile.ts";
import get from "lodash/get";
import { RouteObject } from "react-router-dom";
import pLimit from "p-limit";

interface Sitemap {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}

interface LocationItem {
  items?: LocationItem[];
  value: string;
}
export const NON_REDIRECT_ROUTES: RouteObject[] = [
  { path: "/" },
  { path: "/geography" },
  { path: "/grants" },
  { path: "/grant/:id" },
  {
    path: "/grant/:id/:ip",
  },
  { path: "/grant/:id/:ip/:tab" },
  {
    path: "/location/:id",
  },
  { path: "/location/:id/:tab" },
  {
    path: "/resource-mobilization",
  },
  {
    path: "/access-to-funding",
  },
  {
    path: "/financial-insights",
  },
  {
    path: "/annual-results",
  },
];
const isoDate = new Date().toISOString();
const API_BASE = process.env.REACT_APP_API || "http://localhost:4200";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3000";

const PAGE_SIZE = 100;

const extractStaticPaths = (
  routes: any[],
  paths: Sitemap[] = [],
): Sitemap[] => {
  for (const route of routes) {
    if (route.path?.includes(":") || route.path?.includes("*")) continue;
    paths.push({
      loc: `${BASE_URL}${route.path}`,
      lastmod: isoDate,
      changefreq: "monthly",
      priority: 0.8,
    });
    if (route.children) extractStaticPaths(route.children, paths);
  }
  return paths;
};
const getGrantsCount = async () => {
  const { data } = await axios.get(`${API_BASE}/grants/1/all`);
  return get(data, "count", 0);
};

const fetchGrantsPerPage = async (
  pageCount: number,
): Promise<AxiosResponse<any>> => {
  return await axios.get(`${API_BASE}/grants/${pageCount}/${PAGE_SIZE}`);
};

const fetchAllGrants = async () => {
  const total = await getGrantsCount();
  if (!total) return [];
  const pages = Math.ceil(total / PAGE_SIZE);
  console.log(`Total grants: ${total}, Pages: ${pages}`);

  const allGrants: any[] = [];
  for (let page = 1; page <= pages; page++) {
    const grants = await fetchGrantsPerPage(page);
    console.log(get(grants, "data.data", []).length, " grants fetched");
    allGrants.push(...get(grants, "data.data", []));
  }
  console.log(`Total grants fetched: ${allGrants.length}`);
  return allGrants;
};

const fetchGrantDetails = async (grantNumber: string) => {
  const res = await axios.get(`${API_BASE}/grant/${grantNumber}`);
  return get(res, "data.data[0]", { periods: [] });
};

const fetchAllLocations = async () => {
  console.log("Fetching all locations...");
  const res = await axios.get(`${API_BASE}/geographies`);
  return get(res, "data.data", []);
};

const flattenLocationIds = (items: LocationItem[], ids: string[] = []) => {
  for (const item of items) {
    if (item.items && item.items.length > 0) {
      flattenLocationIds(item.items, ids);
    } else {
      ids.push(item.value);
    }
  }
  return ids;
};

const main = async () => {
  console.log("Generating sitemap...");

  const staticPaths = extractStaticPaths(NON_REDIRECT_ROUTES);

  const grants = await fetchAllGrants();
  const limit = pLimit(10);
  const grantOverviews: Sitemap[] = await Promise.all(
    grants.map((grant: any) =>
      limit(async () => {
        console.log(`Processing grant: ${grant.number}`);
        const details = await fetchGrantDetails(grant.number);
        const periods = details.periods || [];
        const latestCode = periods.length
          ? periods[periods.length - 1].code
          : "unknown";

        return {
          loc: `${BASE_URL}/grant/${grant.number}/${latestCode}/overview`,
          lastmod: isoDate,
          changefreq: "monthly",
          priority: 0.8,
        };
      }),
    ),
  );

  const locations = await fetchAllLocations();
  const locationIds = flattenLocationIds(locations);
  const locationOverviews = locationIds.map((id) => ({
    loc: `${BASE_URL}/location/${id}/overview`,
    lastmod: isoDate,
    changefreq: "monthly",
    priority: 0.8,
  }));

  const sitemapEntries = [
    ...staticPaths,
    ...grantOverviews,
    ...locationOverviews,
  ];
  generateXML(sitemapEntries);

  console.log("✅ Sitemap generated successfully.");
};

main().catch((e) => {
  console.error("❌ Sitemap generation failed:", e);
  process.exit(1);
});
