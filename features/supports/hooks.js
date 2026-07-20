const { playwright } = require('@playwright/test');
const { chromium } = require('playwright');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')
const { POManager } = require('../../Rahul_pageobjects/POManager');

Before( async function () {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});

// Before( {tags: "@foo and @Validation"},async function () {
//     const browser = await chromium.launch({ headless: false });
//     const context = await browser.newContext();
//     this.page = await context.newPage();
//     this.poManager = new POManager(this.page);
// });

BeforeStep(function () {


});

AfterStep(async function ({ result }) {

    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'Screenshot1.png' });
    }

})

After(function () {

    console.log("I am last to execute");

})