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

export const expandindicatorsmockdata: PFIndicator[] = [
  {
    name:
      "Percentage of HIV-positive pregnant women who received antiretrovirals to reduce the risk of mother-to-child transmission",
    results: [
      {
        type: "Percentage",
        baseline: "59.3%",
        target: "92%",
        result: "90.6%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2017-07-01:2017-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "59.3%",
        target: "92%",
        result: "102.8%",
        achievementRate: 1.12,
        color: "#97ff46",
        period: "2017-01-01:2017-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "59.3%",
        target: "82%",
        result: "88.5%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-07-01:2016-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "59.3%",
        target: "82%",
        result: "84%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-01-01:2016-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "59.3%",
        target: "73%",
        result: "86.4%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2015-07-01:2015-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
    ],
  },
  {
    name: "Percentage of pregnant women who know their HIV status",
    results: [
      {
        type: "Percentage",
        baseline: "0.62%",
        target: "82%",
        result: "70.8%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2017-07-01:2017-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [
          {
            name: "HIV test status",
            values: [
              {
                category: "Known positive HIV infection at ANC",
                baseline: {
                  numerator: 5106,
                  denominator: 824668,
                  percentage: 0.62,
                },
                reported: {
                  numerator: 736321,
                  denominator: 1040504,
                  percentage: 70.8,
                },
              },
            ],
          },
        ],
      },
      {
        type: "Percentage",
        baseline: "0.62%",
        target: "82%",
        result: "68.5%",
        achievementRate: 0.84,
        color: "#daff46",
        period: "2017-01-01:2017-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [
          {
            name: "HIV test status",
            values: [
              {
                category: "Known positive HIV infection at ANC",
                baseline: {
                  numerator: 5106,
                  denominator: 824668,
                  percentage: 0.62,
                },
                reported: {
                  numerator: 356268,
                  denominator: 520252,
                  percentage: 68.5,
                },
              },
            ],
          },
        ],
      },
      {
        type: "Percentage",
        baseline: "0.62%",
        target: "81.1%",
        result: "73.1%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-07-01:2016-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [
          {
            name: "HIV test status",
            values: [
              {
                category: "Known positive HIV infection at ANC",
                baseline: {
                  numerator: 5106,
                  denominator: 824668,
                  percentage: 0.62,
                },
                reported: {
                  numerator: 737430,
                  denominator: 1008823,
                  percentage: 73.1,
                },
              },
            ],
          },
        ],
      },
      {
        type: "Percentage",
        baseline: "0.62%",
        target: "81.1%",
        result: "72%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-01-01:2016-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [
          {
            name: "HIV test status",
            values: [
              {
                category: "Known positive HIV infection at ANC",
                baseline: {
                  numerator: 5106,
                  denominator: 824668,
                  percentage: 0.62,
                },
                reported: {
                  numerator: 363299,
                  denominator: 504412,
                  percentage: 72,
                },
              },
            ],
          },
        ],
      },
      {
        type: "Percentage",
        baseline: "0.62%",
        target: "77.6%",
        result: "73.8%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2015-07-01:2015-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [
          {
            name: "HIV test status",
            values: [
              {
                category: "Known positive HIV infection at ANC",
                baseline: {
                  numerator: 5106,
                  denominator: 824668,
                  percentage: 0.62,
                },
                reported: {
                  numerator: 726789,
                  denominator: 984372,
                  percentage: 73.8,
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name:
      "Percentage of infants born to HIV-positive women receiving a virological test for HIV within 2 months of birth",
    results: [
      {
        type: "Percentage",
        baseline: "53.6%",
        target: "70%",
        result: "37.5%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2017-07-01:2017-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "53.6%",
        target: "70%",
        result: "36.1%",
        achievementRate: 0.52,
        color: "#ffaa46",
        period: "2017-01-01:2017-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "53.6%",
        target: "65%",
        result: "34.8%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-07-01:2016-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "53.6%",
        target: "60%",
        result: "54.5%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2015-07-01:2015-12-31",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
      {
        type: "Percentage",
        baseline: "53.6%",
        target: "65%",
        result: "29.1%",
        achievementRate: null,
        color: "#E2E2E2",
        period: "2016-01-01:2016-06-30",
        isReversed: "No",
        aggregationType: "Cumulative annually",
        coverage: "National",
        disaggregations: [],
      },
    ],
  },
];

export const expandinterventionsmockdata: PFIndicatorResultIntervention[] = [
  {
    name:
      "Ensure the supervision of community service providers and primary healthcare centers (CSPS) (50% of sites performing poorly) by the District Team each semester",
    values: [
      {
        name: "Prong 3: Preventing vertical HIV transmission",
        achievementRate: null,
        valueText:
          "Analysis each semester by the SR and the PR of the supervision reports",
      },
      {
        name: "Prong 3: Preventing vertical HIV transmission",
        achievementRate: null,
        valueText: "Supervisions carried out",
      },
      {
        name: "Prong 3: Preventing vertical HIV transmission",
        achievementRate: null,
        valueText:
          "Identification, each semester, of CSPS/sites that are performing poorly",
      },
      {
        name: "Prong 3: Preventing vertical HIV transmission",
        achievementRate: null,
        valueText: "Programming of the supervisions made",
      },
      {
        name: "Prong 3: Preventing vertical HIV transmission",
        achievementRate: null,
        valueText: "Completed",
      },
    ],
  },
];
