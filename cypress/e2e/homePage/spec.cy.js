import { mockData } from "../../mockData";

describe('template spec', () => {
  it('should intercept the API request after typing Denver', () => {
    // Intercept the API request
    cy.intercept('GET', '**/weather/forecast?location=Denver*', {
      statusCode: 200,
      body: mockData,
    }).as('getWeather');

    cy.visit('http://localhost:3000');

    // Type "Denver" into the search bar
    cy.get('#search-bar').type('Denver');

    // Click the search button (adjust the selector accordingly)
    cy.get('#search-btn').click();

    // Wait for the stubbed request to complete
    cy.wait('@getWeather').then((interception) => {
      // Log the intercepted request and response for debugging
      cy.log('Intercepted Request:', interception.request);
      cy.log('Intercepted Response:', interception.response);

      // Log the structure of mockData
      cy.log('MockData:', mockData);

      // Log the content of the page to see if .city-name is present
      cy.log('Page Content:', cy.state('document'));

      // Your assertions based on the modified mockData structure
      cy.get('.city-name').should('be.visible').and('contain', mockData.name);
      cy.get('.temperature').should('be.visible').and('contain', mockData.timelines.minutely[0]?.values?.temperature);
      cy.get('.humidity').should('be.visible').and('contain', mockData.timelines.minutely[0]?.values?.humidity);

      // Continue with your test logic
    });
  });
});
