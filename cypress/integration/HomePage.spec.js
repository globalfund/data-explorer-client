context('HomePage', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'true');
    });
    it('Visit Home Page', () => {
        cy.visit('http://localhost:3000/');
        cy.wait(3000);
    });
    it('Carousel pagination', () => {
        cy.get('[data-cy="nextPage"]').eq(0).click({force: true});
        cy.wait(3000);
    });
    it('Dataset selection', () => {
        cy.get('a')
          .eq(2)
          .click();
        cy.waitPageLoader();
        cy.wait(3000);
    });
    it('Access to datasets', () => {
        cy.visit('http://localhost:3000');
        cy.waitPageLoader();
        cy.get('[data-cy="datasets-link"]').click();
        cy.location('pathname').should('include', `/datasets`);
    });
})