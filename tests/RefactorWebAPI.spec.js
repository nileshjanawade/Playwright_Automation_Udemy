
const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('./utils/APIUtils');
const loginPayload = {userEmail: "neel.janawade@gmail.com", userPassword: "Neel@123"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let response;

test.beforeAll(async () => 
{
    
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload); //create object for the clss send apiContext as parameter to the constructor    
    response = await apiUtils.createOrder(orderPayload); //call the createOrder method and pass the orderPayload as parameter
});

test.beforeEach(()=>{

})


test('Rahul Shetty Academy login test', async ({page}) => 
{
   
    await page.addInitScript(value => { 
        window.localStorage.setItem('token', value); 

    }, response.token);
const products = page.locator('.card-body');
const productName =  'ZARA COAT 3';
const email = 'neel.janawade@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');


    for ( let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderID = await rows.nth(i).locator('th').textContent();
        if (response.orderId.includes(rowOrderID))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }

    }
        const orderIdDetails = await page.locator('.col-text').textContent();

        expect(response.orderId.includes(orderIdDetails)).toBeTruthy();



// await page.pause();


});