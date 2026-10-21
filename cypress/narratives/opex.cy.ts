/// <reference types="cypress" />

const api = "http://api.test";
const narrativeUrl = `${api}/narratives/pages/opex/global?locale=en&scope_key=default`;
const topics = [
  "budget_position",
  "efficiency",
  "vs_disbursement",
  "actual_vs_budget",
  "cost_breakdown",
  "key_costs",
  "indexed_trends",
  "cost_table",
];
const panel = (topic: string) => cy.get(`[data-narrative-id="opex.${topic}"]`);
const shown = (...names: string[]) =>
  names.forEach((name) => panel(name).should("exist"));
const hidden = (...names: string[]) =>
  names.forEach((name) => panel(name).should("not.exist"));
const others = (topic: string) => topics.filter((name) => name !== topic);
const years = ["2024", "2025", "2026"];
const stub = () => {
  cy.intercept("GET", "http://cms.test/**", { body: { data: [] } });
  cy.intercept("GET", `${api}/**`, (req) => {
    const path = new URL(req.url).pathname;
    const replies: Record<string, unknown> = {
      "/opex/years": { startYear: 2017, endYear: 2026 },
      "/opex/efficiency/pledge": {
        items: [
          {
            name: "2023-2025",
            gcNumber: "GC7",
            efficiency: 6.44,
            pledge: 15700,
            actual: 1011,
            disbursement: 0,
          },
        ],
      },
      "/opex/efficiency/disbursement": {
        cumulativeEfficiency: 8.9,
        cumulativeActual: 346,
        cumulativeDisbursement: 3888,
        items: [
          {
            name: "2025",
            gcNumber: "GC7",
            efficiency: 8.9,
            pledge: 0,
            actual: 346,
            disbursement: 3888,
          },
        ],
      },
      "/opex/cost-composition": {
        years,
        categories: ["Workforce", "Travel"],
        values: years.map(() => [170, 20]),
      },
      "/opex/key-costs": {
        years,
        items: [
          {
            name: "Workforce",
            values: [165, 170, 177],
            endYearBudget: 177,
            growthPercentage: 7.27,
            endYearBudgetPercentage: 57.04,
            actualPercentageValues: [55, 56, 57.04],
            startYearBudgetPercentage: 55,
          },
        ],
      },
      "/opex/indexed-trends": {
        years,
        data: [{ name: "Workforce", data: [100, 103, 107] }],
      },
      "/opex/table": {
        years,
        data: [
          {
            name: "Total operating costs",
            ...Object.fromEntries(
              years.map((year) => [
                year,
                { actual: 346, budget: 346, variance: 0 },
              ]),
            ),
          },
        ],
      },
    };
    const body = path.startsWith("/opex/operating-costs/")
      ? {
          xAxisValues: years,
          actualsLineYValues: [330, 346, 150],
          budgetsLineYValues: [340, 346, 310.3],
        }
      : (replies[path] ?? { count: 0, data: [] });
    req.reply({ body });
  });
  cy.intercept("GET", narrativeUrl, {
    fixture: "narratives/opex-page.json",
  }).as("saved");
};
const visit = () => {
  cy.visit("/opex");
  cy.wait("@saved");
};
const view = (block: string, name: string) =>
  cy
    .get(`#${block}`)
    .contains("button", new RegExp(`^${name}$`))
    .click({ force: true });

