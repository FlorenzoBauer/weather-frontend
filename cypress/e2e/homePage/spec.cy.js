import { data, mockData } from "../../mockData";

describe('Weather Pal', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.intercept(
      {
        method: 'GET',
        url: '**/weather/forecast?location=*'
      },
      {
        statusCode: 200,
        body:  mockData ,
      }
    ).as('getApi');
  });

  it('should intercept the API request after typing Denver', () => {
    cy.get('#search-bar').type('Denver');
    cy.get('#search-btn').click();
    cy.wait('@getApi').then(() => {
      const { location, timelines } = mockData;
      
      cy.get('.city-name').should('be.visible').and('contain', location.name);
      cy.get('.temperature').should('be.visible').and('contain', timelines.minutely[0]?.values?.temperature);
      cy.get('.humidity').should('be.visible').and('contain', timelines.minutely[0]?.values?.humidity);
    });
  });
  it('should show a 404 page', () => {
    cy.visit('localhost:3000/hobby');
      cy.get('.not-found-heading').should('be.visible').and('contain', '404 - Not Found');
  });
  it('should be able to view a random city', () => {
    cy.get('#random-city-btn').click()
    cy.wait('@getApi')
    cy.get('.card').should('be.visible')
  })
  it('should be able to save a city', () => {
    cy.get('#search-bar').type('Denver');
    cy.get('#search-btn').click();
    cy.wait('@getApi')
    cy.get('#fav-btn').click()
    cy.get('#home-btn').click()
    cy.get('.home-card').should('contain', 'Denver')
  })

  it('should visit potato world', () => {
    cy.visit('localhost:3000/potato')
    cy.get('.potato-title').should('exist').and('contain', 'Welcome to Potato World')
  })
});
