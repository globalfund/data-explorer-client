const country = 'Zimbabwe';

context('Allocations tests', () => {
    beforeEach('set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Check component name and sum on hover', () => {
        cy.visit('http://localhost:3000/viz/allocations');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('g[seriesName="HIV"] > path').trigger('mousedown', 20, 7, {force: true});
        cy.get('g[seriesName="HIV"] > path').trigger('click', 20, 7, {force: true});
        cy.get('[class$=-datalabel-label]').contains('HIV');
        cy.get('[class$=-datalabel-value]').contains('6,354,999,999 USD');
        cy.wait(2000);
        cy.get('g[seriesName="Malaria"] > path').trigger('mousedown', 20, 7, {force: true});
        cy.get('g[seriesName="Malaria"] > path').trigger('click', 20, 8), {force: true};
        cy.get('[class$=-datalabel-label]').contains('Malaria');
        cy.get('[class$=-datalabel-value]').contains('4,061,486,740 USD');
        cy.wait(2000);
        cy.get('g[seriesName="Tuberculosis"] > path').trigger('mousedown', 20, 7, {force: true});
        cy.get('g[seriesName="Tuberculosis"] > path').trigger('click', 20, 8, {force: true});
        cy.get('[class$=-datalabel-label]').contains('Tuberculosis');
        cy.get('[class$=-datalabel-value]').contains('2,242,767,741 USD');
        cy.wait(2000);
    });
    it('Iterate over components on the side bar', () => {
        cy.get('g[seriesName="Tuberculosis"] > path').trigger('mousedown', 20, 7, {force: true});
        cy.get('g[seriesName="Tuberculosis"] > path').trigger('click', 20, 10, {force: true});
        cy.get('[data-cy="budgets-drilldown-treemap"]').should('be.visible');
        cy.wait(1500);
        cy.get('[data-cy="drilldown-arrow-selector-prev"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-prev"]').click({force: true});
        cy.wait(2000);
        cy.get('[aria-label="' + country + '"]').trigger('mouseover');
        cy.wait(2000);
        
    });
    it('Check side bar on Total', () => {
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[data-cy="drilldown-arrow-selector-next"]').click({force: true});
        cy.wait(2000);
        cy.get('[aria-label="' + country + '"]').eq(2).trigger('mouseover', {force: true});
        cy.wait(2000);
    });
    it('Close side bar', () => {
        cy.get('[data-cy="close"]').click({force: true});
    });
});