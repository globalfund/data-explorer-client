
context('Geomap tests', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'true');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Zoom & move', () => {
        cy.visit('http://localhost:3000/viz/pledges-contributions/map');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="geomap-zoom-in"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-in"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-in"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-in"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-out"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-out"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-out"]').click();
        cy.wait(1000);
        cy.get('[data-cy="geomap-zoom-out"]').click();
        cy.wait(1500);
    })
    /**it('Hover countries to show data', () => {
 
    });*/
})