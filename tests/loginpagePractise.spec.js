const { test, expect } = require('@playwright/test');
const { LoginPagePractisePage } = require('../pageobjects/LoginPagePractisePage');

test('login to shop page and verify iphone X product', async ({ page }) => {
    const loginPage = new LoginPagePractisePage(page);

    await loginPage.goTo();
    await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
    await loginPage.waitForShopPage();

    await expect(page).toHaveURL(/angularpractice\/shop/);
    const isProductVisible = await loginPage.verifyProductVisible('iphone X');

    expect(isProductVisible).toBeTruthy();
});
