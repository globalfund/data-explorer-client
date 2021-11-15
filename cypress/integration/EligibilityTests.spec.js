const country = 'Belize';

context('Eligibility tests', () => {
    beforeEach('Set cookies', () => {
        //cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Check country description on hovering', () => {
        cy.visit('http://localhost:3000/viz/eligibility');
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="eligibility-' + country + '"]').eq(0).trigger('mouseover');
        cy.wait(2000);
        cy.get('[data-cy="eligibility-' + country + '"]').eq(1).trigger('mouseover');
        cy.wait(2000);
        cy.get('[data-cy="eligibility-' + country + '"]').eq(2).trigger('mouseover');
        cy.wait(2000);
    });
    it('Filter by eligibility', () => {
        cy.get('button').eq(5).click();
        cy.get('[data-cy="eligible"]').trigger('mouseover');
        cy.wait(2000);
        cy.get('[data-cy="not-eligible"]').trigger('mouseover');
        cy.wait(2000);
        cy.get('[data-cy="transition-funding"]').trigger('mouseover');
        cy.wait(2000);
    });
    it('Search through table', () => {
        cy.get('[role="button"]').eq(0).click();
        cy.get('path').eq(13).click();
        cy.get('td > div').eq(0).click();
        cy.get('div').eq(0).contains(country).should('be.visible');
    });
});