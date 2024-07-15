import { appColors } from "app/theme";

interface SankeyChartNode {
  name: string;
  level: number;
  itemStyle?: {
    color: string;
  };
}

interface SankeyChartLink {
  value: number;
  source: string;
  target: string;
}

export interface SankeyChartData {
  nodes: SankeyChartNode[];
  links: SankeyChartLink[];
}

export interface SankeyChartProps {
  data: SankeyChartData;
}

export interface SankeyChartTooltipProps extends SankeyChartNode {
  totalValue: number;
  data: SankeyChartData;
}

export const STORY_DATA_VARIANT_1: SankeyChartData = {
  nodes: [
    {
      level: 0,
      name: "Total",
    },
    {
      level: 2,
      name: "Capacity Building and Technical Assistance",
    },
    {
      level: 3,
      name: "Communication Material and Publications - CMP",
    },
    {
      level: 3,
      name: "External Professional services - EPS",
    },
    {
      level: 2,
      name: "Health Equipment",
    },
    {
      level: 3,
      name: "Health Products - Equipment - HPE",
    },
    {
      level: 3,
      name: "Health Products - Non-Pharmaceuticals - HPNP",
    },
    {
      level: 3,
      name: "Health Products - Pharmaceutical Products - HPPP",
    },
    {
      level: 1,
      name: "Health Products/Commodities/Equipment and PSM Related Costs",
      itemStyle: {
        color: "#EA1541",
      },
    },
    {
      level: 2,
      name: "Health products/commodities and PSM related costs",
    },
    {
      level: 3,
      name: "Human Resources - HR",
    },
    {
      level: 2,
      name: "Human Resources including Fiscal Agents",
    },
    {
      level: 2,
      name: "Indirect and Overhead Costs",
    },
    {
      level: 3,
      name: "Infrastructure - INF",
    },
    {
      level: 2,
      name: "Infrastructure and Non-Health Equipment",
    },
    {
      level: 3,
      name: "Living support to client/ target population - LSCTP",
    },
    {
      level: 3,
      name: "Non-health equipment - NHP",
    },
    {
      level: 3,
      name: "Payment for Results",
    },
    {
      level: 3,
      name: "Procurement and Supply-Chain Management costs - PSM",
    },
    {
      level: 1,
      name: "Program Activity Related Costs",
      itemStyle: {
        color: "#F5DC31",
      },
    },
    {
      level: 1,
      name: "Program Management Related Costs",
      itemStyle: {
        color: "#3154F4",
      },
    },
    {
      level: 2,
      name: "Program related costs",
    },
    {
      level: 3,
      name: "Travel related costs - TRC",
    },
  ],
  links: [
    {
      source: "Total",
      target: "Health Products/Commodities/Equipment and PSM Related Costs",
      value: 21057862971.079998,
    },
    {
      source: "Total",
      target: "Program Activity Related Costs",
      value: 8924387776.09,
    },
    {
      source: "Total",
      target: "Program Management Related Costs",
      value: 9014487106.17,
    },
    {
      source: "Capacity Building and Technical Assistance",
      target: "External Professional services - EPS",
      value: 1308872984.64,
    },
    {
      source: "Health Equipment",
      target: "Health Products - Equipment - HPE",
      value: 1661789445.15,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health Equipment",
      value: 1661789445.15,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health products/commodities and PSM related costs",
      value: 19396073525.93,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Non-Pharmaceuticals - HPNP",
      value: 8235849999.26,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Pharmaceutical Products - HPPP",
      value: 7300870157.99,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Procurement and Supply-Chain Management costs - PSM",
      value: 3859353368.68,
    },
    {
      source: "Human Resources including Fiscal Agents",
      target: "Human Resources - HR",
      value: 5616817480.77,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Infrastructure - INF",
      value: 565078298.36,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Non-health equipment - NHP",
      value: 1192321157.79,
    },
    {
      source: "Program Activity Related Costs",
      target: "Capacity Building and Technical Assistance",
      value: 1308872984.64,
    },
    {
      source: "Program Activity Related Costs",
      target: "Program related costs",
      value: 7615514791.45,
    },
    {
      source: "Program Management Related Costs",
      target: "Human Resources including Fiscal Agents",
      value: 5616817480.77,
    },
    {
      source: "Program Management Related Costs",
      target: "Indirect and Overhead Costs",
      value: 1640270169.25,
    },
    {
      source: "Program Management Related Costs",
      target: "Infrastructure and Non-Health Equipment",
      value: 1757399456.15,
    },
    {
      source: "Program related costs",
      target: "Communication Material and Publications - CMP",
      value: 479233220.56999993,
    },
    {
      source: "Program related costs",
      target: "Living support to client/ target population - LSCTP",
      value: 720630999.53,
    },
    {
      source: "Program related costs",
      target: "Payment for Results",
      value: 1319834598.92,
    },
    {
      source: "Program related costs",
      target: "Travel related costs - TRC",
      value: 5095815972.43,
    },
  ],
};

