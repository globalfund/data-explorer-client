const grant = 'AFG-H-UNDP';
const grant2 = 'BGD-T-NTP';
const keyword = 'Letter';

context('Grant Detail', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltp', 'false');
    });
    it('Iterating through tabs', () => {
        cy.visit('http://localhost:3000/grant/' + grant + '/3/overview');
        cy.waitPageLoader();
        cy.get('a').contains('Signed').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Commitment').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Disbursement').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Budgets').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Performance Rating').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Performance Framework').click();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('a').contains('Documents').click({force: true});
        cy.wait(3000);
    });
    it('Check disbursement options & filters', () => {
        cy.visit('http://localhost:3000/grant/' + grant + '/3/disbursements/time-cycle');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(1).click();
        cy.get('[role="option"]').eq(1).click();
        cy.wait(3000);
    });
    it('Check cumultative chart on Commitment', () => {
        cy.visit('http://localhost:3000/grant/' + grant + '/3/commitment/time-cycle');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[type="checkbox"]').eq(0).click({force: true});
        cy.wait(3000);
    });
    it('Check performance framework', () => {
        cy.visit('http://localhost:3000/grant/' + grant + '/3/performance-framework');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('circle').eq(5).scrollIntoView().trigger('mouseover', {force: true});
        cy.wait(3000);
    });
    it('Search bar on Documents', () => {
       cy.visit('http://localhost:3000/grant/' + grant2 + '/5/documents');
       cy.waitPageLoader();
       cy.get('[role="button"]').eq(0).click();
       cy.get('input').eq(0).type(keyword);
       cy.get('td').eq(0).click();
       cy.get('[data-cy="grant-search-result"]').eq(0).should('be.visible'); 
    });
})