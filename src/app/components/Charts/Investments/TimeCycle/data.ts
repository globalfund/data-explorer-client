export interface InvestmentsTimeCycleProps {
  type?: string;
  selectedNodeId?: string;
  data: Record<string, unknown>[];
  onNodeClick: (node: string, x: number, y: number) => void;
}
