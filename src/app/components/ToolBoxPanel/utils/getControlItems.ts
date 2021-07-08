import get from "lodash/get";
import filter from "lodash/filter";

export interface ViewModel {
  label: string;
  value: string;
  link?: string;
}

const views = {
  investments: [
    {
      label: "Disbursements",
      value: "Disbursements",
      link: "/viz/investments/disbursements",
    },
    {
      label: "Time/Cycle",
      value: "Time/Cycle",
      link: "/viz/investments/time-cycle",
    },
    {
      label: "Map",
      value: "Map",
      link: "/viz/investments/geomap",
    },
    {
      label: "Table",
      value: "Table",
      link: "/viz/investments/table",
    },
  ],
  budgets: [
    {
      label: "Flow",
      value: "Flow",
      link: "/viz/budgets/flow",
    },
    {
      label: "Time/Cycle",
      value: "Time/Cycle",
      link: "/viz/budgets/time-cycle",
    },
  ],
  "pledges-contributions": [
    {
      label: "Map",
      value: "Map",
      link: "/viz/pledges-contributions/geomap",
    },
    {
      label: "Replenishment Periods",
      value: "Replenishment Periods",
      link: "/viz/pledges-contributions/time-cycle",
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
      return { views: [], aggregates: [] };
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
