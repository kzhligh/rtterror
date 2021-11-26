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
      .type('Amy')
      .should('have.value', 'Amy');

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

    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/customer',
    }).as('createCustomer');
    cy.get('[data-cy=patientSubmit]').click();
    cy.wait('@createCustomer').its('response.statusCode').should('eq', 201);

    cy.get('[data-cy=patientCreate]').click();
    cy.get('[data-cy=patientFirstName] input')
      .type('Zebra')
      .should('have.value', 'Zebra');
    cy.get('[data-cy=patientLastName] input')
      .type('Johnson')
      .should('have.value', 'Johnson');
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
    cy.intercept({
      method: 'POST',
      url: 'http://localhost:5000/api/v1/customer',
    }).as('createCustomer');
    cy.get('[data-cy=patientSubmit]').click();
    cy.wait('@createCustomer').its('response.statusCode').should('eq', 201);
  });

  it('Sort clients by first name', () => {
    cy.intercept({
      method: 'GET',
      url: 'http://localhost:5000/api/v1/customer?sortBy=firstName',
    }).as('sortByFirstName');
    cy.get('[data-cy=patientSort]')
      .parent()
      .click()
      .get('[data-cy=sortFirstName]')
      .click();
    cy.wait('@sortByFirstName').its('response.statusCode').should('eq', 200);
  });

  it('Validate client info page', () => {
    cy.get(
      'div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="0"] div.MuiDataGrid-cell[data-field="firstName"]'
    ).should('contain', 'Amy');
    cy.get(
      'div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="0"] div.MuiDataGrid-cell[data-field="lastName"]'
    )
      .should('contain', 'Sheng')
      .click();
  });

  it('Validate appointment history', () => {});

  it('Delete clients', () => {
    cy.intercept({
      url: 'http://localhost:5000/api/v1/customer',
    }).as('fetchCustomers');
    cy.visit('/patient');
    cy.url().should('include', '/patient');
    cy.wait('@fetchCustomers').its('response.statusCode').should('eq', 200);

    cy.get(
      'div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="0"] div.MuiDataGrid-cell[data-field="firstName"]'
    ).should('contain', 'Amy');
    cy.get(
      'div.MuiDataGrid-main div.MuiDataGrid-row[data-rowindex="0"] div.MuiDataGrid-cell[data-field="lastName"]'
    ).should('contain', 'Sheng');

    cy.get('input.PrivateSwitchBase-input[type="checkbox"]')
      .check({ force: true })
      .should('be.checked');

    cy.intercept({
      method: 'DELETE',
      url: 'http://localhost:5000/api/v1/customer',
    }).as('deletePatientRecords');
    cy.get('button[data-cy="patientDelete"]').should('be.enabled').click();
    cy.wait('@deletePatientRecords')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
