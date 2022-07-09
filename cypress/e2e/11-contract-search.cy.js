/// <reference types="cypress" />

describe("Contract search tests", () => {

  beforeEach(() => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.intercept("GET", "/api/otc/companies", { fixture: "companies.json" });
    cy.intercept("GET", "/api/otc/contracts", { fixture: "contracts.json" });
    cy.visit("/");
    cy.login("car@gmail.com", "raf");
  })

  it("should display contract search form with contract table", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get('tr').should("have.length", 4);
  });

  it("should show an empty table if random search is performed", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("random");
    cy.get('.btn-primary').click();
    cy.get("tr").should("have.length", 1);
  });

  it("should show contracts that match the company name search term", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Google");
    cy.get('.btn-primary').click();
    cy.get("tr").should("have.length", 3);
  });

  it("should show contracts that match the contract reference number search term", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("4568/614");
    cy.get('.btn-primary').click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show contracts that match the company name and contract reference number", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Google");
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("4568/614");
    cy.get('.btn-primary').click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show all contracts when the clear button is clicked", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Google");
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("4568/614");
    cy.get('.btn-primary').click();
    cy.get(".btn-secondary").click();
    cy.get("tr").should("have.length", 4);
  });

})