export const STORY_DATA_VARIANT_2: SankeyChartData = {
  nodes: [
    {
      name: "COVID-19",
      level: 1,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Case management, clinical operations and therapeutics",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID diagnostics and testing",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID-19 control and containment including health systems strengthening",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Laboratory systems",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Infection prevention and control, and protection of the health workforce",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Health products and waste management systems",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Risk mitigation for disease programs",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Surveillance systems",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Mitigation for TB programs",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Mitigation for HIV programs",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Surveillance: Epidemiological investigation and contact tracing",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Mitigation for Malaria programs",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Country-level coordination and planning",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "RSSH/PP: Community health workers: Selection, pre-service training and certification",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID-19 CSS: Community-led monitoring",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Risk communication",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID-19 CSS: Community-based organizations institutional capacity building",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "RSSH/PP: Community health workers: In-service training",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID-19 CSS: Social mobilization",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "RSSH/PP: Community health workers: Integrated supportive supervision",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Gender-based violence prevention and post violence care (COVID-19)",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Respond to human rights and gender related barriers to services",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "COVID-19 CSS: Community-led advocacy and research",
      level: 2,
      itemStyle: {
        color: "#252C34",
      },
    },
    {
      name: "Total budget",
      level: 0,
      itemStyle: {
        color: "#252C34",
      },
    },
  ],
  links: [
    {
      source: "Total budget",
      target: "COVID-19",
      value: 5240925580.83,
    },
    {
      source: "COVID-19",
      target: "Case management, clinical operations and therapeutics",
      value: 1157149994.69,
    },
    {
      source: "COVID-19",
      target: "COVID diagnostics and testing",
      value: 603187156.5,
    },
    {
      source: "COVID-19",
      target:
        "COVID-19 control and containment including health systems strengthening",
      value: 579886839.16,
    },
    {
      source: "COVID-19",
      target: "Laboratory systems",
      value: 453280310.69,
    },
    {
      source: "COVID-19",
      target:
        "Infection prevention and control, and protection of the health workforce",
      value: 440643675.6,
    },
    {
      source: "COVID-19",
      target: "Health products and waste management systems",
      value: 377999875.42,
    },
    {
      source: "COVID-19",
      target: "Risk mitigation for disease programs",
      value: 300430143.99,
    },
    {
      source: "COVID-19",
      target: "Surveillance systems",
      value: 258417064.02,
    },
    {
      source: "COVID-19",
      target: "Mitigation for TB programs",
      value: 237200083.37,
    },
    {
      source: "COVID-19",
      target: "Mitigation for HIV programs",
      value: 139074198.83,
    },
    {
      source: "COVID-19",
      target: "Surveillance: Epidemiological investigation and contact tracing",
      value: 123389685.56,
    },
    {
      source: "COVID-19",
      target: "Mitigation for Malaria programs",
      value: 110303023.48,
    },
    {
      source: "COVID-19",
      target: "Country-level coordination and planning",
      value: 75989589.64,
    },
    {
      source: "COVID-19",
      target:
        "RSSH/PP: Community health workers: Selection, pre-service training and certification",
      value: 67460622.95,
    },
    {
      source: "COVID-19",
      target: "COVID-19 CSS: Community-led monitoring",
      value: 59160427.89,
    },
    {
      source: "COVID-19",
      target: "Risk communication",
      value: 47618350.8,
    },
    {
      source: "COVID-19",
      target:
        "COVID-19 CSS: Community-based organizations institutional capacity building",
      value: 47324822.19,
    },
    {
      source: "COVID-19",
      target: "RSSH/PP: Community health workers: In-service training",
      value: 36073879.83,
    },
    {
      source: "COVID-19",
      target: "COVID-19 CSS: Social mobilization",
      value: 34918200.1,
    },
    {
      source: "COVID-19",
      target:
        "RSSH/PP: Community health workers: Integrated supportive supervision",
      value: 34096231.44,
    },
    {
      source: "COVID-19",
      target:
        "Gender-based violence prevention and post violence care (COVID-19)",
      value: 23146180.68,
    },
    {
      source: "COVID-19",
      target: "Respond to human rights and gender related barriers to services",
      value: 21713556.3,
    },
    {
      source: "COVID-19",
      target: "COVID-19 CSS: Community-led advocacy and research",
      value: 12461667.7,
    },
  ],
};
