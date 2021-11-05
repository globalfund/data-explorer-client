context('Toolbox tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'true');
    });
    it('Check view switches', () => {
        cy.visit('http://localhost:3000/viz/pledges-contributions/treemap');
        cy.waitPageLoader();
        cy.get('[title="Replenishment Periods"]').click();
        cy.location('pathname').should('include', '/viz/pledges-contributions/time-cycle');
        cy.wait(2000);
        cy.get('[title="Map"]').click();
        cy.location('pathname').should('include', '/viz/pledges-contributions/map');
        cy.wait(2000);
        cy.get('[title="Table"]').click();
        cy.location('pathname').should('include', '/viz/pledges-contributions/table');
        cy.wait(2000);
        cy.get('[title="Treemap"]').click();
        cy.location('pathname').should('include', '/viz/pledges-contributions/treemap');
        cy.wait(2000);
    });
    it('Check dropdowns for Pledges/Contributions', () => {
        cy.get('[aria-haspopup="listbox"]').click();
        cy.get('[data-value="Contributions"]').click();
        cy.wait(2000);
    });
    it('Select a Donor', () => {
        cy.get('button').eq(3).click();
        cy.get('[type="checkbox"]').eq(2).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
        cy.get('svg').eq(10).click({force: true});
        cy.wait(3000);
    });
    it('Select replenishment period', () => {
        cy.get('button').eq(4).click();
        cy.get('[type="checkbox"]').eq(3).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
    });
    it('Reset filters', () => {
        cy.get('button').eq(2).click();
        cy.wait(3000);
    });
    it('Filter disbursments on Signed', () => {
        cy.visit('http://localhost:3000/viz/signed/treemap');
        cy.waitPageLoader();
        cy.get('div[role="slider"]').eq(0).invoke('attr', 'aria-valuemax', '500000').should('attr', 'aria-valuemax', '500000');
        cy.get('div[role="slider"]').eq(1).invoke('attr', 'aria-valuenow', '500000').should('attr', 'aria-valuenow', '500000');
        cy.wait(6000);
    });
})