export interface ChartBlockCyclesProps {
  cycles: { name: string; value: string }[];
  selectedCycles: { name: string; value: string }[];
  handleCycleChange: (cycle: { name: string; value: string }) => void;
  showCycleAll?: boolean;
}
