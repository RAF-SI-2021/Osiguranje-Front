/// <reference types="cypress" />

describe("Add Company Bank account tests", () => {
    beforeEach(() => {
        cy.intercept("GET", "/api/currentUser", { fixture: "user.json" });
        cy.intercept("GET", "/api/securities/data", { fixture: "securities.json" });
        cy.intercept("GET", "/api/otc/companies", { fixture: "companies.json" });
        cy.visit("/");
        cy.wait(500);
        cy.login("car@gmail.com", "raf");
        cy.visit("/AddCompanyBankAccount");
    });

    it("should display Add Company Bank account form", () => {
        cy.get("h2.mt-5.text-center").should("contain", "Add Company Bank Account");
    });

    it("shouldn't show validation errors by default", () => {
        cy.get("form > div:nth-child(1) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(4) > div.input-errors").should("not.exist");
    });

    it("should select company from dropdown", () => {
        let expectedCompany = {
            id: 14,
            name: "Apple"
        }
        // Wait for the dropdown to initialize
        cy.wait(4500);
        cy.get("#company", { timeout: 10000 }).should("be.visible").select(`${expectedCompany.name}`).should("have.value", expectedCompany.id);
    });

    it("should show all validation errors when submit is clicked right away", () => {
        cy.get("button[type=submit]").click();

        cy.get("form > div:nth-child(1) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(2) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.text-danger").should("exist");
    })

    it("shouldn't show validation on company if selected", () => {
        let expectedCompany = {
            id: 14,
            name: "Apple"
        }
        // Wait for the dropdown to initialize
        cy.wait(4500);
        cy.get("#company", { timeout: 10000 }).should("be.visible").select(`${expectedCompany.name}`).should("have.value", expectedCompany.id);

        cy.get("button[type=submit]").click();

        cy.get("form > div:nth-child(1) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(2) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.text-danger").should("exist");
    })

    it("shouldn't show validation on bank account number if selected", () => {

        cy.get("#accountNumber").type("1234123456");

        cy.get("button[type=submit]").click();

        cy.get("form > div:nth-child(1) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(2) > div.input-errors").should("not.exist");
        cy.get("form > div:nth-child(3) > div.input-errors > div.text-danger").should("exist");
        cy.get("form > div:nth-child(4) > div.input-errors > div.text-danger").should("exist");
    });

    it("should show too long validation message", () => {
        cy.get("#accountNumber").type("123214121233412756874315876543187654318765432187656314876543198761234567890");
        cy.get("button[type=submit]").click();
        cy.get("form > div:nth-child(2) > div.input-errors > div.text-danger").should("contain", "The maximum length allowed is 50");
    });

    it("should create a bank account", () => {
        let expectedCompany = {
            id: 14,
            name: "Apple"
        }
        // Wait for the dropdown to initialize
        cy.wait(4500);
        cy.get("#company", { timeout: 10000 }).should("be.visible").select(`${expectedCompany.name}`).should("have.value", expectedCompany.id);

        cy.intercept("POST", `/api/otc/companies/${expectedCompany.id}/bank-accounts`, { status: 200});

        cy.get("#accountNumber").type("1234123456");
        cy.get("#bankName").type("Test Bank Ltd.");
        cy.get("#accountType").type("Test Type");

        cy.get("button[type=submit]").click();
        cy.should("be.visible", ".c-toast--success");
        cy.get(".c-toast--success").should("contain","Bank account added successfully");
    })
});