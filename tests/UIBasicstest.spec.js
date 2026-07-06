const {test,expect} = require('@playwright/test');

test('Brower context Playwright test', async ({browser}) =>
{
    
  const context = await browser.newContext();
  const page =await context.newPage();
  await page.goto('https://mycampusforum.com/');
  console.log(await page.title());
//   expect(page).toHaveTitle("My Campus Forum — AI-Powered Alumni Network Platform");

});

test('Page Playwright test', async ({page}) =>
{

    const userName = page.locator('#username');
    const password = page.locator('input[name="password"]');
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

    // page.route('**/*.css',route=> route.abort());
    // page.route('**/*.{jpg,png,jpeg}',route=> route.abort());
  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
   await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");
   
   //css selector
   await page.locator('#username').fill('rahulshetty');
   await page.locator('input[name="password"]').fill('learning');
   await page.locator('#signInBtn').click();
   
   //extract the error from text and print it in console
   console.log(await page.locator('[style*="block"]').textContent());
   await expect(page.locator('[style*="block"]')).toContainText('Incorrect');
   
   //type - fill
   await userName.fill('');
   await userName.type('rahulshettyacademy');
   await signInButton.click();
  
   //extract error of old password 
   await expect(page.locator('.alert.alert-danger.col-md-12')).toContainText('Old password');
   console.log(await page.locator('.alert.alert-danger.col-md-12').textContent());

   //type - fill
   await password.fill('');
   await password.type('Learning@830$3mK2');
   await signInButton.click();

//    console.log(await page.locator(".card-body a").textContent());
//    console.log(await cardTitles.first().textContent());
//    console .log(await cardTitles.nth(1).textContent());
   const allCardTitles = await cardTitles.allTextContents();
   console.log(allCardTitles);
});

test('UI Controls', async ({page}) => 
{

    const userName = page.locator('#username');
    const password = page.locator('input[name="password"]');
    const signInButton = page.locator('#signInBtn');

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await userName.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
 
  //dropdown selection
  const dropdown = page.locator('select.form-control');
    await dropdown.selectOption('consult');

 //Radio button selection
  await page.locator('.radiotextsty').last().click();
  await page.locator('#okayBtn').click();

  //assertion where we selected the radio button
  console.log(await page.locator('.radiotextsty').last().isChecked());
  await expect(page.locator('.radiotextsty').last()).toBeChecked();
 
 await page.locator('#terms').click();
 await expect(page.locator('#terms')).toBeChecked();
 await page.locator('#terms').uncheck();
 expect( await page.locator('#terms').isChecked()).toBeFalsy();

 //blinking text
 const blinkingText = page.locator("a[href*='documents-request']");
await expect(blinkingText).toHaveAttribute('class','blinkingText');
 
 
 //await page.pause();


});

test('Child window handling', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    const documentLink =  page.locator("[href*='documents-request']");

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]) // new page 

    const text = await newPage.locator('.red').textContent();
    console.log(text);
    const arrayText = text.split('@');
    console.log(arrayText);
    const domain = arrayText[1].split(' ')[0];
    console.log(domain);

    await page.locator('#username').fill(domain);
   
    console.log(await page.locator('#username').inputValue());

     //await page.pause();
});
