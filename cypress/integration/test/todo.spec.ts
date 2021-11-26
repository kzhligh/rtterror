/// <reference types="cypress" />

describe('Feature A', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('do somn', () => {
    cy.get('body').should('exist');
  });
});
