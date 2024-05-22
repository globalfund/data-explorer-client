export interface ChartBlockCyclesProps {
  cycles: { name: string; value: string }[];
  selectedCycle: { name: string; value: string };
  handleCycleChange: (cycle: { name: string; value: string }) => void;
}
