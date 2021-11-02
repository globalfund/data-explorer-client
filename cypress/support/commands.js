// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('waitPageLoader', (timeout = 50000) => {
    cy.get('[data-cy=general-loader]', { timeout }).should('not.exist');
});
  
Cypress.Commands.add('hover', (hoverItem, showItem, n = 0) => {
cy.get(hoverItem)
    .eq(n)
    .scrollIntoView()
    .trigger('mouseover', { force: true });
// .get(showItem).should('be.visible');
});

Cypress.Commands.add('hoverOut', (hoverItem, showItem, n = 0) => {
    cy.get(hoverItem)
    .eq(n)
    .scrollIntoView()
    .trigger('mouseout');
// cy.get(showItem).should('not.be.visible');
});

Cypress.Commands.add('nextPage', (n = 0, nextPageNumber = 2) => {
    cy.waitPageLoader();
    cy.get('.pagination')
      .eq(n)
      .find('li')
      .eq(nextPageNumber)
      .click({ force: true });
});
  
Cypress.Commands.add('prevPage', (n = 0, previousPageNumber = 0) => {
    cy.waitPageLoader();
    cy.get('.pagination')
      .eq(n)
      .find('li')
      .eq(previousPageNumber)
      .click({ force: true });
});
Cypress.Commands.add('tableSearch', (keyword, n = 0) => {
    cy.waitPageLoader();
    if (keyword === '') {
      cy.get('[data-cy=table-search-input]')
        // .eq(n)
        .clear()
        .blur();
    } else {
      cy.get('[data-cy=table-search-icon]')
        .eq(n)
        .click();
      cy.get('[data-cy=table-search-input]')
        // .eq(0)
        .focus()
        .type(keyword)
        .blur();
    }
  });