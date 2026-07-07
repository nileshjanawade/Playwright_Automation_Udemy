const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelFile(searchText,replaceText,change,filePath) {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcelFile(worksheet, searchText);

const cell = worksheet.getCell(output.row, output.column);
cell.value = replaceText;
await workbook.xlsx.writeFile(filePath);
}


async function readExcelFile(worksheet, searchText) {

    let output = {row:-1,column:-1};

    worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if( cell.value === searchText) {
            output.row = rowNumber;
            output.column = colNumber;
            }
        })
    
    })
     return output;

}



test('Upload download excel validation', async ({page}) => {

    const textSearch = "Mango";
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    
    const downloadPromise = page.waitForEvent('download');
    
    page.getByRole('button',{name:'Download'}).click();
    const dl = await downloadPromise;
    
    await writeExcelFile(textSearch,updateValue,{rowchange : 0, colChange:0},"C:\\Users\\Nilesh Janawade\\Downloads\\download.xlsx");
    
    // await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles('C:\\Users\\Nilesh Janawade\\Downloads\\download.xlsx'); 

    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has :textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);



})