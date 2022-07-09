/// <reference types="cypress" />

describe("Testing Company search", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.get("#app > div:nth-child(3) > div:nth-child(2) > div > div:nth-child(10) > div > a").click();
  })

})