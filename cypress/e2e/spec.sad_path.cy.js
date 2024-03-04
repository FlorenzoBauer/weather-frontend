import { mockData } from "../mockData";

describe('template spec', () => {
  beforeEach( () => {
    cy.visit('localhost:3000')
    cy.intercept(
      {
        method: 'GET',
        url: '**/weather/forecast?location=*'
      },
      {
        statusCode: 400,
        body:  mockData ,
      }
    ).as('getApi');
  })
  it('should display an error if the city is not a valid city', () => {
    cy.get('#search-bar').type('Bob City');
    cy.get('#search-btn').click();
    cy.wait('@getApi')

    cy.get('p').should('contain', 'Error: That city could not be found. Please try again')

  })
  it('should display a specific error message for status code 429', () => {
    cy.intercept(
      {
        method: 'GET',
        url: '**/weather/forecast?location=*'
      },
      {
        statusCode: 429,
        body: 'Rate limit exceeded',
      }
    ).as('getApi429');

    cy.get('#search-bar').type('Some City');
    cy.get('#search-btn').click();
    cy.wait('@getApi429')

    cy.get('p').should('contain', 'Error: Too Many Requests. Please try again later')
  })

  it('should show a 404 page', () => {
    cy.visit('localhost:3000/hobby');
      cy.get('.not-found-heading').should('be.visible').and('contain', '404 - Not Found');
  });

})