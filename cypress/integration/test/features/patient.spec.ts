import { createPublicKey } from 'crypto';

describe('Patient', () => {
  it('Navigate to Patient page', () => {
    cy.visit('/');
    cy.get('[data-cy=PatientRoute]').click();
    cy.url().should('include', '/patient');
  });

  it('Create new clients', () => {
    cy.get('[data-cy=patientCreate]').click();
    cy.get('[data-cy=patientFirstName] input')
      .type('a')
      .should('have.value', 'a');
    cy.get('[data-cy=patientLastName] input')
      .type('Sheng')
      .should('have.value', 'Sheng');
    cy.get('[data-cy=patientNumber] input')
      .type('1234567890')
      .should('have.value', '(123) 456-7890');
    cy.get('[data-cy=patientEmail] input')
      .type('asheng@test.com')
      .should('have.value', 'asheng@test.com');
    cy.get('[data-cy=patientAddress] input')
      .type('123 rue Tecumseh')
      .should('have.value', '123 rue Tecumseh');
    cy.get('[data-cy=patientGenderM] input').check().should('have.value', 'M');
    cy.get('[aria-label="Choose date"]').click();
    cy.get(
      `[aria-label="${new Intl.DateTimeFormat('en-US', { month: 'long' })
        .format(new Date())
        .substring(0, 3)} 22, ${new Date().getFullYear()}"]`
    )
      .eq(1)
      .click();
    cy.get('[data-cy=patientNotification]')
      .parent()
      .click()
      .get('[data-cy=typeEmail]')
      .click();
    cy.get('[data-cy=patientNotification] input').should('have.value', 'email');
    cy.get('[data-cy=patientSubmit]').click();
    cy.wait(5000);
    cy.get('[data-cy=patientCreate]').click();
    cy.get('[data-cy=patientFirstName] input')
      .type('b')
      .should('have.value', 'b');
    cy.get('[data-cy=patientLastName] input')
      .type('Sheng')
      .should('have.value', 'Sheng');
    cy.get('[data-cy=patientNumber] input')
      .type('1234567890')
      .should('have.value', '(123) 456-7890');
    cy.get('[data-cy=patientEmail] input')
      .type('bsheng@test.com')
      .should('have.value', 'bsheng@test.com');
    cy.get('[data-cy=patientAddress] input')
      .type('123 rue Tecumseh')
      .should('have.value', '123 rue Tecumseh');
    cy.get('[data-cy=patientGenderF] input').check().should('have.value', 'F');
    cy.get('[aria-label="Choose date"]').click();
    cy.get(
      `[aria-label="${new Intl.DateTimeFormat('en-US', { month: 'long' })
        .format(new Date())
        .substring(0, 3)} 22, ${new Date().getFullYear()}"]`
    )
      .eq(1)
      .click();
    cy.get('[data-cy=patientNotification]')
      .parent()
      .click()
      .get('[data-cy=typeSMS]')
      .click();
    cy.get('[data-cy=patientNotification] input').should('have.value', 'SMS');
    cy.get('[data-cy=patientSubmit]').click();
  });

  it('Sort clients by first name', () => {
    cy.get('[data-cy=patientSort]')
      .parent()
      .click()
      .get('[data-cy=sortFirstName]')
      .click();
  });

  it('Validate client info page', () => {
    cy.get('[data-cy=patientTable]').click();
  });
  it('Validate appointment history', () => {});
  it('Delete clients', () => {});
});
