

context('Treemap tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Check info on hover', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.visit('http://localhost:3000/viz/signed/treemap');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('button').eq(9).click();
        cy.get('[id="India"]').eq(0).trigger('mouseover', {force: true});
    });
    it('Info moves with the mouse cursor on hover', () => {
        cy.get('[id="India"]').eq(0).click();
        cy.get('[id="HIV"]').eq(1).trigger('mouseover', 'bottom');
        cy.wait(2500);
        cy.get('[id="HIV"]').eq(1).trigger('mouseover', 'left');
        cy.wait(2500);
        cy.get('[id="HIV"]').eq(1).trigger('mouseover', 'top');
        cy.wait(2500);
        cy.get('[id="HIV"]').eq(1).trigger('mouseover', 'right');
        cy.wait(2500);
    });
    it('Side bar closing', () => {
        cy.get('button').eq(0).click();
        //cy.get('[id="zoom-in-level"]').should('be.hidden');
    });
});