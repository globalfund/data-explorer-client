const grantCode = 'COD-M-MOH'

context('Performance rating chart tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Change implementation period', () => {
        cy.visit('http://localhost:3000/grant/' + grantCode + '/2/performance-rating');
        cy.waitPageLoader();
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[role="option"]').eq(0).click();
        cy.wait(2000);
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[role="option"]').eq(2).click();
        cy.wait(2000);
    });
});