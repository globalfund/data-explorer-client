const keyword = 'Lesotho';
const location = 'Africa';
const component = 'Malaria';
const partnerType = 'Other';
const grantStatus = 'Terminated';

context('Searches', () => {
    beforeEach('set cookies', () => {
        cy.setCookie('cookieNotice', 'true');
        cy.setCookie('explainTooltip', 'true');
    });
    /**it('Search on home page', () => {
        cy.visit('http://localhost:3000/');
        cy.waitPageLoader();
        cy.get('[data-cy="general-search-input"]').type(keyword);
        cy.get('[data-cy="general-search-result"]').should('be.visible');
        cy.wait(3000);
    });
    it('Iterate through filters', () => {
        cy.get('[data-cy="filter-Partner(s)"]').click();
        cy.wait(1000);
        cy.get('[data-cy="filter-Donor(s)"]').click();
        cy.wait(1000);
        cy.get('[data-cy="filter-Grant(s)"]').click();
        cy.wait(1000);
        cy.get('[data-cy="filter-Result(s)"]').click();
        cy.wait(1000);
        cy.get('[data-cy="filter-Document(s)"]').click();
        cy.wait(1000);
    })
    it('Search on Documents page', () => {
        cy.visit('http://localhost:3000/documents');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="document-search-input"]').type(keyword);
        cy.get('table').should('be.visible');
        cy.wait(3000);
    });*/
    it('Search on Grants page', () => {
        cy.visit('http://localhost:3000/grants');
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.get('[data-cy="grants-search-input"]').type(keyword);
        cy.get('[data-cy="grant-search-result"]').eq(0).should('be.visible');
        cy.wait(3000);
    })
    it('Search on toolbox', () => {
        cy.visit('http://localhost:3000/viz/signed/treemap');
        cy.waitPageLoader();
        cy.get('button').eq(7).click();
        cy.get('[role="button"]').eq(434).click();
        cy.get('button').eq(3).click();
        cy.get('[data-cy="toolbox-search-input"]').type(location);
        cy.wait(3000);
        cy.get('button').eq(3).click();
        cy.get('button').eq(4).click();
        cy.get('[data-cy="toolbox-search-input"]').clear();
        cy.get('[data-cy="toolbox-search-input"]').type(component);
        cy.wait(3000);
        cy.get('button').eq(4).click({force: true});
        cy.get('button').eq(5).click();
        cy.get('[data-cy="toolbox-search-input"]').clear();
        cy.get('[data-cy="toolbox-search-input"]').type(partnerType);
        cy.wait(3000);
        cy.get('button').eq(11).click();
        cy.get('button').eq(6).click({force: true});
        cy.get('[data-cy="toolbox-search-input"]').clear();
        cy.get('[data-cy="toolbox-search-input"]').type(grantStatus);
        cy.wait(3000);
    })
})