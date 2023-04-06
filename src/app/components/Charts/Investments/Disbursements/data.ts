import { TreeMapNodeDatum } from "@nivo/treemap";

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

export interface DisbursementsTreemapProps {
  selectedNodeId?: string;
  isChildTreemap?: boolean;
  isDrilldownTreemap?: boolean;
  data: DisbursementsTreemapDataItem[];
  xsTooltipData?: TreeMapNodeDatum | null;
  parentNodeCoords?: { x: number; y: number };
  setXsTooltipData?: (data: TreeMapNodeDatum | null) => void;
  onNodeClick: (node: string, x: number, y: number, code?: string) => void;
  onCountryNameClick?: (node: any) => void;
}

export interface TreemapTooltipProps {
  node: TreeMapNodeDatum;
  tooltipKeyLabel?: string;
  tooltipValueLabel?: string;
}
