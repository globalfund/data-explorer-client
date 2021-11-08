const id='ARM-C-MOH';
const keyword = 'Belarus';
const keyword2 = 'belarus';

context('Grants page', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Access to grant', () => {
        cy.visit('http://localhost:3000/grants');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="grant-'+ id + '"]').click();
        cy.wait(3000);
    });
    it('Pagination', () => {
        cy.visit('http://localhost:3000/grants');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[aria-label="Go to page 2"]').click({force: true});
        cy.waitPageLoader();
        cy.wait(3000);
        cy.get('[role="button"]').eq(0).click();
        cy.get('[aria-label="Go to next page"]').click({force: true});
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.wait(3000);
    });
    it('Search on grants', () => {
        cy.visit('http://localhost:3000/grants');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('input').eq(0).type(keyword);
        cy.wait(3000);
        cy.get('input').eq(0).clear();
        cy.get('input').eq(0).type(keyword2);
        cy.wait(3000);
    });
})