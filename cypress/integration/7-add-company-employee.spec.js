/// <reference types="cypress" />


describe("Add Company Employee tests", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
        cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
        cy.intercept("GET", "/api/otc/companies", { fixture: "companies.json" });
        cy.visit("/");
        cy.wait(300);
        cy.login("car@gmail.com", "raf");
        cy.visit("/AddCompanyEmployee");
    })

    it("should display Add Employee form", () => {
        cy.get("h2.mt-5.text-center").should("contain", "Employee contact");
    })

    it("should display no validation errors by default", () => {
        // First name
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(4) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(5) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(6) > div.input-errors").should("not.exist");
    })


    it("should require firstName, lastName, phoneNumber, email, companyPosition", () => {
        cy.get("button[type=submit]").click();

        cy.get("#company").select("Apple");
        cy.get("form > div:nth-child(2) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(5) > div.input-errors > div.error-msg").should("exist");
        cy.get("form > div:nth-child(6) > div.input-errors > div.error-msg").should("exist");
    })

    it("should select item from dropdown", () => {

        cy.wait(500);
        cy.get("#company").select("Apple").should("have.value", "14");
    })

    it("should successfully create employee", () => {

        let expectedCompanyId = 14;
        cy.get("#company").select("Apple").should("have.value", "14");
        cy.intercept("POST", `/api/otc/companies/${expectedCompanyId}/employees`, { status: 200 });

        cy.get("#firstName").type("Test Employee Name");
        cy.get("#lastName").type("Test Employee Lastname");
        cy.get("#phoneNumber").type("+38112312312");
        cy.get("#email").type("test@mail.com");
        cy.get("#companyPosition").type("Testing Custodian");

        cy.get("button[type=submit]").click();
        cy.should("be.visible", ".c-toast--success");
        cy.get(".c-toast--success").should("contain","Employee contact added successfully");
    })

})