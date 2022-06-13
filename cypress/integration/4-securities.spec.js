/// <reference types="cypress" />

describe("Testing security filters", () => {

  beforeEach(() => {
    cy.visit('/');
  })

  it("should display the securities page and move slider", () => {
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

  it("should display adequate results based on search term", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });

    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.wait(500);

    cy.get("input").eq(0).type("MS");
    cy.get("tr").should("have.length", 3);

    cy.get("input").eq(0).clear();
    cy.get("input").eq(0).type("la");
    cy.get("tr").should("have.length", 2);

    cy.get("input").eq(0).clear();
    cy.get("input").eq(0).type("d");
    cy.get("tr").should("have.length", 5);

    cy.get("input").eq(0).clear();
    cy.get("input").eq(0).type("daasdf");
    cy.get("tr").should("have.length", 1);
  });

  it("filters scenario #1", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });

    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(0)
      .click(60, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(10, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();

    cy.get("tr").should("have.length", 3);
  });

  it("filters scenario #2", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(1)
      .click(60, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(1)
      .click(10, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();

    cy.get("tr").should("have.length", 2);
  });

  it("filters scenario #3", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(2)
      .click(100, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(2)
      .click(5, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();

    cy.get("tr").should("have.length", 2);
  });

  it("filters scenario #3", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(3)
      .click(100, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(3)
      .click(5, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();

    cy.get("tr").should("have.length", 6);
  });

  it("filters scenario #4", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".simple-typeahead-input").type('ny');
    cy.get(".simple-typeahead-list").click();

    cy.get(':nth-child(14) > .btn').click();
    cy.get("tr").should("have.length", 6)

  });

  it("filters scenario #5", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".simple-typeahead-input").type('nas');
    cy.get(".simple-typeahead-list").click();

    cy.get(':nth-child(14) > .btn').click();
    cy.get("tr").should("have.length", 3)
  });

  it("filter scenario #6", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(0)
      .click(60, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(10, 0, { force: true });

    cy.wait(500);

    cy.get(".slider-connects").eq(3)
      .click(100, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(3)
      .click(5, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();
    cy.get("tr").should("have.length", 3);

  });

  it("filters scenario #7", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get('[value="future"]').click();

    cy.get(".slider-connects").eq(4)
      .click(100, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(4)
      .click(20, 0, { force: true })

    cy.get(':nth-child(14) > .btn').click();
    cy.get("tr").should("have.length", 7);

  });

  it("filters scenario #8", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get('[value="forex"]').click();

    cy.get(".slider-connects").eq(0)
      .click(60, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(10, 0, { force: true });

    cy.get(':nth-child(13) > .btn').click();
    cy.get("tr").should("have.length", 4);

  });

  it("filters scenario #10", () => {
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
    cy.login("car@gmail.com", "raf");
    cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
    cy.get("#app > div > div > div > div:nth-child(4) > div > a").click();

    cy.get(".slider-connects").eq(0)
      .click(60, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(0)
      .click(10, 0, { force: true });

    cy.wait(500)

    cy.get(".slider-connects").eq(1)
      .click(70, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(1)
      .click(15, 0, { force: true });

    cy.wait(500)

    cy.get(".slider-connects").eq(3)
      .click(110, 0, { force: true })

    cy.wait(500);

    cy.get(".slider-connects").eq(1)
      .click(5, 0, { force: true });

    cy.get(':nth-child(14) > .btn').click();
    cy.get("tr").should("have.length", 2);

  })



});