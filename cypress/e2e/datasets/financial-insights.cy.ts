/// <reference types="cypress" />

// @ts-ignore
const interceptAllRequests = () => {
  const apiUrl = Cypress.env("api_url");
  cy.intercept(`${apiUrl}/**`).as("apiData");
};

// @ts-ignore
const waitData = (requestCount: number) => {
  for (let i = 0; i < requestCount; i++) {
    cy.wait("@apiData");
  }
};
