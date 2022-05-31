/// <reference types="cypress" />

describe('Login Tests', () => {

    beforeEach(() => {
        cy.visit("/");
    })

    it("should display the login page", () => {})

    it("should redirect to the admin page after successful login", () => {
        cy.get("#email").type("car@gmail.com");
        cy.get("#password").type("raf");
        cy.get(".btn-primary").click();
        cy.url().should("include", "/admin");
    })

})