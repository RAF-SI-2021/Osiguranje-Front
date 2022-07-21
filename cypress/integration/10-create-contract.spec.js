/// <reference types="cypress" />

describe("Contract creation tests", () => {

  beforeEach(() => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.intercept("GET", "/api/otc/companies", { fixture: "companies.json" });
    cy.visit("/");
    cy.login("car@gmail.com", "raf");
  });

  it("should render the create contract form", () => {
    cy.get(':nth-child(6) > div > .h4').click();
    cy.get("select").select("14");
    cy.get("h1").should("contain", "Create Contract")
  });

  it("should contain a validation error if the reference number isn't defined", () => {
    cy.get(':nth-child(6) > div > .h4').click();
    cy.get("select").select("14");
    cy.get(".btn-primary").click();

    cy.get(".text-danger").should("contain", "Value is required");
  })

  it("should contain a validation error if the reference number isn't defined and note is defined", () => {
    cy.get(':nth-child(6) > div > .h4').click();
    cy.get("select").select("14");
    cy.get("textarea").type("Some note\nAnother note");
    cy.get(".btn-primary").click();

    cy.get(".text-danger").should("contain", "Value is required");
  })

  it("should create contract with empty note", () => {
    cy.intercept("POST", "/api/otc/contracts", { status: 200 });
    cy.get(':nth-child(6) > div > .h4').click();
    cy.get("select").select("14");
    cy.get("input").type("123456789");

    cy.get(".btn-primary").click();

    cy.intercept("GET", "/api/otc/contracts", { fixture: "contractFromCreate.json" });

    cy.get(".c-toast").should("be.visible");

    cy.get("tr").should("have.length", 2);
  })

  it("should create contract with note", () => {
    cy.intercept("POST", "/api/otc/contracts", { status: 200 });
    cy.get(':nth-child(6) > div > .h4').click();
    cy.get("select").select("14");
    cy.get("input").type("123456789");
    cy.get("textarea").type("Some note\nAnother note");

    cy.get(".btn-primary").click();

    cy.intercept("GET", "/api/otc/contracts", { fixture: "contractFromCreate2.json" });


    cy.get(".c-toast").should("be.visible");

    cy.get("tr").should("have.length", 2);
  });

})