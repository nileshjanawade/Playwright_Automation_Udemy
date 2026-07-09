
const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');
const loginPayload = {userEmail: "neel.janawade9@yopmail.com", userPassword: "Neel@123"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let response;
const fakePayloadOrders = {data:[], message:"No Orders"};

test.beforeAll(async () => 
{
    
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload); //create object for the clss send apiContext as parameter to the constructor    
    response = await apiUtils.createOrder(orderPayload); //call the createOrder method and pass the orderPayload as parameter
});

test.beforeEach(()=>{

})


test('Place the order', async ({page}) => 
{
   
    await page.addInitScript(value => { 
        window.localStorage.setItem('token', value); 

    }, response.token);
const products = page.locator('.card-body');
const productName =  'ZARA COAT 3';
const email = 'neel.janawade@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/');

await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a4241db378febeacdd7bfb2",

    async route=>
    {
        const response = await page.request.fetch(route.request()); 
        let body = JSON.stringify(fakePayloadOrders);//send the response back to browser then it will automatically render on the fromt end 
        route.fulfill(
            {
                response,
                body,
            }
        ) 
        //intercpting the response - API response->!!!{PW  fakeresponse}->browser->render data on frontend
    }
);

await page.locator("button[routerlink*='myorders']").click();
await page.pause();
await page.locator('tbody').waitFor();

const rows = page.locator('tbody tr');

});
