/// <reference types="Cypress" />

describe('ProductScreen', () => {
  before(() => {
    // Clean up database
    cy.exec('npm run data-test:destroy');

    // Seed database
    cy.exec('npm run data-test:import');

    // Visit the site
    cy.visit('/');
  });

  after(() => {
    // Clean up database
    cy.exec('npm run data-test:destroy');
  });

  it('can click a product in home screen and go to product screen', () => {
    // Make sure at home screen
    cy.location('pathname').should('equal', '/');

    // Click the first latest product
    cy.get('[data-cy=latest-products] > div > a').eq(0).click();

    // Check elements in the screen
    cy.get('[data-cy=btn-back]').should('be.visible');
    cy.get('[data-cy=btn-add-to-cart]').should('be.visible');

    // Check the screen path
    cy.location('pathname').should('contain', '/products');
    //cy.location('pathname').should('equal', '/register');;
  });
});
