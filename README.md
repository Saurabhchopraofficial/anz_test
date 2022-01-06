# anz_test
ANZ Test repository

#Pre-requisites:
Node.js should be installed on local machine.

To run the tests: 

1. Clone the repostory to your local machine
2. Run the following command on terminal in VS Code (or any code editor) to install dependencies, including Cypress:
    npm install
3. To run the test in GUI mode, run the following command:
    npm cy:open
4. On the Cypress UI, click the test you need to run (e.g in this case Shopping Cart):
    shopping_test.js
5. To run test script in headless mode on Chrome, run the following command:
    npm cy:run:e2e
    

