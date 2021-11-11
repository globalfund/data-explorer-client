context('Time cycle tests', () => {
    beforeEach('set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Get info by hovering a rectangle', () => {
        cy.visit('http://localhost:3000/viz/pledges-contributions/time-cycle');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="pledges-contributions-time-cycle-bar-component"]').eq(0).trigger('mouseover');
        cy.wait(3000);
    });
    it('Filter one category by hovering', () => {
        cy.get('[data-cy="pledges-contributions-time-cycle-bar-component"]').eq(3).trigger('mouseover');
        cy.wait(3000);
        cy.get('[data-cy="filter"]').eq(0).trigger('mouseover');
        cy.wait(2000);
        cy.get('[data-cy="filter"]').eq(1).trigger('mouseover');
        cy.wait(2000);
    });
    it('Get info on a specific pledge/contribution', () => {
        cy.get('rect').eq(5).click();
        cy.get('[data-cy="budgets-drilldown-treemap"]').should('be.visible');
        cy.wait(1000);
        cy.get('[aria-label="Sweden"]').trigger('mouseover');
    });
    it('Filter by period and type of dataset', () => {
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-prev"]').click({force: true});
        cy.wait(2000);
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[data-value="pledge"]').click();
        cy.wait(2000);
    });
});