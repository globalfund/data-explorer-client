export interface BreadcrumbModel {
  name: string;
  link?: string;
  menuitems?: React.ReactChild[];
}

export interface DrilldownModel {
  name: string;
}

export interface DrilldownModelUpdated {
  id: string;
  name: string;
  path: string;
  vizSelected?: {
    id: string;
    filterStr: string;
  };
  drilldownVizSelected?: {
    id: string;
    filterStr: string;
  };
}

export interface BudgetsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: BudgetsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}

export interface DisbursementsTreemapDataItem {
  name: string;
  code?: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: DisbursementsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      count: number;
      investment: number;
    }[];
    totalInvestments: {
      committed: number;
      disbursed: number;
      signed: number;
    };
    percValue: string;
  };
}
