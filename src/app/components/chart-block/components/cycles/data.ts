export interface ChartBlockCyclesProps {
  showCycleAll?: boolean;
  selectedCycles: { name: string; value: string }[];
  cycles: { name: string; value: string; disabled?: boolean }[];
  handleCycleChange: (cycle: { name: string; value: string }) => void;
}
