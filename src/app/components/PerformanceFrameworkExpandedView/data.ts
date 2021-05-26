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
  indicators: PFIndicator[];
  interventions: PFIndicatorResultIntervention[];
}

export const mockdata: PFIndicatorSet[] = [
  {
    name: "Coverage / Output indicator",
    modules: [
      {
        name: "Differentiated HIV Testing Services",
        indicators: [
          {
            name:
              "Number of people who were tested for HIV and received their results during the reporting period",
            results: [
              {
                type: "Percentage",
                baseline: "60%",
                target: "60%",
                result: "60%",
                achievementRate: "60%",
                color: "#FFD646",
                period: "01-01-2019:01-01-2020",
                isReversed: "No",
                aggregationType: "Non cumulative",
                coverage: "National",
                disaggregations: [
                  {
                    name: "Age",
                    values: [
                      {
                        category: "<15",
                        baseline: {
                          numerator: 111,
                          denominator: 0,
                          percentage: null,
                        },
                        reported: {
                          numerator: 111,
                          denominator: 0,
                          percentage: null,
                        },
                      },
                    ],
                  },
                ],
              },
              {
                type: "Percentage",
                baseline: "90%",
                target: "90%",
                result: "90%",
                achievementRate: "90%",
                color: "#11AD6B",
                period: "01-01-2018:01-01-2019",
                isReversed: "No",
                aggregationType: "Non cumulative",
                coverage: "National",
                disaggregations: [],
              },
            ],
          },
        ],
        interventions: [
          {
            name: "Service delivery infrastructure",
            values: [
              {
                name:
                  "Contracts for the work and supervision of the refurbishment of the national reference laboratory (LNR)",
                achievementRate: null,
                valueText:
                  "Tender for works and supervision of the refurbishment  of the national reference laboratory (LNR)",
              },
            ],
          },
        ],
      },
    ],
  },
];
