const label = 'ZAF-C-NACOSA'

context('Budget flow tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('CookieNotice', 'false');
        cy.setCookie('ExplainTooltip', 'false');
    });
    it('Hover flow', () => {
        cy.visit('http://localhost:3000/viz/budgets/flow');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('path').eq(4).trigger('mouseover');
        cy.wait(3000);
    });
    it('Iterate through flow periods', () => {
        cy.get('[data-cy="bf-sankey-bar-comp"]').eq(3).click();
        cy.get('[id="zoom-in-level"]').should('be.visible');
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-prev"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-prev"]').click({force: true});
        cy.wait(2000);
    });
    it('Select another part of a flow period', () => {
        cy.get('[aria-haspopup="listbox"]').eq(0).click();
        cy.get('[role="option"]').eq(2).should('attr', 'data-value', 'Program Management Related Costs').click();
        cy.wait(3000);
    });
    it('Hover treemap element', () => {
        cy.get('[aria-label="Program management').eq(2).trigger('mouseover');
        cy.wait(1000);
        cy.get('[aria-label="Program management').eq(2).click();
        cy.wait(2000);
        cy.get('[aria-label="' + label + '"]').click();
        cy.wait(3000);
        cy.location('pathname').should('include', 'grant/' + label + '/2/overview');
    })
})