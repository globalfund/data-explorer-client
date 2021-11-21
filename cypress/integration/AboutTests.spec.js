context('About page tests', () => {
   it('Scrolling', () => {
        cy.visit('http://localhost:3000/about');
        cy.waitPageLoader();
        cy.get('body').scrollTo('bottom').window();
        cy.wait(3000);
    });
    it('Verify links', () => {
        cy.get('[id="root"]').trigger('scroll', 'top');
        cy.get('[rel="noreferrer"]').eq(0).click();
        cy.wait(2000);
        cy.get('[rel="noreferrer"]').eq(1).click();
        cy.wait(2000);
        cy.get('[rel="noreferrer"]').eq(2).click();
        cy.wait(2000);
    });
});