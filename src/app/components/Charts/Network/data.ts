import { InputNode, InputLink } from "@nivo/network";

export interface PerformanceFrameworkData {
  nodes: InputNode[];
  links: InputLink[];
}

export interface NetworkVizProps {
  data: {
    nodes: InputNode[];
    links: InputLink[];
  };
  selectedNodeId?: string;
  onNodeClick: (node: string, x: number, y: number) => void;
}
