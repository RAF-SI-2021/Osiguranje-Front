/// <reference types="cypress" />

describe("Testing security filters", () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it("should display the securities page and move sliders", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });

    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(60, 0, { force:true })

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(10, 0, { force: true })

  });



});