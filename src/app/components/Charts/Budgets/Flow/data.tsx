export interface BudgetsFlowData {
  nodes: {
    id: string;
    filterStr: string;
    components?: {
      id: string;
      color: string;
      value: number;
      count: number;
      height: number;
    }[];
  }[];
  links: {
    value: number;
    source: string;
    target: string;
  }[];
}

export interface BudgetsFlowProps {
  data: BudgetsFlowData;
  selectedNodeId?: string;
  onNodeClick: (
    node: { id: string; filterStr: string },
    x: number,
    y: number
  ) => void;
}

export interface BudgetsFlowTooltipProps {
  value: number;
  source: string;
  target: string;
}

export interface MobileBudgetsFlowTooltipProps {
  id: string;
  value: number;
  filterStr: string;
  components: {
    id: string;
    color: string;
    value: number;
    height: number;
  }[];
  onClose?: () => void;
  drilldown?: (id: string, filterStr: string) => void;
}
