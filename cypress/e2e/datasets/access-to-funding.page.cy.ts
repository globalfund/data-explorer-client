/// <reference types="cypress" />

// @ts-ignore
const interceptAllRequests = () => {
  const apiUrl = Cypress.env("api_url");
  cy.intercept(`${apiUrl}/**`).as("apiData");
};

// @ts-ignore
const interceptRequests = () => {
  const apiUrl = Cypress.env("api_url");

  cy.intercept(`${apiUrl}/allocations/cumulative-by-cycles`).as(
    "allocationCycle"
  );
  cy.intercept(`${apiUrl}/eligibility/stats/**`).as("eligibilityStats");
  cy.intercept(`${apiUrl}/eligibility/table`).as("eligibilityTable");
  cy.intercept(`${apiUrl}/allocations/sunburst`).as("allocationSunburst");
  cy.intercept(`${apiUrl}/allocations/table`).as("allocationTable");
  cy.intercept(`${apiUrl}/allocations/treemap`).as("allocationTreemap");
  cy.intercept(`${apiUrl}/funding-requests`).as("fundingRequests");
};
// @ts-ignore
const waitData = (requestCount: number) => {
  if (requestCount === 0) {
    cy.wait("@allocationCycle");
    cy.wait("@eligibilityStats");
    cy.wait("@eligibilityTable");
    cy.wait("@allocationSunburst");
    cy.wait("@allocationTable");
    cy.wait("@allocationTreemap");
    cy.wait("@fundingRequests");
    return;
  }
  for (let i = 0; i < requestCount; i++) {
    cy.wait("@apiData");
  }
};

describe(
  "Testing The Datasets/Access to Funding Page",
  { scrollBehavior: false },
  () => {
    beforeEach(() => {
      interceptAllRequests();
      interceptRequests();

      cy.visit("/");
      waitData(11);
      cy.contains("[data-cy=header-menu-button]", "Datasets").click();
      cy.contains("[data-cy=header-menu-button]", "Access to Funding").click();
      waitData(0);
    });

    it("displays the header", { scrollBehavior: "nearest" }, () => {
      cy.get("h1").should("have.text", "Access to Funding");
      cy.contains("Eligible Countries by Numbers").should("be.visible");
      cy.contains("Segmented by Components.").should("be.visible");
      cy.contains("Countries Eligible for HIV/AIDS").should("be.visible");
      cy.contains("Countries Eligible for Malaria").should("be.visible");
      cy.contains("Countries Eligible for Tuberculosis").should("be.visible");
    });

    it("Can switch eligibility year", { scrollBehavior: "nearest" }, () => {
      cy.contains('[data-cy="category-dropdown-button"]', "2023").click();

      cy.get('[data-cy="category-dropdown-menu"]')
        .filter((index, parent) => {
          return Cypress.$(parent).css("visibility") !== "hidden";
        })
        .within(() => {
          cy.contains('[data-cy="category-dropdown-item"]', "2022").click();
        });

      cy.wait("@eligibilityStats");

      cy.contains('[data-cy="category-dropdown-button"]', "2022").should(
        "be.visible"
      );
    });

    it("shows the eligibility block", { scrollBehavior: "nearest" }, () => {
      cy.contains('[data-cy="dataset-chart-block"]', "Eligibility")
        .first()
        .within(() => {
          cy.contains("Country eligibility for funding over time.").should(
            "be.visible"
          );
          cy.get('[data-cy="table"]').should("be.visible");
        });
    });

    it(
      "Shows the allocation block and can switch chart type",
      { scrollBehavior: "nearest" },
      () => {
        cy.contains('[data-cy="dataset-chart-block"]', "Allocation")
          .first()
          .within(() => {
            cy.contains("Allocations amounts for countries.").should(
              "be.visible"
            );
            cy.get('[data-cy="sunburst-chart"]').should("be.visible");

            cy.contains(
              '[data-cy="category-dropdown-button"]',
              "Sunburst Chart"
            ).click();
          });

        cy.get('[data-cy="category-dropdown-menu"]')
          .filter((index, parent) => {
            return Cypress.$(parent).css("visibility") !== "hidden";
          })
          .within(() => {
            cy.contains(
              '[data-cy="category-dropdown-item"]',
              "Treemap"
            ).click();
          });

        cy.contains("[data-cy=dataset-chart-block]", "Allocation").within(
          () => {
            cy.get('[data-cy="treemap-chart"]').should("be.visible");
            cy.contains(
              '[data-cy="category-dropdown-button"]',
              "Treemap"
            ).click();
          }
        );

        cy.get('[data-cy="category-dropdown-menu"]')
          .filter((index, parent) => {
            return Cypress.$(parent).css("visibility") !== "hidden";
          })
          .within(() => {
            cy.contains(
              '[data-cy="category-dropdown-item"]',
              "Table View"
            ).click();
          });

        cy.contains("[data-cy=dataset-chart-block]", "Allocation").within(
          () => {
            cy.get('[data-cy="table"]').should("be.visible");
          }
        );

        cy.get('[data-cy="allocation-block-2"]').within(() => {
          cy.contains("Cumulative Allocation by Cycles").should("be.visible");
          cy.contains("Accompanied by the Component Breakdown.").should(
            "be.visible"
          );

          cy.get('[data-cy="bar-series-chart"]').should("be.visible");
        });
      }
    );

    it(
      "shows the funding requests block",
      { scrollBehavior: "nearest" },
      () => {
        cy.contains('[data-cy="dataset-chart-block"]', "Funding Requests")
          .first()
          .within(() => {
            cy.contains("Funding request applications by countries.").should(
              "be.visible"
            );
            cy.get('[data-cy="table"]').should("be.visible");
          });
      }
    );
  }
);
