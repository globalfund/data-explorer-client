export interface BudgetsFlowData {
  nodes: {
    id: string;
    color: string;
  }[];
  links: {
    value: number;
    source: string;
    target: string;
  }[];
}

export interface BudgetsFlowProps {
  data: BudgetsFlowData;
  selectedNodeId?: string;
  onNodeClick: (node: string, x: number, y: number) => void;
}

export interface BudgetsFlowTooltipProps {
  value: number;
  source: string;
  target: string;
}

export const mockdata: BudgetsFlowData = {
  nodes: [
    {
      id: "Budgets",
      color: "#373D43",
    },
    {
      id: "Capacity Building and Technical Assistance",
      color: "#373D43",
    },
    {
      id: "Communication Material and Publications - CMP",
      color: "#373D43",
    },
    {
      id: "External Professional services - EPS",
      color: "#373D43",
    },
    {
      id: "Health Equipment",
      color: "#373D43",
    },
    {
      id: "Health Products - Equipment - HPE",
      color: "#373D43",
    },
    {
      id: "Health Products - Non-Pharmaceuticals - HPNP",
      color: "#373D43",
    },
    {
      id: "Health Products - Pharmaceutical Products - HPPP",
      color: "#373D43",
    },
    {
      id: "Health Products/Commodities/Equipment and PSM Related Costs",
      color: "#373D43",
    },
    {
      id: "Health products/commodities and PSM related costs",
      color: "#373D43",
    },
    {
      id: "Human Resources - HR",
      color: "#373D43",
    },
    {
      id: "Human Resources including Fiscal Agents",
      color: "#373D43",
    },
    {
      id: "Indirect and Overhead Costs",
      color: "#373D43",
    },
    {
      id: "Infrastructure - INF",
      color: "#373D43",
    },
    {
      id: "Infrastructure and Non-Health Equipment",
      color: "#373D43",
    },
    {
      id: "Living support to client/ target population - LSCTP",
      color: "#373D43",
    },
    {
      id: "Non-health equipment - NHP",
      color: "#373D43",
    },
    {
      id: "Payment for Results",
      color: "#373D43",
    },
    {
      id: "Procurement and Supply-Chain Management costs - PSM",
      color: "#373D43",
    },
    {
      id: "Program Activity Related Costs",
      color: "#373D43",
    },
    {
      id: "Program Management Related Costs",
      color: "#373D43",
    },
    {
      id: "Program related costs",
      color: "#373D43",
    },
    {
      id: "Travel related costs - TRC",
      color: "#373D43",
    },
  ],
  links: [
    {
      source: "Budgets",
      target: "Health Products/Commodities/Equipment and PSM Related Costs",
      value: 12438500604,
    },
    {
      source: "Budgets",
      target: "Program Activity Related Costs",
      value: 5136994648,
    },
    {
      source: "Budgets",
      target: "Program Management Related Costs",
      value: 4921755049,
    },
    {
      source: "Capacity Building and Technical Assistance",
      target: "External Professional services - EPS",
      value: 731637199,
    },
    {
      source: "Health Equipment",
      target: "Health Products - Equipment - HPE",
      value: 778028553,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health Equipment",
      value: 778028553,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health products/commodities and PSM related costs",
      value: 11660472051,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Non-Pharmaceuticals - HPNP",
      value: 4485427363,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Pharmaceutical Products - HPPP",
      value: 4995431128,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Procurement and Supply-Chain Management costs - PSM",
      value: 2179613560,
    },
    {
      source: "Human Resources including Fiscal Agents",
      target: "Human Resources - HR",
      value: 3249719724,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Infrastructure - INF",
      value: 251126127,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Non-health equipment - NHP",
      value: 493984712,
    },
    {
      source: "Program Activity Related Costs",
      target: "Capacity Building and Technical Assistance",
      value: 731637199,
    },
    {
      source: "Program Activity Related Costs",
      target: "Program related costs",
      value: 4405357449,
    },
    {
      source: "Program Management Related Costs",
      target: "Human Resources including Fiscal Agents",
      value: 3249719724,
    },
    {
      source: "Program Management Related Costs",
      target: "Indirect and Overhead Costs",
      value: 926924486,
    },
    {
      source: "Program Management Related Costs",
      target: "Infrastructure and Non-Health Equipment",
      value: 745110839,
    },
    {
      source: "Program related costs",
      target: "Communication Material and Publications - CMP",
      value: 289170898,
    },
    {
      source: "Program related costs",
      target: "Living support to client/ target population - LSCTP",
      value: 493367019,
    },
    {
      source: "Program related costs",
      target: "Payment for Results",
      value: 696204723,
    },
    {
      source: "Program related costs",
      target: "Travel related costs - TRC",
      value: 2926614809,
    },
  ],
};
