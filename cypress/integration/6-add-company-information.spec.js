/// <reference types="cypress" />


describe("Add Company Info tests", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
        cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
        cy.visit("/");
        cy.wait(1000);
        cy.login("car@gmail.com", "raf");
        cy.visit("/addCompanyInformation");
        
        
      })

    it("should display Add Company Info form", () => {

        cy.get("h2.mt-5.text-center").should("contain", "Add Company Information");
    })

    it("should have no validation errors by default", () => {
        cy.get("form > div:nth-child(1) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(4) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(5) > div.input-errors").should("not.exist");
    })

    it("should require all fields", () => {
        cy.get("button.btn.btn-primary").click();
        cy.get("form > div:nth-child(1) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(2) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(5) > div.input-errors > div.error-msg").should("exist");
    })

    it("should require all fields except for companyName", () => {
        cy.get("#companyName").type("Test company");
        cy.get("button.btn.btn-primary").click();
        cy.get("form > div:nth-child(1) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(2) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(5) > div.input-errors > div.error-msg").should("exist");
    })

    it("should require all fields except for companyId", () => {
        cy.get("#companyRegistrationId").type("123");
        cy.get("button.btn.btn-primary").click();
        cy.get("form > div:nth-child(1) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(5) > div.input-errors > div.error-msg").should("exist");
    })

    it("should require all fields except for companyId", () => {
        cy.get("#companyRegistrationId").type("123");
        cy.get("button.btn.btn-primary").click();
        cy.get("form > div:nth-child(1) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(5) > div.input-errors > div.error-msg").should("exist");
    })

    it("should show success toast", () => {
        cy.intercept("POST", "/api/otc/companies/", { status: 200 });
        cy.get("#companyName").type("Test company"); 
        cy.get("#companyRegistrationId").type("123"); 
        cy.get("#companyTaxId").type("21345");
        cy.get("#sicCode").type("123");
        cy.get("#address").type("Test Address 123");
        cy.get("button.btn.btn-primary").click();
        cy.get(".c-toast--success").should("contain","Company created successfully!");

        cy.intercept("GET", "/api/otc/companies", { fixture: "companyFromCreate.json" });
        cy.get("tr").should("have.length", 2);
    })
})