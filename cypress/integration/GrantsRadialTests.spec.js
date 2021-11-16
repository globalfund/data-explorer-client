const countryCode = 'COD';
const id = 'rc-Tuberculosis-2011-grant0-period0-implementation-end';
const number ='ZAR-911-G13-T';
const id2 = 'rc-Tuberculosis-2015-grant1-period2-implementation-end';
const id3 = 'rc-Malaria-2015-grant1-period0-implementation-end';
const id4 = 'rc-HIV-2010-grant0-period0-implementation-end';
const id5 = 'rc-Malaria-2012-grant0-period3-implementation-end';


context('Grants radial chart tests', () => {
    beforeEach('set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Check focusing and info on hover', () => {
        cy.visit('http://localhost:3000/location/' + countryCode + '/grants');
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.wait(5000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('[id="' + id + '"]').trigger('mouseover', {force: true});
        cy.get('[data-cy="grant-tooltip-' + number + '"]').should('be.visible');
        cy.wait(2000);
    });
    it('Check if status is correlated to line styles', () => {
        cy.get('[id="' + id2 + '"]').trigger('mouseover', {force: true});
        cy.wait(2000);
        cy.get('[id="' + id3 + '"]').trigger('mouseover', {force: true});
        cy.wait(2000);
        cy.get('[id="' + id4 + '"]').trigger('mouseover', {force: true});
        cy.wait(2000);
    });
    it('Check if grants about the same component are focused', () => {
        cy.get('[id="' + id5 + '"]').trigger('mouseover', {force: true});
        cy.get('[id="' + id3 + '"]').should('be.visible');
        //cy.get('[id="' + id4 + '"]').should('be.hidden');
        cy.wait(2000);
    });
    it('Check filters', () => {
        cy.on('uncaught:exception', (err, runnable) => {
            return false;
        });
        cy.get('[role="button"]').eq(0).click();
        cy.get('button').eq(3).click();
        cy.get('[type="checkbox"]').eq(0).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
        cy.get('button').eq(4).click();
        cy.get('button').eq(5).click();
        cy.get('[type="checkbox"]').eq(0).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
        cy.get('button').eq(5).click();
        cy.get('button').eq(3).click();
        cy.get('[type="checkbox"]').eq(0).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
    });
    it('Get details about a specific grant', () => {
        cy.get('[id="' + id + '"]').click();
        cy.wait(5000);
        cy.location('pathname').should('include', number);
    });
});