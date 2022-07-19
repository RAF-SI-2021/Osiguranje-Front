/// <reference types="cypress" />

describe("User Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should route to the all users page and display the users", () => {
    cy.intercept("GET", "/api/user/all", { fixture: "allUsers.json" });
    cy.intercept("/api/buyingmarket/actuaries/**", { statusCode: 200 }).as("agents");
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });

    cy.login("car@gmail.com", "raf");
    cy.get("#app > div > div > div > div:nth-child(1) > div > a").click();

    cy.wait("@agents");

    cy.url().should("include", "/admin/users");
    cy.get(".card").should("have.length", 2);
  });

  it("shoud return adequate search results based on the search term", () => {
    cy.intercept("GET", "/api/user/all", { fixture: "allUsers.json" });
    cy.intercept("/api/buyingmarket/actuaries/**", { statusCode: 200 }).as("agents");
    cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });

    cy.login("car@gmail.com", "raf");
    cy.get("#app > div > div > div > div:nth-child(1) > div > a").click();

    cy.wait("@agents");

    cy.get(".form-control").type("Ra");
    cy.get(".card").should("have.length", 1);

    cy.get(".form-control").clear().type("r4nD0m G1bBer!Sh");
    cy.get(".card").should("have.length", 0);
  });
});
