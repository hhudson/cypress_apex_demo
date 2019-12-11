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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add("login", () => {
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
  var passWord = Cypress.env("password");
  cy.get("#P101_PASSWORD").type(passWord, { log: false });
  cy.get("#P101_LOGIN").click();
  cy.url()
    .should("contain", "197:1")
    .then($url => {
      window.loggedInPage = $url;
    });
  cy.getCookie("ORA_WWV_PACKAGED_APPLICATIONS").then($cookie => {
    window.appCookie = $cookie.value;
  });
});
Cypress.Commands.add("handleModal", () => {
  cy.get(".ui-dialog").invoke("css", "height", "500px");
  cy.get("iframe").then(iframe => {
    return new Cypress.Promise(resolve => {
      iframe.on("load", () => {
        resolve(iframe.contents().find("body"));
      });
    });
  });
});
Cypress.Commands.add("getIframeDom", () => {
  cy.get("iframe")
    .invoke("contents")
    .invoke("find", "body")
    .then(cy.wrap);
});
