Cypress.Commands.add('waitPageLoader', (timeout = 50000) => {
  cy.get('[data-cy=general-loader]', { timeout }).should('not.exist');
});

Cypress.Commands.add('hover', (hoverItem, showItem, n = 0) => {
  cy.get(hoverItem)
    .eq(n)
    .scrollIntoView()
    .trigger('mouseover', { force: true });
  // .get(showItem).should('be.visible');
});

Cypress.Commands.add('hoverOut', (hoverItem, showItem, n = 0) => {
  cy.get(hoverItem)
    .eq(n)
    .scrollIntoView()
    .trigger('mouseout');
  // cy.get(showItem).should('not.be.visible');
});

Cypress.LocalStorage.clear = () => {};

/* Filters */

Cypress.Commands.add('addFilter', (type, filterName, subType = 'countries') => {
  cy.waitPageLoader();
  cy.get(`[data-cy=${type}-filter-group-collapse-expand]`).click();

  if (type === 'location') {
    cy.get(`[data-cy=locations-filter-group-dropdown]`).click();
    cy.get(`[data-cy=dropdown-option-${subType}]`).click();
  }

  cy.get(
    `[data-cy=filter-option-${filterName.replace(
      new RegExp(' ', 'g'),
      '_'
    )}-option]`
  ).click();
});

Cypress.Commands.add('collapseFilterGroup', type => {
  cy.waitPageLoader();
  cy.get(`[data-cy=${type}-filter-group-collapse-expand]`).click();
});

Cypress.Commands.add('removeFilterChip', filterName => {
  cy.waitPageLoader();
  cy.get(
    `[data-cy=filter-option-${filterName.replace(
      new RegExp(' ', 'g'),
      '_'
    )}-option]`
  ).click();
});

Cypress.Commands.add('expandAppliedFilters', type => {
  cy.waitPageLoader();
  cy.get(`[data-cy=${type}-filter-group-text]`).click();
});

Cypress.Commands.add('enableFilterChip', filterName => {
  cy.waitPageLoader();
  cy.get(
    `[data-cy=filter-chip-${filterName.replace(
      new RegExp(' ', 'g'),
      '_'
    )}-enable]`
  ).click();
});

Cypress.Commands.add('disableFilterChip', filterName => {
  cy.waitPageLoader();
  cy.get(
    `[data-cy=filter-chip-${filterName.replace(
      new RegExp(' ', 'g'),
      '_'
    )}-disable]`
  ).click();
});

Cypress.Commands.add('resetFilters', () => {
  cy.waitPageLoader();
  cy.get('[data-cy=filters-reset-button]').click();
});

/* General Search */

Cypress.Commands.add('generalSearch', keyword => {
  cy.get('[data-cy=search-filter-group-text]').click();
  cy.get('[data-cy=general-search-input]').should('be.visible');
  cy.get('[data-cy=general-search-input]').type(keyword);
  cy.get('[data-cy=general-search-result-container]').should('be.visible');
});

Cypress.Commands.add('selectGeneralSearchOption', name => {
  cy.get(`[data-cy=general-search-${name}-result-row]`).click();
});

Cypress.Commands.add('clickGSearchOk', () => {
  cy.get('[data-cy=general-search-ok-button]').click();
});

/* Table */

Cypress.Commands.add('doSort', (sort, n = 0, timeout = 20000) => {
  cy.waitPageLoader(timeout);
  cy.hover('[data-cy=table-sort-by]', '[data-cy=table-sort-by-container]', n);
  cy.get(`[data-cy=table-sort-by-${sort}-item]`)
    .scrollIntoView()
    .click();
  cy.hoverOut(
    '[data-cy=table-sort-by]',
    '[data-cy=table-sort-by-container]',
    n
  );
});

Cypress.Commands.add('download', () => {
  cy.waitPageLoader();
  cy.get('[data-cy=table-download]').click();
});

