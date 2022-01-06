# anz_test
ANZ Test repository for Shopping Cart test.

#Pre-requisites:
Node.js should be installed on local machine.

How to run the test:

1. Clone the project to your local machine.

2. Run the following command to install dependencies (including Cypress):
    
    npm install
    
3. To run the test in UI mode, run the following command-

    npm run cy:open
    
4. On the Cypress UI, click the test you need to run (e.g in this case Shopping Cart)-
    shopping_test.js
    
5. To run test script on Chrome in headless mode, run the following command-

    npm run cy:run:chrome
    
6. To run test script on Electron browser in headless mode, run the following command-

    npm run cy:run
