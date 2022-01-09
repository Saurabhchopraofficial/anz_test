import selectors from '../data/selectors'

describe('Shopping on Automation Practice Website', () => {
  //Generate a random email ID for testing
  const uuid = () => Cypress._.random(0, 1e6)
  const id = uuid()
  const emailID = `random${id}@gmail.com`

  let data;
  
  before('Visit the website', () => {
    cy.visit({
        url: 'http://automationpractice.com',
        failOnStatusCode: false
    });
    cy.fixture('userData.json').then((userData) => {
      data = userData;
    });
  });

  beforeEach('Before Each', () => {
    Cypress.Cookies.preserveOnce('PrestaShop-a30a9934ef476d11b6cc3c983616e364', '1P_JAR');
    
  });

  it('Register the new user', () => {
    cy.get(selectors.signIn).click();
    //Register with the generated test email ID
    cy.get(selectors.emailCreate).clear()
      .type(emailID);
    cy.get(selectors.submitCreate).click();  
      
  })

  it('Fill user details form', { retries: 2 }, () => {
    //Provide all details for registering new user
    cy.get(selectors.genderSelect, { timeout: 10000 }).should('be.visible').check('1');
    cy.get(selectors.firstName).clear().type(data.fName);
    cy.get(selectors.lastName).clear().type(data.lName);
    cy.get(selectors.password).clear().type(data.password)
    cy.get(selectors.day)
      .select('3', { force: true });
    cy.get(selectors.month)
      .select('3', { force: true }); 
    cy.get(selectors.year)
      .select('1993', { force: true });
    cy.get(selectors.newsLetter).check();
    cy.get(selectors.addressFirstName).clear().type(data.fName);
    cy.get(selectors.addressLastName).clear().type(data.lName);
    cy.get(selectors.company).clear().type(data.company);
    cy.get(selectors.address1).clear().type(data.address1);
    cy.get(selectors.address2).clear().type(data.address2);
    cy.get(selectors.city).clear().type(data.city);
    cy.get(selectors.stateId).select(data.stateId);
    cy.get(selectors.postCode).type(data.postCode);
    cy.get(selectors.phone).clear().type(data.phone);
    cy.get(selectors.alias).clear().type(data.alias);
    cy.get(selectors.submitAccount).click();    
  })

  it('Validate on the landing screen - correct name and surname is displayed', { retries: 2 }, () => {
    cy.get(selectors.loggedInUser).should('have.text', `${data.fName} ` + `${data.lName}`);
  })

  it('Log out the new user', () => {
    cy.get(selectors.signOut).click();
  })

  it('Log back in', () => {
    //Call the re-usable login routine defined in support/commands.js
    cy.login(emailID, data.password);
  })

  it('Add a product to cart', () => {
    //Go to Home Page and select the product
    cy.get(selectors.home, { timeout: 10000 }).click();
    cy.get(selectors.product).first().click();
    //Add to Cart
    cy.get(selectors.addToCart).should('be.visible')
    cy.get(selectors.cartSubmit).click();
    cy.get(selectors.checkOut, { timeout: 10000 })
      .should('be.visible')
      .click( {force:true} );
  })

  it('Validate product details on payment page', () => {
    //Proceed with checkout
    cy.get(selectors.proceedCheckOut).should('be.visible')
      .click();
    //Address section
    cy.get(selectors.orderText).clear().type(data.shippingInstructions);
    cy.get(selectors.addressBtn).click();
    //Shipping information section
    cy.get(selectors.shipCheck).check();
    cy.get(selectors.carrier).click();
    //Validate the correct product got added to the cart
    cy.get(selectors.productInCart).should('have.text', data.productName);
  })

})