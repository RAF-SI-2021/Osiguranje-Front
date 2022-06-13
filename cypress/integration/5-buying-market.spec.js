/// <reference types="cypress" />

describe("testing buy and sell options", () => {

  beforeEach(() => {
    cy.visit("/");
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
  })

  it("button should be disabled amount is none", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(3) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("-10");
    cy.get("#all_or_none_cb").click();

    cy.get("#action-button").should("be.disabled");
  })

  it("button should be disabled when limit contains negative values", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(2) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("8");
    cy.get("#limit_value").clear().type("-1");

    cy.get("#action-button").should("be.disabled");

  });

  it("button should be disabled when stop contains negative values", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(2) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("8");
    cy.get("#stop_value").clear().type("-1");

    cy.get("#action-button").should("be.disabled");

  });

  it("button should be disabled when limit and stop are negative values", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(2) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#limit_value").clear().type("-1");
    cy.get("#stop_value").clear().type("-1");

    cy.get("#action-button").should("be.disabled");

  });

  it("should show the confirmation modal if all inputs are valid", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(4) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#limit_value").clear().type("120.4");
    cy.get("#stop_value").clear().type("123.31");

    cy.get("#action-button").click();

    cy.get(".modal-header > .modal-title").should("contain", "Purchase Overview");
  });

  it("should show the confirmation modal if only amount is entered", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(4) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#limit_value").clear().type("120.4");
    cy.get("#stop_value").clear().type("123.31");

    cy.get("#action-button").click();

    cy.get(".modal-header > .modal-title").should("contain", "Purchase Overview");
  });

  it("should show the confirmation modal if amount and limit is entered", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(4) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#limit_value").clear().type("110.21");

    cy.get("#action-button").click();

    cy.get(".modal-header > .modal-title").should("contain", "Purchase Overview");
  });

  it("should show the confirmation modal if amount and stop is entered", () => {
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(4) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#stop_value").clear().type("98.12");

    cy.get("#action-button").click();

    cy.get(".modal-header > .modal-title").should("contain", "Purchase Overview");
  });

  it("should make a successful order", () => {
    cy.intercept('POST', '/api/buyingmarket/orders', { statusCode: 200 });

    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();
    cy.get("table > tbody > tr:nth-child(4) > th > a").click();

    cy.wait(5000);

    cy.get(".btn-dark").click();

    cy.get("#security_amount").clear().type("15");
    cy.get("#stop_value").clear().type("98.12");

    cy.get("#action-button").click();

    cy.get("#confirm-order").click();

    cy.get(".c-toast").should("be.visible");
  })

});