const country = 'MAR';
const keyword = 'hiv';
const keyword2 = 'HIV';

context('Country Detail', () => {
    beforeEach('Set cookies', () => {
        cy.setCookie('cookieNotice', 'false');
        cy.setCookie('explainTooltip', 'false');
    });
    it('Iterating through tabs', () => {
        cy.visit('http://localhost:3000/location/'+ country +"/results");
        cy.waitPageLoader();
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Signed').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(13).click();
        cy.wait(2000);
        cy.get('a').contains('Commitment').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(13).click();
        cy.wait(2000);
        cy.get('a').contains('Disbursement').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(13).click();
        cy.wait(2000);
        cy.get('a').contains('Budgets').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Allocation').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Eligibility').click();
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Documents').click({force: true});
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Grants').click({force: true});
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
        cy.get('a').contains('Results').click({force: true});
        cy.wait(2000);
        cy.get('[role="button"]').eq(0).click();
        cy.wait(2000);
    });
    it('Searching on Results tab', () => {
        cy.get('[data-cy="result-search-input"]').type(keyword);
        cy.get('[data-cy="expand-result"]').eq(0).click();
        cy.get('[data-cy="expanded-result"]').eq(0).should('be.visible');
        cy.wait(2000);
        cy.get('input').eq(0).scrollIntoView().clear({force: true});
        cy.get('input').eq(0).type(keyword2);
        cy.get('[data-cy="expand-result"]').eq(0).click();
        cy.get('[data-cy="expanded-result"]').eq(0).should('be.visible');
    })
})