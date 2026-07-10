const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageobjects/LoginPage');
const { DashBoardPage } = require('../pageobjects/DashBoardPage');

test('Rahul Shetty Academy login test', async ({ page }) => {

    const productName = "iphone 13 pro";
    const email = 'neel.janawade9@yopmail.com';
    const password = 'Neel@3694';

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.validLogin(email, password);

    const dashbaord = new DashBoardPage(page);
    await dashbaord.searchProductAddCart(productName);
    await dashbaord.navigateToCart();

    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('iphone 13 pro')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text.trim() === 'India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    expect(await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderID = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator('th').textContent();
        if (orderID.includes(rowOrderID)) {
            await rows.nth(i).locator('button').first().click();
            break;
        }

    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();

    // await page.pause();


});