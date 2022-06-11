// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (email, password) => {
  if (email == "car@gmail.com" && password == "raf") {
    cy.intercept("POST", "/api/login", {
      statusCode: 200,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjYXJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTY1NDk3ODE2NSwiZXhwIjoxNjU1MDY0NTY1fQ.J3LC2fwAs09nlUKjyaF4vXHt6Mh4qsH2-Lny1p8T-7Y",
      },
    });
  } else {
    cy.intercept("POST", "/login", {
      statusCode: 403,
    });
  }

  cy.get("#email").type(email);
  cy.get("#password").type(password);
  cy.get(".btn-primary").click();
});
