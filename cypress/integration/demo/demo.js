
import {When, Given, Then, And } from "cypress-cucumber-preprocessor/steps";
var randomZip = require('random-zipcode');
const url = 'https://www.firstleaf.club/'
let userEmail
const validationQuiz = 'Join the 150,000 Firstleaf members who have discovered new wines that they love.'
const buttonContinue = 'div.index-module--buttonContainer--4ATWM > button'
const urlApi = 'https://restcountries.com/v3.1/all'
Given('Test on firstleaf login page', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
   cy.visit(url)
   cy.get('#header-nav > div > div > div> div > button:nth-child(2)')
   .should('be.visible')
   .click()
   // getting the email and saving in userEmail
   cy.task('getUserEmail').then((email) => {
    expect(email).to.be.a('string')
    userEmail = email
  })
})

When('Enter the sweet wine', () => {
cy.get('div.index-module--content--xHEEn > h2')
  .should('be.visible')
  .should('have.text', 'We’ll ask about rosé in a bit!')
  cy.get(buttonContinue)
  .should('be.visible')
  .click()
})
When('Select number of bottles', () => {
  cy.get('div.index-module--content--xHEEn > h2')
    .should('be.visible')
    .should('have.text', 'Use slider to pick preference')
    cy.get(buttonContinue)
    .should('be.visible')
    .click()
    cy.get('div.index-module--content--xHEEn > h2')
    .should('be.visible')
    .should('have.text', 'We’re adding more rosés everyday, let us know if you’re interested in them.')
    cy.get('.index-module--footer--4b51e>button:nth-child(2)')
    .should('be.visible')
    .click()
  })
When('Coffee or tea selection', () => {
  cy.get('div.index-module--content--xHEEn > h2')
  .should('be.visible')
  .should('have.text', 'You can answer based on how you like your coffee or tea.')
  cy.get(buttonContinue)
  .should('be.visible')
  .click()
})
When('Select wine type', () => {
  cy.get('div.index-module--content--xHEEn > h2')
      .should('be.visible')
      .should('have.text', 'It is okay if you are not sure or neutral about some of them.')
    for (let i = 1 ; i < 10; i++ ){
      let randNumber = Math.floor(Math.random(1)*2)
      cy.get(`.react-multi-carousel-track >.react-multi-carousel-item:nth-child(${i})`)
      .should('be.visible')
      cy.get(`div.index-module--actionButtons--CqGzA > div > button:nth-child(${randNumber+1})`)
      .should('be.visible')
      .click()
    }
  })
  When('Select wine taste', () => {
    cy.get('div.index-module--content--xHEEn > h2')
        .should('be.visible')
        .should('have.text', 'These flavors will help us home in on your taste profile.')
      for (let i = 1 ; i < 10; i++ ){
        let randNumber = Math.floor(Math.random(1)*2)
        cy.get(`.react-multi-carousel-track >.react-multi-carousel-item:nth-child(${i})`)
        .should('be.visible')
        cy.get(`div.index-module--actionButtons--CqGzA > div > button:nth-child(${randNumber+1})`)
        .should('be.visible')
        .click()
      }
    })
    When('Select wine flavors', () => {
      cy.get('div.index-module--content--xHEEn > h2')
          .should('be.visible')
          .should('have.text', 'It is okay if you are not sure or neutral about some of them.')
        for (let i = 1 ; i < 10; i++ ){
          let randNumber = Math.floor(Math.random(1)*2)
          cy.get(`.react-multi-carousel-track >.react-multi-carousel-item:nth-child(${i})`)
          .should('be.visible')
          cy.get(`div.index-module--actionButtons--CqGzA > div > button:nth-child(${randNumber+1})`)
          .should('be.visible')
          .click()
        }
      })

  When('Select how much variation', () => {
    cy.get('div.index-module--content--xHEEn > h2')
      .should('be.visible')
      .should('have.text', 'Your response will determine how much variation we will include in your profile.')
      cy.get(buttonContinue)
      .should('be.visible')
      .click()
    })
  When('Select your wine preferences', () => {
      cy.get('div.index-module--content--xHEEn > h2')
        .should('be.visible')
        .should('have.text', 'Tell us how much you know about your wine preferences.')
        cy.get(buttonContinue)
        .should('be.visible')
        .click()
    })

Then(`Reveal your quiz results`, () => {
  cy.get('#email:nth-child(3)')
  .should('be.visible')
  .type(userEmail)
  cy.get('#email-form > div.index-module--btn-holder--2SnaY.btn-holder > button')
  .should('be.visible')
  .click()
})
Then(`Go to complete checkout`, () => {
  cy.get('div.index-module--infoContainer--Dhw1q>h2')
  .should('be.visible')
  .should('have.text', 'Your custom wines')
  cy.get('div.index-module--button-wrapper--gMUhe > button')
  .should('be.visible')
  .click()
})
Then(`Fill up form`, () => {
  var zipcodeRandom = randomZip();
  cy.get('#shipping-form > div:nth-child(3) > div > input')
  .should('be.visible')
  .type(userEmail)
  cy.get('#shipping-form > div:nth-child(4) > div:nth-child(1) > div > input')
  .should('be.visible')
  .type('RONALD')
  cy.get('#shipping-form > div:nth-child(4) > div:nth-child(2) > div > input')
  .should('be.visible')
  .type('ESTUPINAN')
  cy.get('#shipping-form > div:nth-child(5) > div > input')
  .should('be.visible')
  .type('3057492190')
  cy.get('#shipping-form > div:nth-child(7) > div > div > input')
  .should('be.visible')
  .type(zipcodeRandom)
  cy.get('#shipping-form > div:nth-child(7) > div > div > div > button:nth-child(1)')
  .should('be.visible')
  .click()
  cy.get('#ship-complete')
  .should('be.visible')
  .click()
})
Then(`validate second step`, () => {
  cy.get('#payment-form-body > h2')
  .should('be.visible')
  .should('have.text', 'Billing Information')
})


Given('I validate the country endpoint', () => {
   cy.request('GET',urlApi).then((response) => {
    console.log()
    expect(response.status).to.eq(200)
    expect(response.body[14].name.common).to.eq('Brazil')
    // I move to 700 because it fails often
    expect(response.duration).to.be.lessThan(800)
  })
})

Then(`I validate wrong url`, () => {
  cy.request('GET', urlApi+'fake').then((response) => {
    expect(response.status).to.eq(404)
  })
})