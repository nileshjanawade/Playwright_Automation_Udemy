const {test, expect} = require('@playwright/test');
const { request } = require('node:http');

test('Rahul Shetty Academy login test', async ({page}) => 
{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
page.route('**/*.{jpg,png,jpeg}',route=> route.abort());

// await page.locator('.text-reset').click();
// await page.locator('#firstName').fill('Nilesh');
// await page.locator('#lastName').fill('Janawade');
// await page.locator('#userEmail').fill('neel.janawade9@yopmail.com');
// await page.locator('#userMobile').fill('9901861994');
// await page.locator('#userPassword').fill('Neel@3694');
// await page.locator('#confirmPassword').fill('Neel@3694');
// await page.locator("input[type='checkbox']").check();
// await page.locator('#login').click();
// console.log(await page.locator('.headcolor').textContent());
// await expect(page.locator('.headcolor')).toContainText('Account Created Successfully');
// await page.locator('.btn.btn-primary').click();

const products = page.locator('.card-body');
const productName =  'ZARA COAT 3';
const email = 'neel.janawade9@yopmail.com';

await page.locator('#userEmail').fill(email);
await page.locator('#userPassword').fill('Neel@3694');
await page.locator('#login').click();


// await page.locator('.card-body').waitForLoadState('networkidle');
await page.locator('.card-body').first().waitFor();

const titles = await page.locator('.card-body').allTextContents();
console.log(titles);

page.on('request',request=> console.log(request.url()));
page.on('response', response=>console.log(response.url(), response.status()));
//ZARA Coat 3

const count = await products.count();
for(let i =0 ; i< count; ++i)
    {
        if (await products.nth(i).locator('b').textContent() === productName)
        {
            //add cart

            await products.nth(i).locator('text= Add To Cart').click();
            break;
        }
               
    }

    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator('div li').first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    await page.locator('text=Checkout').click();
    await page.locator("[placeholder*='Country']").pressSequentially('ind');
    const dropdown = page.locator('.ta-results');
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator('button').count();
    for (let i = 0; i < optionsCount; ++i)
    {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text.trim() === 'India')
        {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    expect(await page.locator('.user__name [type="text"]').first()).toHaveText(email);
    await page.locator('.action__submit').click();
    expect (await page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderID =await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator('tbody').waitFor();

    const rows = page.locator('tbody tr');


    for ( let i = 0; i < await rows.count(); ++i)
    {
        const rowOrderID = await rows.nth(i).locator('th').textContent();
        if (orderID.includes(rowOrderID))
        {
            await rows.nth(i).locator('button').first().click();
            break;
        }

    }
        const orderIdDetails = await page.locator('.col-text').textContent();
        expect(orderID.includes(orderIdDetails)).toBeTruthy();



// await page.pause();


});