Cypress.Commands.add('tableSearch', (keyword, n = 0) => {
  cy.waitPageLoader();
  if (keyword === '') {
    cy.get('[data-cy=table-search-input]')
      // .eq(n)
      .clear()
      .blur();
  } else {
    cy.get('[data-cy=table-search-icon]')
      .eq(n)
      .click();
    cy.get('[data-cy=table-search-input]')
      // .eq(0)
      .focus()
      .type(keyword)
      .blur();
  }
});

Cypress.Commands.add('nextPage', (n = 0, nextPageNumber = 2) => {
  cy.waitPageLoader();
  cy.get('.pagination')
    .eq(n)
    .find('li')
    .eq(nextPageNumber)
    .click({ force: true });
});

Cypress.Commands.add('prevPage', (n = 0, previousPageNumber = 0) => {
  cy.waitPageLoader();
  cy.get('.pagination')
    .eq(n)
    .find('li')
    .eq(previousPageNumber)
    .click({ force: true });
});

/* Budget flow */
Cypress.Commands.add('budgetFlowSankey', () => {
  cy.waitPageLoader();
  cy.get('[data-cy=bf-sankey]').should('exist');
  cy.get('[data-cy=bf-sankey] path')
    .eq(0)
    .should('exist');
  cy.hover('[data-cy=bf-sankey] path', '[data-cy=bf-sankey-link-tooltip]', 0);
  cy.hoverOut(
    '[data-cy=bf-sankey] path',
    '[data-cy=bf-sankey-link-tooltip]',
    0
  );
  cy.get('[data-cy=bf-sankey-bar-comp]')
    .should('exist')
    .eq(0)
    .click();

  cy.get('[data-cy=bf-detail-panel]').should('exist');
  cy.waitPageLoader();
  cy.get('[data-cy=bf-detail-panel-levelselector-name]')
    .should('exist')
    .contains('Budgets');
  cy.get('[data-cy=bf-detail-panel-levelselector-next]')
    .should('exist')
    .click();
  cy.waitPageLoader();
  cy.get('[data-cy=bf-detail-panel-levelselector-name]').contains(
    'Investment Landscape Level 1'
  );

  cy.get('[data-cy=bf-detail-panel-zoom-button]')
    .should('exist')
    .click();
  cy.get('[data-cy=bf-detail-panel-close-button]')
    .should('exist')
    .click();
});

Cypress.Commands.add('budgetFlowBarchart', () => {
  cy.get('[data-cy=viz-tab-time-cycle]')
    .should('exist')
    .click();
  cy.waitPageLoader();
  cy.get('[data-cy=bf-barchart-bar-comp]')
    .should('exist')
    .eq(0)
    .click();

  cy.get('[data-cy=bf-detail-panel]').should('exist');
  cy.waitPageLoader();
  // cy.get('[data-cy=bf-detail-panel-levelselector-name]')
  //   .should('exist')
  //   .contains('2018');
  cy.get('[data-cy=bf-detail-panel-levelselector-next]')
    .should('exist')
    .click();
  cy.waitPageLoader();
  // cy.get('[data-cy=bf-detail-panel-levelselector-name]').contains('2019');

  cy.get('[data-cy=bf-detail-panel-zoom-button]')
    .should('exist')
    .click();
  cy.get('[data-cy=bf-detail-panel-close-button]')
    .should('exist')
    .click();
});

