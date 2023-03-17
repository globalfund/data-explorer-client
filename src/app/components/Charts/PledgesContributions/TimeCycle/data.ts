export interface PledgesContributionsProps {
  vizCompData: any;
  selectedNodeId?: string;
  data: Record<string, unknown>[];
  setVizCompData: (vizCompData: any) => void;
  onNodeClick: (node: string, x: number, y: number) => void;
}

export interface PledgesContributionsTreemapDataItem {
  name: string;
  value: number;
  formattedValue: string;
  color: string;
  _children?: PledgesContributionsTreemapDataItem[];
  tooltip: {
    header: string;
    componentsStats: {
      name: string;
      value: number;
    }[];
    value: number;
  };
}
