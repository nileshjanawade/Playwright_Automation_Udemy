const {test, expect} = require('@playwright/test');

test('@nil Calender validations from path2usa', async ({page}) => 
{

const monthNumber = 12;
const yearNumber = 2026;
const date = 22;

await page.goto('https://www.path2usa.com/travel-companions');
await page.locator('#form-field-travel_comp_date').click();
});

test('Calender validations from rahulshetty', async ({page}) => 
{
const monthNumber = '12';
const date = '22';
const yearNumber = '2028';
const expectedList = [monthNumber, date, yearNumber];

await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    await page.locator('.react-date-picker__inputGroup').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.locator('.react-calendar__navigation__label__labelText--from').click();
    await page.getByText(yearNumber).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNumber)-1).click(); 
    await page.locator('//abbr[text()="' + date + '"]').click();
    const inputs = page.locator('.react-date-picker__inputGroup__input');

    for (let i = 0; i < expectedList.length; ++i)
    {
        const actualValue = await inputs.nth(i).inputValue();
        expect(actualValue).toEqual(expectedList[i]);
    }
});