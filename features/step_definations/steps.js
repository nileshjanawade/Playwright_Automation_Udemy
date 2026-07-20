const { When, Then, Given } = require('@cucumber/cucumber')
const { POManager } = require('../../Rahul_pageobjects/POManager');
const { expect } = require('@playwright/test');
const { playwright } = require('@playwright/test');
// const { expect } = require('@playwright/test');
const { chromium } = require('playwright');


Given('a login to Ecommerce application with {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {
    // Write code here that turns the phrase above into concrete actions

    // const browser = await chromium.launch({ headless: false});
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // this.poManager = new POManager(page);

    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
});

When('Add {string} to cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();

});

Then('Verify {string} is displayed in the Cart', async function (productName) {
    // Write code here that turns the phrase above into concrete actions
    const cartPage = this.poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
});

When('Start to type your When step here Enter valid details and Place the order', async function () {
    // Write code here that turns the phrase above into concrete actions
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});

Then('Verify order in present in the OrderHistory', async function () {
    // Write code here that turns the phrase above into concrete actions
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


Given('a login to Ecommerce2 application with {string} and {string}', async function (username, password) {
    // Write code here that turns the phrase above into concrete actions
    
    const userName = this.page.locator('#username');
    const passWord = this.page.locator('input[name="password"]');
    const signInButton = this.page.locator('#signInBtn');
    const cardTitles = this.page.locator('.card-body a');

    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await this.page.title());
    await expect(this.page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    //css selector
    await userName.fill(username);
    await passWord.fill(password);
    await signInButton.click();
});

Then('verify Error  message is displayed', async function () {
    // Write code here that turns the phrase above into concrete actions
    //extract the error from text and print it in console
    console.log(await this.page.locator('[style*="block"]').textContent());
    await expect(this.page.locator('[style*="block"]')).toContainText('Incorrect');
});
