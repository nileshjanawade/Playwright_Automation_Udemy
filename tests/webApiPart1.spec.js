// Skipping login manually in every test.
// Normally, a user logs in → the app generates a token → stores it in localStorage → user is "authenticated."
// Instead of clicking through the login form every single test, you:

// Get a valid token (from an API call or a saved test token)
// Inject it directly into localStorage using addInitScript
// When the page loads, the app sees the token already there and thinks: "This user is already logged in!"

const {test, expect, request} = require('@playwright/test');

const loginPayload = {userEmail: "neel.janawade@gmail.com", userPassword: "Neel@123"};
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eae1c941646b7a8b3ed3"}]}
let token;
let orderId;

test.beforeAll(async () => {
    // beforeAll->A Playwright hook that pruns once, 
    // before all tests in this file — not before each individual test (that would be beforeEach)
    const apiContext = await request.newContext();//Request->Playwright's built-in API testing tool — lets you make HTTP requests (GET, POST, etc.) directly, without opening a browser
    const loginResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', 
        
        {data: loginPayload});

expect(loginResponse.ok()).toBeTruthy();
const loginResponseJson = await loginResponse.json();
token = loginResponseJson.token;
console.log(token);

const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
    {
        data: orderPayload,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        },
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    
});

test.beforeEach(()=>{

})


test('Rahul Shetty Academy login test', async ({page}) => 
{

    await page.addInitScript(value => { 
        //Injects JavaScript code into the page, which runs before the website's own scripts load
        window.localStorage.setItem('token', value); // value)Saves data into the browser's localStorage with the key 'token' and the value passed in

    }, token);//This is the actual data we're sending into the function. Whatever is stored in the token variable outside gets passed in as value inside the function

const products = page.locator('.card-body');
const productName =  'ZARA COAT 3';
// const email = 'neel.janawade9@yopmail.com';
const email = 'neel.janawade@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/');

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');


    for ( let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderID = await rows.nth(i).locator('th').textContent();
        if (orderId.includes(rowOrderID))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }

    }
        const orderIdDetails = await page.locator('.col-text').textContent();
        await page.pause();
        expect(orderId.includes(orderIdDetails)).toBeTruthy();



// await page.pause();


});