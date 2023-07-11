export interface BudgetsTimeCycleProps {
  selectedNodeId?: string;
  data: Record<string, unknown>[];
  onNodeClick: (node: string, x: number, y: number) => void;
}
