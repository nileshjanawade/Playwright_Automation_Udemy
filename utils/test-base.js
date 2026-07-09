const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
 testDataForOrder : {

    username : "neel.janawade7@yopmail.com",
    password : "Neel@3694",
    productname : "Zara Coat 3"
}
})