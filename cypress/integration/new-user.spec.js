/// <reference types="cypress" />

describe("Testing the New User page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should show multiple error messages for all empty fields", ()=> {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");

    cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
    cy.url().should("contain", "/newUser");

    cy.get(".btn-primary").click();
    cy.get(".test-error").should("have.length", 6);
  })
})