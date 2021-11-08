const keyword = 'Bangladesh';

context('Documents Page', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Filter and iterate in result tree', () => {
        cy.visit('http://localhost:3000/documents');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="general-document-search"]').eq(0).type(keyword);
        cy.wait(2500);
        cy.get('td').eq(1).click();
        cy.get('td').eq(2).click();
    });
})