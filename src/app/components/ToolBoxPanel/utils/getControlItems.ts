import get from "lodash/get";
import filter from "lodash/filter";

export interface ViewModel {
  label: string;
  value: string;
  link?: string;
}

const views = {
  disbursements: [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/explore/disbursements/treemap",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/explore/disbursements/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/explore/disbursements/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/explore/disbursements/table",
    },
  ],
  signed: [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/explore/signed/treemap",
    },
    // {
    //   label: "Time cycle",
    //   value: "Time cycle",
    //   link: "/explore/signed/time-cycle",
    // },
    {
      label: "Map",
      value: "Map",
      link: "/explore/signed/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/explore/signed/table",
    },
  ],
  commitment: [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/explore/commitment/treemap",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/explore/commitment/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/explore/commitment/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/explore/commitment/table",
    },
  ],
  budgets: [
    {
      label: "Flow",
      value: "Flow",
      link: "/explore/budgets/flow",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/explore/budgets/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/explore/budgets/map",
    },
  ],
  eligibility: [
    {
      label: "Chart",
      value: "Chart",
      link: "/explore/eligibility",
    },
    {
      label: "Table",
      value: "Table",
      link: "/explore/eligibility/table",
    },
  ],
  allocations: [
    {
      label: "Radial",
      value: "Radial",
      link: "/explore/allocations",
    },
    {
      label: "Map",
      value: "Map",
      link: "/explore/allocations/map",
    },
  ],
  grants: [
    {
      label: "Chart",
      value: "Chart",
      link: "/explore/grants",
    },
    {
      label: "List",
      value: "List",
      link: "/explore/grants/list",
    },
  ],
  "pledges-contributions": [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/explore/pledges-contributions/treemap",
    },
    {
      label: "Replenishment Periods",
      value: "Replenishment Periods",
      link: "/explore/pledges-contributions/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/explore/pledges-contributions/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/explore/pledges-contributions/table",
    },
  ],
};

const aggregates = {
  // investments: [
  //   {
  //     label: "Components",
  //     value: "Components",
  //   },
  //   {
  //     label: "Partners",
  //     value: "Partners",
  //   },
  //   {
  //     label: "Locations",
  //     value: "Locations",
  //   },
  //   {
  //     label: "Grants",
  //     value: "Grants",
  //   },
  // ],
  // budgets: [
  //   {
  //     label: "Components",
  //     value: "Components",
  //   },
  //   {
  //     label: "Locations",
  //     value: "Locations",
  //   },
  // ],
  eligibility: [
    {
      label: "Components",
      value: "componentName",
    },
    {
      label: "Locations",
      value: "geographicAreaName",
    },
  ],
};

export function getControlItems(
  vizType: string,
  pathname: string,
  detailPageCode?: string,
  grantDetailPeriod?: string
): {
  views: ViewModel[];
  aggregates: ViewModel[];
} {
  if (detailPageCode) {
    const detailPageParam = pathname.split("/")[1];
    let alteredViews = get(views, vizType, []).map((view: ViewModel) => ({
      ...view,
      link: view.link
        ? view.link.replace(
            "explore",
            `${detailPageParam}/${detailPageCode}${
              grantDetailPeriod ? `/${grantDetailPeriod}` : ""
            }`
          )
        : view.link,
    }));
    if (detailPageParam === "grant") {
      alteredViews = filter(
        alteredViews,
        (view: ViewModel) => view.label !== "Map"
      );
    }
    if (vizType === "eligibility") {
      return { views: alteredViews, aggregates: [] };
    }
    return {
      views: alteredViews,
      aggregates: get(aggregates, vizType, []),
    };
  }
  if (pathname.indexOf("/explore/grants") > -1) {
    return {
      views: [],
      aggregates: [],
    };
  }
  return {
    views: get(views, vizType, []),
    aggregates: get(aggregates, vizType, []),
  };
}
