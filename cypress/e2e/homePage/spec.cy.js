import { mockData } from "../../mockData";

describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.intercept(
      {
        method: 'GET',
        url: '**/weather/forecast?location=Denver*'
      },
      {
        statusCode: 200,
        body: {mockData},
      }
    ).as('getApi');
  });

  it('should intercept the API request after typing Denver', () => {
    cy.get('#search-bar').type('Denver');
    cy.get('#search-btn').click();
    cy.wait('@getApi').then((interception) => {
      
      const { name, timelines } = mockData;

      cy.get('.city-name').should('be.visible').and('contain', name);
      cy.get('.temperature').should('be.visible').and('contain', timelines.minutely[0]?.values?.temperature);
      cy.get('.humidity').should('be.visible').and('contain', timelines.minutely[0]?.values?.humidity);

      
    });
  });
});
