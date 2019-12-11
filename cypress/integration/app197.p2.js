context("customer page tests", () => {
  before(function() {
    cy.login();
  });
  beforeEach(function() {
    cy.setCookie("ORA_WWV_PACKAGED_APPLICATIONS", appCookie);
    cy.visit(loggedInPage.replace(":1:", ":2:"));
  });
  it("assert the value of the breadcrumb label page 2", () => {
    cy.get(".t-Breadcrumb-label").should("contain", "Customers");
  });
  it.only("create customer", () => {
    cy.get("[data-cy=create_customerButton]").click();
    cy.handleModal();
    cy.getIframeDom()
      .find("#P7_CUST_FIRST_NAME")
      .type("Hayden");
    cy.getIframeDom()
      .find("#P7_CUST_LAST_NAME")
      .type("Hudson");
    cy.getIframeDom()
      .find("#P7_CUST_POSTAL_CODE")
      .type("02139");
    cy.getIframeDom()
      .find("#P7_CREDIT_LIMIT")
      .type("1000");
    cy.getIframeDom()
      .find("#P7_CUST_STATE")
      .select("Massachusetts");
    cy.getIframeDom()
      .find("[data-cy=add_customerButton]")
      .click();
    cy.contains("td", "Hayden");
  });
});
