// @ts-check
const { devices } = require('@playwright/test');


/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  
  timeout: 40 * 1000,
    expect: {
          timeout: 40 * 1000,
    },
    reporter: [
      ['html'],
      ['allure-playwright'],
    ],
  use: {

    browserName: 'chromium',  
    headless: false ,
    screenshot: 'on', // only-on-failure, off, on
    trace: 'on',//off, on


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
  
  },

});
 
module.exports = config
