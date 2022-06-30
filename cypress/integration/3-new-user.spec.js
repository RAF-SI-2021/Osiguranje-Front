// /// <reference types="cypress" />
//
// describe("Testing the New User page", () => {
//   beforeEach(() => {
//     cy.visit("/");
//   });
//
//   it("should show multiple error messages for all empty fields", ()=> {
//     cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
//     cy.login("car@gmail.com", "raf");
//
//     cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
//     cy.url().should("contain", "/newUser");
//
//     cy.get(".btn-primary").click();
//     cy.get(".test-error").should("have.length", 6);
//   })
//
//   it("validation case scenario #1", () => {
//     cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
//     cy.login("car@gmail.com", "raf");
//     cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
//
//     // Inputs
//     cy.get("#email").type("invalid@mail");
//     cy.get("#name").type("Valid");
//     cy.get("#jmbg").type("12345");
//     cy.get("#position").type("Agent");
//
//     // Submit Form
//     cy.get('.btn-primary').click();
//
//     cy.get(".test-error").should("have.length", 4);
//
//     // Assertions
//     cy.get(".test-error").eq(0).should('contain', 'Value is not a valid email address');
//     cy.get(".test-error").eq(1).should('contain', 'Value is required');
//     cy.get(".test-error").eq(2).should('contain', 'This field should be at least 13 long');
//     cy.get('.test-error').eq(3).should('contain', 'Value is required');
//   })
//
//   it("validation case scenario #2", () => {
//     cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
//     cy.login("car@gmail.com", "raf");
//     cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
//
//     cy.get("#email").type("validmail@gmail.com");
//     cy.get("#name").type("Johnny");
//     cy.get("#surname").type("Depp");
//     cy.get("#jmbg").type("1111111111111111111111111");
//     cy.get("#form2Example3cg").click();
//
//     cy.get('.btn-primary').click();
//
//     cy.get(".test-error").should("have.length", 3);
//
//     cy.get(".test-error").eq(0).should("contain", 'The maximum length allowed is 13');
//     cy.get(".test-error").eq(1).should("contain", "Value is required");
//     cy.get(".test-error").eq(2).should("contain", "Value is required");
//
//   });
//
//   it("validation case scenario #3", () => {
//     cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
//     cy.login("car@gmail.com", "raf");
//     cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
//
//     cy.get("#email").type("validmail@gmail.com");
//     cy.get("#name").type("Johnny");
//     cy.get("#surname").type("Depp");
//     cy.get("#jmbg").type("1111111111111");
//     cy.get("#phoneNumber").type("notANumber");
//
//     cy.get(".btn-primary").click();
//
//     cy.get(".test-error").should("have.length", 2);
//     cy.get(".test-error").should("contain", "Value must be numeric");
//
//   });
//
//   it("passing scenario", () => {
//     cy.intercept("POST", "/api/user", {
//       statusCode: 200
//     });
//     cy.intercept("GET", "/api/user/all", { fixture: "allUsersFromNew.json" })
//
//     cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
//     cy.login("car@gmail.com", "raf");
//     cy.get("#app > div > div > div > div:nth-child(2) > div > a").click();
//
//     cy.get("#email").type("validmail@gmail.com");
//     cy.get("#name").type("Johnny");
//     cy.get("#surname").type("Depp");
//     cy.get("#jmbg").type("1111111111111");
//     cy.get("#position").type("Agent");
//     cy.get("#phoneNumber").type("555333");
//     cy.get("#form2Example3cg").click();
//
//     cy.get(".btn-primary").click();
//
//     cy.url().should("contain", "/admin/users");
//   });
//
// })`