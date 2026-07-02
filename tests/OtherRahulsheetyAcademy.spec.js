const {test, expect} = require('@playwright/test');

test('Rahul Shetty Academy login test', async ({page}) => 
{
await page.goto('https://rahulshettyacademy.com/client/#/auth/login');

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

await page.getByPlaceholder('email@example.com').fill(email);
await page.getByPlaceholder('enter your passsword').fill('Neel@3694');
await page.getByRole('button', {name: 'Login'}).click();

// await page.locator('.card-body').waitForLoadState('networkidle');
await page.locator('.card-body').first().waitFor();

const titles = await page.locator('.card-body').allTextContents();
console.log(titles);

//ZARA Coat 3
await page.locator('.card-body').filter({hasText: productName}).getByRole('button', {name: 'Add To Cart'}).click();

    await page.getByRole('listitem').getByRole('button', {name: 'Cart'}).click();

    await page.locator('div li').first().waitFor();
    await expect(page.getByText('ZARA COAT 3')).toBeVisible();

   await page.getByRole('button', {name: 'Checkout'}).click();
   await page.getByPlaceholder('Select Country').pressSequentially('ind');


    await page.getByRole('button', {name: 'India'}).nth(1).click();   
    await page.getByText('PLACE ORDER').click();

    expect (await page.getByText(' Thankyou for the order. ')).toBeVisible();
   
    
// await page.pause();


});