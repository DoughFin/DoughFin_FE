import BasicSelect from "../../src/components/CashFlow/BasicSelect";


// it("should have a main container", () => {
  //   cy.get(".cashflow").should("exist");
  // });


describe('CashFlow', () => {
  beforeEach(() => {
      cy.intercept("POST", "http://localhost:3000/graphql", {
        statusCode: 401,
        fixture: "data"
      });
      cy.visit("http://localhost:3003");
    })
    // Visit the page or component containing the CashFlow component
  });

  it('renders the CashFlow component with correct elements', () => {
    // Check if the CashFlow component is rendered
    cy.get('.cashflow').should('exist');

    // Check if the header elements are rendered
    cy.get('.cashflow-header').should('exist');
    cy.get('.cashflow-h1').should('exist').and('have.text', 'Cash Flow');
    cy.get('.cashflow-header-income').should('have.length', 2); // Check for two income headers
    cy.get('.cashflow-header-text').should('have.length', 2); // Check for two header texts
    cy.get('.cashflow-header-income img').should('have.length', 2); // Check for two income header images
  });
