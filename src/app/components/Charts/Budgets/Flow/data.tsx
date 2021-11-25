export interface BudgetsFlowData {
  nodes: {
    id: string;
    filterStr: string;
    components?: {
      id: string;
      color: string;
      value: number;
      height: number;
    }[];
  }[];
  links: {
    value: number;
    source: string;
    target: string;
  }[];
}

export interface BudgetsFlowProps {
  data: BudgetsFlowData;
  vizCompData: any;
  setVizCompData: (vizCompData: any) => void;
  selectedNodeId?: string;
  onNodeClick: (
    node: { id: string; filterStr: string },
    x: number,
    y: number
  ) => void;
}

export interface BudgetsFlowTooltipProps {
  value: number;
  source: string;
  target: string;
  onClose?: () => void;
  drilldown?: () => void;
}

export interface MobileBudgetsFlowTooltipProps {
  id: string;
  value: number;
  filterStr: string;
  components: {
    id: string;
    color: string;
    value: number;
    height: number;
  }[];
  onClose?: () => void;
  drilldown?: (id: string, filterStr: string) => void;
}

export const mockdata: BudgetsFlowData = {
  nodes: [
    {
      id: "Budgets",
      filterStr: "activityArea/activityAreaParent/activityAreaName ne null",
    },
    {
      id: "Capacity Building and Technical Assistance",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Capacity Building and Technical Assistance'",
    },
    {
      id: "Communication Material and Publications - CMP",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Communication Material and Publications (CMP)'",
    },
    {
      id: "External Professional services - EPS",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'External Professional services (EPS)'",
    },
    {
      id: "Health Equipment",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Health Equipment'",
    },
    {
      id: "Health Products - Equipment - HPE",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Health Products - Equipment (HPE)'",
    },
    {
      id: "Health Products - Non-Pharmaceuticals - HPNP",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Health Products - Non-Pharmaceuticals (HPNP)'",
    },
    {
      id: "Health Products - Pharmaceutical Products - HPPP",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Health Products - Pharmaceutical Products (HPPP)'",
    },
    {
      id: "Health Products/Commodities/Equipment and PSM Related Costs",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryParent/budgetCategoryName eq 'Health Products/Commodities/Equipment and PSM Related Costs'",
    },
    {
      id: "Health products/commodities and PSM related costs",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Health products/commodities and PSM related costs'",
    },
    {
      id: "Human Resources - HR",
      filterStr: "budgetCategory/budgetCategoryName eq 'Human Resources (HR)'",
    },
    {
      id: "Human Resources including Fiscal Agents",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Human Resources including Fiscal Agents'",
    },
    {
      id: "Indirect and Overhead Costs",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Indirect and Overhead Costs'",
    },
    {
      id: "Infrastructure - INF",
      filterStr: "budgetCategory/budgetCategoryName eq 'Infrastructure (INF)'",
    },
    {
      id: "Infrastructure and Non-Health Equipment",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Infrastructure and Non-Health Equipment'",
    },
    {
      id: "Living support to client/ target population - LSCTP",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Living support to client/ target population (LSCTP)'",
    },
    {
      id: "Non-health equipment - NHP",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Non-health equipment (NHP)'",
    },
    {
      id: "Payment for Results",
      filterStr: "budgetCategory/budgetCategoryName eq 'Payment for Results'",
    },
    {
      id: "Procurement and Supply-Chain Management costs - PSM",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Procurement and Supply-Chain Management costs (PSM)'",
    },
    {
      id: "Program Activity Related Costs",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryParent/budgetCategoryName eq 'Program Activity Related Costs'",
    },
    {
      id: "Program Management Related Costs",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryParent/budgetCategoryName eq 'Program Management Related Costs'",
    },
    {
      id: "Program related costs",
      filterStr:
        "budgetCategory/budgetCategoryParent/budgetCategoryName eq 'Program related costs'",
    },
    {
      id: "Travel related costs - TRC",
      filterStr:
        "budgetCategory/budgetCategoryName eq 'Travel related costs (TRC)'",
    },
  ],
  links: [
    {
      source: "Budgets",
      target: "Health Products/Commodities/Equipment and PSM Related Costs",
      value: 12824576032,
    },
    {
      source: "Budgets",
      target: "Program Activity Related Costs",
      value: 5331759051,
    },
    {
      source: "Budgets",
      target: "Program Management Related Costs",
      value: 5035722399,
    },
    {
      source: "Capacity Building and Technical Assistance",
      target: "External Professional services - EPS",
      value: 735040320,
    },
    {
      source: "Health Equipment",
      target: "Health Products - Equipment - HPE",
      value: 789909771,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health Equipment",
      value: 789909771,
    },
    {
      source: "Health Products/Commodities/Equipment and PSM Related Costs",
      target: "Health products/commodities and PSM related costs",
      value: 12034666261,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Non-Pharmaceuticals - HPNP",
      value: 4613327558,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Health Products - Pharmaceutical Products - HPPP",
      value: 5178426365,
    },
    {
      source: "Health products/commodities and PSM related costs",
      target: "Procurement and Supply-Chain Management costs - PSM",
      value: 2242912338,
    },
    {
      source: "Human Resources including Fiscal Agents",
      target: "Human Resources - HR",
      value: 3313760181,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Infrastructure - INF",
      value: 263087745,
    },
    {
      source: "Infrastructure and Non-Health Equipment",
      target: "Non-health equipment - NHP",
      value: 529619181,
    },
    {
      source: "Program Activity Related Costs",
      target: "Capacity Building and Technical Assistance",
      value: 735040320,
    },
    {
      source: "Program Activity Related Costs",
      target: "Program related costs",
      value: 4596718731,
    },
    {
      source: "Program Management Related Costs",
      target: "Human Resources including Fiscal Agents",
      value: 3313760181,
    },
    {
      source: "Program Management Related Costs",
      target: "Indirect and Overhead Costs",
      value: 929255292,
    },
    {
      source: "Program Management Related Costs",
      target: "Infrastructure and Non-Health Equipment",
      value: 792706926,
    },
    {
      source: "Program related costs",
      target: "Communication Material and Publications - CMP",
      value: 304313388,
    },
    {
      source: "Program related costs",
      target: "Living support to client/ target population - LSCTP",
      value: 493711962,
    },
    {
      source: "Program related costs",
      target: "Payment for Results",
      value: 703161005,
    },
    {
      source: "Program related costs",
      target: "Travel related costs - TRC",
      value: 3095532376,
    },
  ],
};
