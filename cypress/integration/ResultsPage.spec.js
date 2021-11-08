const keyword = 'pregnancy';

context('Results Page', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Search on Results', () => {
        cy.visit('http://localhost:3000/results');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('input').eq(1).type(keyword);
        cy.get('[data-cy="result-expand"]').eq(0);
        cy.wait(3000);
        cy.get('input').eq(1).clear();
        cy.wait(2000);
    });
    it('Check result scrollbar', () => {
        cy.get('[data-cy="result-expand"]').eq(0).click();
        cy.wait(1000);
        cy.get('[data-cy="result-expanded"]').scrollTo('bottom');
        cy.wait(3000);
    });
});