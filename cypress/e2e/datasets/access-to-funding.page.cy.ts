/// <reference types="cypress" />

// @ts-ignore
const interceptRequests = () => {
  const apiUrl = Cypress.env("api_url");
  cy.intercept(`${apiUrl}/**`).as("apiData");
};
// @ts-ignore
const waitData = (requestCount: number) => {
  for (let i = 0; i < requestCount; i++) {
    cy.wait("@apiData");
  }
};

describe("Testing The Datasets/Access to Funding Page", () => {
  beforeEach(() => {
    interceptRequests();
    cy.visit("/");
    cy.contains("[data-cy=header-menu-button]", "Datasets").click();
    cy.contains("[data-cy=header-menu-button]", "Access to Funding").click();
    waitData(7);
  });

  it("displays the header", () => {
    cy.get("h1").should("have.text", "Access to Funding");
    cy.contains("Eligible Countries by Numbers").should("be.visible");
    cy.contains("Segmented by Components.").should("be.visible");
    cy.contains("Countries Eligible for HIV/AIDS").should("be.visible");
    cy.contains("Countries Eligible for Malaria").should("be.visible");
    cy.contains("Countries Eligible for Tuberculosis");
  });
});
