/// <reference types="cypress" />

describe("Contract Transaction Item tests", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.visit("/");
    cy.wait(1000);
    cy.login("car@gmail.com", "raf");
  })

  it("should display contract with info", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.intercept("GET", "/api/otc/contracts", { fixture: "contracts.json" })
    cy.wait(500);
    cy.get('tr').eq(1).trigger("click")

    cy.intercept("GET", "/api/otc/contracts/**", { fixture: "singleContract1.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" })

    cy.get('.row > :nth-child(1) > .btn').should("be.visible");
    cy.get('.d-flex > .btn').should("be.visible");
  })

  it("should finalize contract successfully", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.intercept("GET", "/api/otc/contracts", { fixture: "contracts.json" })
    cy.wait(1000);
    cy.get('tr').eq(1).trigger("click")

    cy.intercept("GET", "/api/otc/contracts/**", { fixture: "singleContract1.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" })

    cy.intercept("POST", "/api/otc/contracts/544/finalize", { statusCode: 200 });

    cy.get('.row > :nth-child(1) > .btn').click();

    cy.get("p").eq(1).should("contain", "FINALIZED");

  })

  it("should add a transaction item", () => {
    cy.get(':nth-child(11) > div > .h4').click();
    cy.intercept("GET", "/api/otc/contracts", { fixture: "contracts.json" })
    cy.wait(1000);
    cy.get('tr').eq(1).trigger("click")

    cy.intercept("GET", "/api/otc/contracts/**", { fixture: "singleContract1.json" });
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" })

    cy.get('.d-flex > .btn').click();
    cy.wait(1000);

    cy.get(':nth-child(1) > :nth-child(2) > .form-select').select("STOCKS");
    cy.wait(1000);
    cy.get(':nth-child(2) > :nth-child(1) > .form-select').select("Tesla, Inc. - TSLA");
    cy.get(':nth-child(1) > .form-control').clear().type("5");
    cy.get(':nth-child(2) > .form-control').clear().type("727");

    cy.intercept("POST", "/api/otc/contracts/544/transaction-items", { statusCode: 201, body: {} })

    cy.get('.modal-footer > .btn-primary').click();
    cy.get(".c-toast").should("be.visible");
    cy.get("tr").should("have.length", 2);
  })
})