const { test, expect } = require('@playwright/test');
const { log } = require('node:console');

test('Security test request intercept', async ({ page }) => {
    //login and reach order page
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill('neel.janawade9@yopmail.com');
    await page.locator('#userPassword').fill('Neel@3694');
    await page.locator('#login').click();
    await page.locator('.card-body').first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    //security test breach by changing the url
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",

        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a4b987185b8849b4cbvf177a' }))
    await page.locator("button:has-text('View')").first().click();
    const text = await page.locator('.blink_me').last().textContent();
    console.log(text);

});