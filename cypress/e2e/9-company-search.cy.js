/// <reference types="cypress" />

describe("Company search tests", () => {

  beforeEach(() => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.intercept("GET", "/api/otc/companies", { fixture: "companies.json" });
    cy.visit("/");
    cy.login("car@gmail.com", "raf");
  })

  it("should display company search form with company table", () => {
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get('tr').should("have.length", 3);
  })

  it("should show an empty table if random search is performed", () => {
    cy.intercept("GET", "/api/otc/companies?*", { statusCode: 200 });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("random");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 1);
  })

  it("should show 1 company with name only search", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch1.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Apple");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show 1 company with its registration ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch2.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("222");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show 1 company with its tax ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch2.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(3) > input").type("456");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show 1 company with its name and registration ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch2.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Google");
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("222");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show 1 company with its name and tax ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch1.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Apple");
    cy.get("#app > div.container > div > div:nth-child(3) > input").type("123");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  })

  it("should show 1 company with its registration ID and tax ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch1.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("111");
    cy.get("#app > div.container > div > div:nth-child(3) > input").type("123");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  });

  it("should show 1 company with its name, registration ID and tax ID entered", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch1.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Apple");
    cy.get("#app > div.container > div > div:nth-child(2) > input").type("111");
    cy.get("#app > div.container > div > div:nth-child(3) > input").type("123");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
  });

  it("should show all companies when reset search is clicked", () => {
    cy.intercept("GET", "/api/otc/companies?*", { fixture: "companySearch1.json" });
    cy.get(':nth-child(10) > div > .h4').click();
    cy.get("#app > div.container > div > div:nth-child(1) > input").type("Apple");
    cy.get("#app > div.container > div > div:nth-child(4) > button.btn.btn-primary.mx-2").click();
    cy.get("tr").should("have.length", 2);
    cy.get(':nth-child(4) > :nth-child(2)').click()
    cy.get("tr").should("have.length", 3);
  })

})