describe("OPEX saved narratives", () => {
  beforeEach(() => {
    cy.on("uncaught:exception", (error) => {
      if (
        error.message.includes(
          "ResizeObserver loop completed with undelivered notifications.",
        )
      )
        return false;
    });
  });
  it("places the summary and eight sections in their blocks with one shared GET", () => {
    stub();
    visit();
    panel("summary").should("exist");
    shown(...topics);
    panel("summary").then(($summary) =>
      panel("budget_position").then(($first) =>
        expect(
          $summary[0].compareDocumentPosition($first[0]) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).to.be.greaterThan(0),
      ),
    );
    cy.contains("2026 OPERATING BUDGET").then(($heading) =>
      panel("budget_position").then(($panel) =>
        expect(
          $heading[0].compareDocumentPosition($panel[0]) &
            Node.DOCUMENT_POSITION_FOLLOWING,
        ).to.be.greaterThan(0),
      ),
    );
    for (const [topic, block] of [
      ["efficiency", "opex-efficiency"],
      ["vs_disbursement", "opex-vs-grant-disbursement"],
      ["actual_vs_budget", "operating-costs"],
      ["cost_breakdown", "cost-composition"],
      ["key_costs", "key-costs"],
      ["indexed_trends", "indexed-trends"],
      ["cost_table", "cost-breakdown"],
    ]) {
      cy.get(`#${block}`)
        .find(`[data-narrative-id="opex.${topic}"]`)
        .should("have.length", 1);
    }
    cy.get('[data-cy="narrative-section"]').should(
      "have.length",
      topics.length + 1,
    );
    panel("summary").should("contain.text", "Available topics:");
    cy.get("@saved.all").should("have.length", 1);
  });
  for (const [block, topic, other, initial] of [
    ["operating-costs", "actual_vs_budget", "Workforce", "Total OPEX"],
    ["operating-costs", "actual_vs_budget", "Non-workforce", "Total OPEX"],
    ["cost-composition", "cost_breakdown", "% share", "USD millions"],
    ["key-costs", "key_costs", "Share of total", "Per line"],
    ["cost-breakdown", "cost_table", "Budget", "Actual"],
    ["cost-breakdown", "cost_table", "Variance", "Actual"],
  ]) {
    it(`hides ${topic} for the ${other} view and restores it on ${initial}`, () => {
      stub();
      visit();
      shown(...topics);
      view(block, other);
      hidden(topic);
      shown(...others(topic));
      panel("summary").should("exist");
      view(block, initial);
      shown(...topics);
      cy.get("@saved.all").should("have.length", 1);
    });
  }
  it("hides the table panel during search and restores it when cleared", () => {
    stub();
    visit();
    shown(...topics);
    cy.get("#cost-breakdown")
      .find('[aria-label="Search button"]')
      .click({ force: true });
    cy.get("#cost-breakdown")
      .find('[aria-label="Search input"]')
      .type("Total", { force: true });
    hidden("cost_table");
    shown(...others("cost_table"));
    cy.get("#cost-breakdown")
      .find('[aria-label="Search input"]')
      .clear({ force: true });
    shown(...topics);
    cy.get("@saved.all").should("have.length", 1);
  });
  it("renders citations with source links", () => {
    stub();
    visit();
    panel("actual_vs_budget")
      .find('[data-cy="narrative-sources"] a')
      .should("have.length", 2)
      .first()
      .should(
        "have.attr",
        "href",
        "https://data.api.theglobalfund.org/opex/table",
      )
      .and("have.attr", "rel", "noreferrer");
    panel("summary")
      .find('[data-cy="narrative-claim"]')
      .should("have.length", 3)
      .last()
      .find('[data-cy="narrative-sources"] a')
      .should("have.length", 2);
    panel("efficiency")
      .find('[aria-label^="Source 1:"]')
      .should(
        "have.attr",
        "href",
        "https://data.api.theglobalfund.org/opex/efficiency/pledge",
      );
  });
  for (const [statusCode, state] of [
    [404, "not_found"],
    [503, "error"],
  ] as const) {
    it(`keeps every block and shows the ${state} notice for HTTP ${statusCode}`, () => {
      stub();
      cy.intercept("GET", narrativeUrl, { statusCode, body: {} }).as("failed");
      cy.visit("/opex");
      cy.wait("@failed");
      cy.get(`[data-cy="narrative-${state}"]`).should(
        "have.length",
        topics.length + 1,
      );
      cy.get('[data-cy="narrative-section"]').should("not.exist");
      for (const block of [
        "opex-efficiency",
        "opex-vs-grant-disbursement",
        "operating-costs",
        "cost-composition",
        "key-costs",
        "indexed-trends",
        "cost-breakdown",
      ])
        cy.get(`#${block}`).should("exist");
    });
  }
  it("keeps every block while the saved bundle is loading", () => {
    stub();
    cy.intercept("GET", narrativeUrl, {
      fixture: "narratives/opex-page.json",
      delay: 1500,
    }).as("delayed");
    cy.visit("/opex");
    cy.get('[data-cy="narrative-loading"]').should(
      "have.length",
      topics.length + 1,
    );
    cy.get("#operating-costs").should("exist");
    cy.get("#cost-breakdown").should("exist");
    cy.wait("@delayed");
    cy.get('[data-cy="narrative-loading"]').should("not.exist");
    shown(...topics);
  });
  it("renders mobile panels and accessible citations", () => {
    cy.viewport("iphone-x");
    stub();
    visit();
    panel("summary").should("exist");
    shown(...topics);
    panel("cost_table").scrollIntoView().should("be.visible");
    panel("budget_position")
      .find('[aria-label^="Source 1:"]')
      .first()
      .focus()
      .should("have.focus");
  });
});
