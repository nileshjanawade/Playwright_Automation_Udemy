 const {test, expect} = require("@playwright/test");
 const {customtest} = require('../utils/test-base');

 const {POManager} = require("../Rahul_pageobjects/POManager");

const dataset = JSON.parse(JSON.stringify(require('../utils/placeOrderTestData.json')));

for(const data of dataset)
{
 test(`Client App login for ${data.productname}`, async ({page})=>
 {
   const poManager = new POManager(page);
    //js file- Login js, DashboardPage
    //  const username = "neel.janawade9@yopmail.com";
    //  const password = "Neel@3694"
    //  const productName = 'Zara Coat 3';
     const products = page.locator(".card-body");
     const loginPage = poManager.getLoginPage();
     await loginPage.goTo();
     await loginPage.validLogin(data.username,data.password);
     const dashboardPage = poManager.getDashboardPage();
     await dashboardPage.searchProductAddCart(data.productname);
     await dashboardPage.navigateToCart();

    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productname);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
   console.log(orderId);
   await dashboardPage.navigateToOrders();
   const ordersHistoryPage = poManager.getOrdersHistoryPage();
   await ordersHistoryPage.searchOrderAndSelect(orderId);
   expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

 });


// customtest.skip("base Client App login scenarios 1", async({page,testDataForOrder})=>
//  {
//    const poManager = new POManager(page);
//     //js file- Login js, DashboardPage
//     //  const username = "neel.janawade9@yopmail.com";
//     //  const password = "Neel@3694"
//     //  const productName = 'Zara Coat 3';
//      const products = page.locator(".card-body");
//      const loginPage = poManager.getLoginPage();
//      await loginPage.goTo();
//      await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
//      const dashboardPage = poManager.getDashboardPage();
//      await dashboardPage.searchProductAddCart(testDataForOrder.productname);
//      await dashboardPage.navigateToCart();

//     const cartPage = poManager.getCartPage();
//     await cartPage.VerifyProductIsDisplayed(testDataForOrder.productname);
//     await cartPage.Checkout();
//  });
 
}
 

 



 

