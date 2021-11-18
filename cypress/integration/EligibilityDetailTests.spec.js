const countryCode = 'MAR';

context('Eligibility chart detail tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Scroll to the older results', () => {
        cy.visit('http://localhost:3000/location/' + countryCode + '/eligibility');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[id="scatterplot-scroll-div"]').scrollTo('bottom');
        cy.wait(3000);
    });
    it('Disable disease burden', () => {
        cy.get('[role="button"]').eq(0).click();
        cy.get('[type="checkbox"]').click();
        cy.wait(2000);
    });
    it('Filter by component', () => {
        cy.get('button').eq(3).click();
        cy.get('[type="checkbox"]').eq(2).click();
        cy.get('button').contains('Apply').click({force: true});
        cy.wait(2000);
    });
    it('Reload filters', () => {
        cy.get('button').eq(2).click();
        cy.wait(2000);
    });
});