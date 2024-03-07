/// <reference types="cypress" />
declare namespace Cypress {
  interface Chainable {
    getElement(selector: string): Chainable<any>
  }
}
Cypress.Commands.add('getElement', (selector) => {
  cy.get(`[data-test=${selector}]`)
})
