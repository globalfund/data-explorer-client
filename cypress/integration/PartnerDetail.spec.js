const partnerKey = 'bc1747b7-02cb-41bc-bdd9-13995ea7c7ea';
const elementID = 'rc-Tuberculosis-2004-grant0-period1-implementation-end'

context('Partner detail tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Iterating over tabs', () => {
        cy.visit('http://localhost:3000/partner/' + partnerKey + '/signed/treemap');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(1).click();
        cy.get('a').contains('Commitment').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(3).click();
        cy.get('a').contains('Disbursement').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(3).click();
        cy.get('a').contains('Budgets').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Grants').click({force: true});
        cy.wait(3000);
    });
    /**it('Show details on Grants chart', () => {
        cy.visit('http://localhost:3000/partner/' + partnerKey + '/grants');
        cy.get('[role="button"]').click();
        cy.get('[id="' + elementID + '"]').click();
        cy.wait(3000);
    })*/
});