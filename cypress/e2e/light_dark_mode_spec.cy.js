describe('Light and Dark Mode', () => {
  it('switches between light and dark mode successfully', () => {
    cy.visit('http://localhost:3003'); 
    cy.viewport(1440, 900);
    cy.get('.app').should('have.attr', 'id', 'dark');

    // Test for Light Mode
    cy.get('.react-switch-handle').click();
    cy.get('.app').should('have.attr', 'id', 'light'); 

    // Test for Dark Mode
    cy.get('.react-switch-handle').click(); 
    cy.get('.app').should('have.attr', 'id', 'dark'); 
  });
});