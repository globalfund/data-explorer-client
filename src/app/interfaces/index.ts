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
