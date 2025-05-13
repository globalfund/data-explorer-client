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

export const useGeneratesitemap = () => {
  const grantsData = useStoreState(
    (state) => get(state.GrantList, "data.data", []) as GrantCardProps[]
  );
  const fetchGrantList = useStoreActions((actions) => actions.GrantList.fetch);
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

  const PAGE_SIZE = 500; // Adjust based on what your API can handle
  const getGrantInfo = async (code: string) => {
    const response = await axios.get(
      `${process.env.REACT_APP_API}/grant/${code}`
    );
    return response;
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

  React.useEffect(() => {
    if (grantsData.length > 0) {
      grantsData.map(async (grant) => {
        await getGrantInfo(grant.number).then((response) => {
          const dataGrant = get(response, "data.data[0]", { periods: [] });
          setGrantOverviewsSitemap((prev) => [
            ...prev,
            {
              loc: `${window.location.host}/grant/${grant.number}/${
                dataGrant.periods[dataGrant.periods.length - 1].code
              }/overview`,
              lastmod: isoDate,
              changefreq: "monthly",
              priority: 0.8,
            },
          ]);
        });
      });
    }
  }, [grantsData]);

  const allLocationItems = (
    locationData: LocationItem[],
    locationIds: string[]
  ) => {
    locationData.forEach((item) => {
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
    locationIds.map((id) => {
      setLocationOverviewSitemap((prev) => [
        ...prev,
        {
          loc: `${window.location.host}/location/${id}/overview`,
          lastmod: isoDate,
          changefreq: "monthly",
          priority: 0.8,
        },
      ]);
      return null;
    });
  }, [locationData]);

  const allPaths = [
    ...staticPaths,
    ...locationOverviewSitemap,
    ...grantOverviewsSitemap,
  ];
  if (locationOverviewSitemap.length > 0 && grantOverviewsSitemap.length > 0) {
    generateXML(allPaths);
  }
  // console.log(grantOverviewsSitemap, "grantOverviews");
};