/* Performance framework */
Cypress.Commands.add('performanceFrameworkCircle', () => {
  cy.get('[data-cy=pf-circle-indicator-set]')
    .should('exist')
    .eq(0)
    .click();
  cy.get('[data-cy=pf-circle-indicator-set]')
    .should('exist')
    .eq(0)
    .should('have.css', 'border', '1px solid rgb(255, 255, 255)');
  cy.get('[data-cy=pf-circle-module]')
    .should('exist')
    .should('not.have.css', 'visibility', 'hidden')
    .eq(0)
    .get('[data-cy=pf-circle-module-circle]')
    .eq(0)
    .should('exist')
    .click();
  cy.get('[data-cy=pf-circle-module]')
    .should('exist')
    .should('not.have.css', 'visibility', 'hidden')
    .eq(0)
    .within(() => {
      cy.get('[data-cy=pf-circle-indicactor-name-container]')
        .get('[data-cy=pf-circle-indicactor-name]')
        .should('exist')
        .eq(0)
        .should('have.css', 'border', '2px solid rgb(255, 255, 255)');
    });
  cy.get('[data-cy=pf-circle-detail-panel]').within(() => {
    cy.get('[data-cy=pf-circle-detail-panel-indicator-name-header]')
      .eq(0)
      .click();
  });
  cy.get('[data-cy=pf-circle-detail-panel-indicator-name-tooltip]').should(
    'exist'
  );
  cy.get('[data-cy=pf-circle-detail-panel-indicator-name-tooltip-closebtn]')
    .should('exist')
    .click({ force: true });
  cy.get('[data-cy=pf-circle-detail-panel-indicator-name-tooltip]').should(
    'not.exist'
  );
  cy.get('[data-cy=pf-arrow-selector-nextbtn]')
    .should('exist')
    .click();
  cy.get('[data-cy=pf-circle-module]')
    .should('exist')
    .should('not.have.css', 'visibility', 'hidden')
    .eq(1)
    .within(() => {
      cy.get('[data-cy=pf-circle-indicactor-name-container]')
        .get('[data-cy=pf-circle-indicactor-name]')
        .should('exist')
        .eq(0)
        .should('have.css', 'border', '2px solid rgb(255, 255, 255)');
    });
  cy.get('[data-cy=pf-circle-detail-panel-closebtn]')
    .should('exist')
    .click();
  cy.get('[data-cy=pf-circle-selected-timeframe]').then($el => {
    const selectedTimeframe = $el.text();
    cy.wait(1000);
    cy.get('[data-cy=pf-timeframe-control-item]')
      .should('exist')
      .eq(1)
      .click();
    cy.get('[data-cy=pf-circle-selected-timeframe]').then($el2 => {
      const selectedTimeframeUpdated = $el2.text();
      expect(selectedTimeframe).not.to.eq(selectedTimeframeUpdated);
    });
  });
});

Cypress.Commands.add('performanceFrameworkTable', () => {
  cy.get('[data-cy=pf-table-module-item]')
    .should('exist')
    .eq(0)
    .click();
  cy.get('[data-cy=pf-table-indicator-list]')
    .should('exist')
    .eq(0)
    .within(() => {
      cy.get('[data-cy=pf-table-indicator-list-item]')
        .should('exist')
        .eq(0)
        .within(() => {
          cy.get('[data-cy=pf-table-indicator-list-item-circle]')
            .should('exist')
            .eq(0)
            .click();
          cy.get('[data-cy=pf-table-indicator-list-item-circle]')
            .should('exist')
            .eq(0)
            .should('have.css', 'border', '2px solid rgb(255, 255, 255)')
            .click();
        });
    });
  cy.get('[data-cy=pf-table-indicator-list-item-circle-tooltip]')
    .should('exist')
    .click();
  cy.get('[data-cy=pf-table-indicator-list-item-circle-tooltip]')
    .should('exist')
    .within(() => {
      cy.get('[data-cy=pf-table-tooltip-closebtn]')
        .should('exist')
        .click();
    });
  cy.get('[data-cy=pf-arrow-selector-text]').then($el => {
    const selectedIndSet = $el.text();
    cy.wait(1000);
    cy.get('[data-cy=pf-arrow-selector-nextbtn]')
      .should('exist')
      .click();
    cy.get('[data-cy=pf-arrow-selector-text]').then($el2 => {
      const selectedIndSetUpdated = $el2.text();
      expect(selectedIndSet).not.to.eq(selectedIndSetUpdated);
    });
  });
});
