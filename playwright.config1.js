// @ts-check
const { devices } = require('@playwright/test');
const { setupPrimary } = require('node:cluster');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries : 1,
  workers : 3,
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000,
  },
  reporter: 'html',
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off', // only-on-failure, off, on
        trace: 'on',//off, on
      //  ...devices['iPhone 17'],
      }

    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on', // only-on-failure, off, on
         video : 'retain-on-failure',
        ignoreHttpsErrors:true,
        permissions: ['geolocation'],
        trace: 'on',//off, on
         viewport : {width:720,height:720}
      }
    }


  ]
  ,

});

module.exports = config
//npx playwright test tests/OtherRahulsheetyAcademy.spec.js --config playwright.config1.js


// allure report setup
// npm i -D allure-playwright 

// npx playwright test --grep "@Web" --reporter=line,allure-playwright

// npm install -g allure-commandline

// allure --version

// allure generate ./allure-results --clean 
// Report successfully generated to allure-repor

// allure open .\allure-report\