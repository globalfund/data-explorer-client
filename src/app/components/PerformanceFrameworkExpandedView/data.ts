export interface PFIndicatorResultInterventionValue {
  name: string;
  achievementRate: number | null;
  valueText: string;
}

export interface PFIndicatorResultIntervention {
  name: string;
  values: PFIndicatorResultInterventionValue[];
}

export interface PFIndicatorResultDisaggregationValue {
  numerator: number | null;
  denominator: number | null;
  percentage: number | null;
}

export interface PFIndicatorResultDisaggregation {
  category: string;
  baseline: PFIndicatorResultDisaggregationValue;
  reported: PFIndicatorResultDisaggregationValue;
}

export interface PFIndicatorResultDisaggregationGroup {
  name: string;
  values: PFIndicatorResultDisaggregation[];
}

export interface PFIndicatorResult {
  type: string;
  baseline: string | number | null;
  target: string | number | null;
  result: string | number | null;
  achievementRate: number | string | null;
  color: string;
  period: string;
  isReversed: string;
  aggregationType: string;
  coverage: string;
  disaggregations: PFIndicatorResultDisaggregationGroup[];
}

export interface PFIndicator {
  name: string;
  results: PFIndicatorResult[];
}

export interface PFModule {
  name: string;
  indicators: PFIndicator[];
  interventions: PFIndicatorResultIntervention[];
}

export interface PFIndicatorSet {
  name: string;
  modules: PFModule[];
}

export interface PerformanceFrameworkExpandedViewProps {
  allModules: {
    module: string;
    filterValue: string;
  }[];
  selectedModule?: string;
  indicators: PFIndicator[];
  setSelectedModule: (value: string) => void;
  interventions: PFIndicatorResultIntervention[];
}
