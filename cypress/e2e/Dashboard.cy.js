import BasicSelect from "../../src/components/CashFlow/BasicSelect";

beforeEach(() => {
  cy.intercept("POST", "http://localhost:3000/graphql", {
    statusCode: 401,
    fixture: "data"
  });
  cy.visit("http://localhost:3003");
})

describe("Dashboard", () => {
  it("Checks for text on left sidebar", () => {
    cy.contains("Powdered Toast Man");
    cy.contains("Dashboard");
    cy.contains("Activity");
    cy.contains("Accounts");
    cy.contains("Settings");
  })

  it("should have a main container", () => {
    cy.get(".cashflow").should("exist");
  });

  it("should have a Cash Flow header", () => {
    cy.get(".cashflow-header").should("exist");
  });

  it("should have a Cash Flow title", () => {
    cy.get(".cashflow-h1").should("exist").and("have.text", "Cash Flow");
  });

  it("should have an Income header", () => {
    cy.get(".cashflow-header-income").contains(".cashflow-header-text", "Income").should("exist");
  });

  it("should have an Expense header", () => {
    cy.get(".cashflow-header-income").contains(".cashflow-header-text", "Expenses").should("exist");
  });

  it('should have a BasicSelect dropdown', () => {
    cy.get(".MuiBox-root").should("be.visible").click()

    cy.get('li').first().invoke("attr", "data-value").should("eq", "2022");
    cy.get('li').last().invoke("attr", "data-value").should("eq", "2024");
  });

  it("should have bar chart elements", () => {
    cy.get(".css-16ktrx5-MuiResponsiveChart-container").should("exist");
    cy.get(".css-13aj3tc-MuiChartsSurface-root").should("exist");
    cy.get(".MuiChartsAxis-directionX").should("be.visible");
    cy.get(".MuiChartsAxis-directionY").should("be.visible");
  });
})

//example commands to use when writing tests
  // cy.contains('type').click()
    // cy.url().should('include', '/commands/actions')
    // cy.get('.action-email').type('fake@email.com')
    // cy.get('.action-email').should('have.value', 'fake@email.com')