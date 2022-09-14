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
      link: "/viz/disbursements/treemap",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/viz/disbursements/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/disbursements/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/disbursements/table",
    },
  ],
  signed: [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/viz/signed/treemap",
    },
    // {
    //   label: "Time cycle",
    //   value: "Time cycle",
    //   link: "/viz/signed/time-cycle",
    // },
    {
      label: "Map",
      value: "Map",
      link: "/viz/signed/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/signed/table",
    },
  ],
  commitment: [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/viz/commitment/treemap",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/viz/commitment/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/commitment/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/commitment/table",
    },
  ],
  budgets: [
    {
      label: "Flow",
      value: "Flow",
      link: "/viz/budgets/flow",
    },
    {
      label: "Time cycle",
      value: "Time cycle",
      link: "/viz/budgets/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/budgets/map",
    },
  ],
  eligibility: [
    {
      label: "Chart",
      value: "Chart",
      link: "/viz/eligibility",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/eligibility/table",
    },
  ],
  allocations: [
    {
      label: "Radial",
      value: "Radial",
      link: "/viz/allocations",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/allocations/map",
    },
  ],
  grants: [
    {
      label: "Chart",
      value: "Chart",
      link: "/viz/grants",
    },
    {
      label: "List",
      value: "List",
      link: "/viz/grants/list",
    },
  ],
  "pledges-contributions": [
    {
      label: "Treemap",
      value: "Treemap",
      link: "/viz/pledges-contributions/treemap",
    },
    {
      label: "Replenishment Periods",
      value: "Replenishment Periods",
      link: "/viz/pledges-contributions/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/pledges-contributions/map",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/pledges-contributions/table",
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
            "viz",
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
  return {
    views: get(views, vizType, []),
    aggregates: get(aggregates, vizType, []),
  };
}
