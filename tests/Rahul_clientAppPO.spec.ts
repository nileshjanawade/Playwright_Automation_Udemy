//  const {test, expect} = require('@playwright/test');
//  const {POManager} = require('../Rahul_pageobjects/POManager');

 import {test,expect} from '@playwright/test';
 import {POManager} from '../Rahul_pageobjects_ts/POManager';
 import {customTest} from '../utils_ts/test-base'

const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for (const [index, data] of dataset.entries())
{
 test(`@web Nilesh Client App login for ${data.productName ?? 'unknown'} (${index})`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = "neel.janawade9@yopmail.com";
     const password = "Neel@3694"
     const productName = 'ADIDAS ORIGINAL';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    let orderId:any;
    orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
 });
}
customTest(`Client App login`, async({page,testDataForOrder})=>
{
  const poManager = new POManager(page);
    //js file- Login js, DashboardPage
     const username = "neel.janawade9@yopmail.com";
     const password = "Neel@3694"
     const productName = 'ADIDAS ORIGINAL';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(username,password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(productName);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(productName);
    await cartPage.Checkout();
})
