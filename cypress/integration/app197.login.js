context("login page tests", () => {
  beforeEach(function() {
    cy.server();
    cy.route("POST", "/ords/wwv_flow.ajax").as("load");
    cy.visit("f?p=197:LOGIN_DESKTOP");
    cy.url().should("contain", "197:LOGIN_DESKTOP");
    cy.get(".t-Login-header").should("contain", "Sample Database Application");
    var userName = Cypress.env("username");
    expect(userName, "username set").to.be.a("string").and.not.be.empty;
    cy.get("#P101_USERNAME")
      .type(userName)
      .should("have.value", userName);
  });
  it("plain login", () => {
    var passWord = Cypress.env("password");
    cy.get("#P101_PASSWORD").type(passWord, { log: false });
    cy.get("#P101_LOGIN").click();
    cy.url().should("contain", "197:2");
    cy.get(".t-HeroRegion-title").should(
      "contain",
      "Sample Database Application"
    );
    cy.wait("@load");
  });
  it.skip("bad password", () => {
    var passWord = "wrong password";
    cy.get("#P101_PASSWORD").type(passWord, { log: false });
    cy.get("#P101_LOGIN").click();
    cy.get(".t-Alert-body").should("contain", "Invalid Login Credentials");
  });
});
