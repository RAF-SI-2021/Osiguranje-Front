/// <reference types="cypress" />

describe("Login Tests", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("should display the login page", () => {});

  it("should redirect to the admin page after successful login", () => {
    cy.intercept("GET", "/currentUser", { fixture: 'user.json' });
    cy.login("car@gmail.com", "raf");

    cy.url().should("include", "/admin");
  });

  it("should show a validation error", () => {
    cy.login("fakemail@mail.com", "blabla");

    cy.wait(500);

    cy.get('.c-toast').should('be.visible');
    cy.get('.c-toast--error').should('contain', 'Invalid email or password');

  });
});
