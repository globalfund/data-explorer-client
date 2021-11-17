const grantCode = 'COD-M-MOH'


context('Performence framework chart tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Check info on hover', () => {
        cy.visit('http://localhost:3000/grant/' + grantCode + '/3/performance-framework');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[title="Proportion of suspected malaria cases that receive a parasitological test in the community"]').trigger('mouseover', {force: true});
        cy.wait(2000);
    });
    it('Test side panel for extra info', () => {
        cy.get('text').contains('Case management').click();
        cy.get('[class^=PerformanceFrameworkExpandedView]').should('be.visible');
        cy.wait(2000);
        cy.get('[type="button"]').eq(2).click();
        cy.wait(2000);
        cy.get('[type="button"]').eq(1).click();
        cy.wait(2000);
        cy.get('li').contains('Interventions').click();
        cy.wait(2000);
        cy.get('li').contains('Indicator names').click();
        cy.get('span[class=""]').eq(0).click();
        cy.get('[data-cy="grant-tooltip-info"]').should('be.visible');
        cy.wait(2000);
        cy.get('[type="button"]').eq(0).click();
    });
    it('Change reporting period', () =>{
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="time-draggable"]').eq(0).click();
        cy.wait(2000);
        cy.get('[data-cy="time-draggable"]').eq(1).click({force: true});
        cy.wait(2000);
        cy.get('[data-cy*="time-draggable"]').eq(2).click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="time-draggable"]').eq(3).click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="time-draggable"]').eq(4).click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="time-draggable"]').eq(5).click({force: true});
        cy.wait(2000);
    });
    it('Change implementation period', () => {
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[role="option"]').eq(0).should('attr', 'aria-selected', 'true');
        cy.wait(2000);
        //cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[role="option"]').eq(1).click();
        cy.get('[role="option"]').eq(1).should('attr', 'aria-selected', 'true');
        cy.wait(2000);
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[role="option"]').eq(2).click();
        cy.wait(2000);
    });
});