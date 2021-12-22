import filter from "lodash/filter";

export function getDrilldownPanelOptions(
  links: {
    value: number;
    source: string;
    target: string;
  }[]
): {
  name: string;
  items: string[];
}[] {
  const level1 = filter(links, { source: "Budgets" }).map((l) => l.target);
  const level2: any[] = [];
  level1.forEach((l) => {
    const items = filter(links, { source: l }).map((l1) => l1.target);
    level2.push(...items);
  });
  const level3: any[] = [];
  level2.forEach((l) => {
    const items = filter(links, { source: l }).map((l2) => l2.target);
    level3.push(...items);
  });
  return [
    { name: "Budgets", items: ["Budgets"] },
    {
      name: "Investment Landscape Level 1",
      items: level1,
    },
    {
      name: "Investment Landscape Level 2",
      items: level2,
    },
    {
      name: "Investment Landscape Level 3",
      items: level3,
    },
  ];
}
