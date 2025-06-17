/**
 * Hook for dynamically generating a sitemap for the application.
 *
 * This hook is responsible for creating a sitemap that includes both static and dynamic paths.
 * The static paths are extracted from the application's route configuration, while the dynamic
 * paths are generated based on data fetched from the API (e.g., grants and locations).
 *
 * **Important Notes:**
 * - Static paths are dynamically loaded from the application's route configuration.
 *   Developers must ensure that all dynamic paths are accounted for, especially when new
 *   routes or features are added to the application.
 * - This hook is designed to be run once. After execution, a sitemap file will be generated
 *   and downloaded. The generated sitemap file should then be manually added to the public
 *   folder of the application to make it accessible.
 *
 * **How It Works:**
 * - Static paths are extracted from the `NON_REDIRECT_ROUTES` configuration.
 * - Dynamic paths for grants and locations are fetched from the API in a paginated manner.
 * - The hook ensures that all grants and locations are processed before generating the final sitemap.
 * - The sitemap is generated in XML format using the `generateXML` utility function.
 *
 * **Dependencies:**
 * - Relies on the application's state management to fetch data for grants and locations.
 * - Uses `axios` for API requests and `lodash/get` for safely accessing nested properties.
 *
 * **Output:**
 * - A complete sitemap containing static paths, grant overview paths, and location overview paths.
 */
import { GrantCardProps } from "app/components/grant-card/data";
import { GeoCategoryProps } from "app/pages/geography/data";
import { NON_REDIRECT_ROUTES } from "app/router/data";
import { useStoreActions, useStoreState } from "app/state/store/hooks";
import { generateXML } from "app/utils/generateSitemapFile";
import axios from "axios";
import get from "lodash/get";
import React from "react";
import { RouteObject } from "react-router-dom";

export interface Sitemap {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: number;
}
interface LocationItem {
  items?: LocationItem[];
  value: string;
}
const isoDate = new Date().toISOString();

const extractStaticPaths = (
  routes: RouteObject[],
  paths: Sitemap[]
): Sitemap[] => {
  for (const route of routes) {
    if (route.path?.includes(":") || route.path?.includes("*")) continue;
    const path = {
      loc: `${window.location.host}${route.path}`,
      lastmod: isoDate,
      changefreq: "monthly",
      priority: 0.8,
    };
    paths.push(path as Sitemap);
    if (route.children) {
      paths.push(...extractStaticPaths(route.children, paths));
    }
  }
  return paths;
};

export const useGenerateSitemap = () => {
  const grantsData = useStoreState(
    (state) => get(state.GrantList, "data.data", []) as GrantCardProps[]
  );
  const fetchGrantList = useStoreActions((actions) => actions.GrantList.fetch);
  const [isInitialGrantListFetch, setIsInitialGrantListFetch] =
    React.useState(true);
  const count = useStoreState((state) => get(state.GrantList, "data.count", 0));
  const staticPaths = extractStaticPaths(NON_REDIRECT_ROUTES, []);
  const fetchLocationList = useStoreActions(
    (actions) => actions.GeographyList.fetch
  );
  const locationData = useStoreState(
    (state) => get(state.GeographyList, "data.data", []) as GeoCategoryProps[]
  );
  const [grantOverviewsSitemap, setGrantOverviewsSitemap] = React.useState<
    Sitemap[]
  >([]);
  const [locationOverviewSitemap, setLocationOverviewSitemap] = React.useState<
    Sitemap[]
  >([]);
  const [allGrantsFetched, setAllGrantsFetched] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const PAGE_SIZE = 100;
  const getGrantInfo = async (code: string) => {
    return await axios.get(`${process.env.REACT_APP_API}/grant/${code}`);
  };

  // Fetch grants page by page
  React.useEffect(() => {
    if (count > 0 && currentPage <= Math.ceil(count / PAGE_SIZE)) {
      fetchGrantList({
        routeParams: {
          page: `${currentPage}`,
          pageSize: `${PAGE_SIZE}`,
        },
      });
    } else if (count > 0 && currentPage > Math.ceil(count / PAGE_SIZE)) {
      setAllGrantsFetched(true);
    }
  }, [currentPage, count]);

  // Get initial count and fetch locations
  React.useEffect(() => {
    fetchGrantList({
      routeParams: {
        page: "1",
        pageSize: "1", // Just to get the count
      },
    });
    fetchLocationList({});
  }, []);

  // Process grants when new data arrives
  React.useEffect(() => {
    if (isInitialGrantListFetch && count > 0) {
      setIsInitialGrantListFetch(false);
      setCurrentPage(1);
    }
    if (grantsData.length > 0 && !isInitialGrantListFetch) {
      Promise.all(
        grantsData.map(async (grant) => {
          const response = await getGrantInfo(grant.number);
          const dataGrant = get(response, "data.data[0]", { periods: [] });
          return {
            loc: `${window.location.host}/grant/${grant.number}/${
              dataGrant.periods[dataGrant.periods.length - 1].code
            }/overview`,
            lastmod: isoDate,
            changefreq: "monthly",
            priority: 0.8,
          };
        })
      ).then((newGrantSitemaps) => {
        setGrantOverviewsSitemap((prev) => [...prev, ...newGrantSitemaps]);
        setTimeout(() => {
          // Delay to avoid overwhelming the server
          setCurrentPage((prev) => prev + 1);
        }, 1000);
      });
    }
  }, [grantsData]);

  const allLocationItems = (locData: LocationItem[], locationIds: string[]) => {
    locData.forEach((item) => {
      if (item.items && item.items.length > 0) {
        allLocationItems(item.items, locationIds);
      } else {
        locationIds.push(item.value);
      }
    });
    return locationIds;
  };
  React.useEffect(() => {
    const locationIds = allLocationItems(locationData, []);
    locationIds.forEach((id) => {
      setLocationOverviewSitemap((prev) => [
        ...prev,
        {
          loc: `${window.location.host}/location/${id}/overview`,
          lastmod: isoDate,
          changefreq: "monthly",
          priority: 0.8,
        },
      ]);
    });
  }, [locationData]);

  // Generate sitemap only when all data is fetched
  React.useEffect(() => {
    if (
      locationOverviewSitemap.length > 0 &&
      allGrantsFetched &&
      grantOverviewsSitemap.length === count
    ) {
      const allPaths = [
        ...staticPaths,
        ...locationOverviewSitemap,
        ...grantOverviewsSitemap,
      ];
      generateXML(allPaths);
    }
  }, [locationOverviewSitemap, grantOverviewsSitemap, allGrantsFetched, count]);
};
