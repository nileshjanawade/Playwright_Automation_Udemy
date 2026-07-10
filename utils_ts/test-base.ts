
import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username : string ;
    password : string ;
    productName : string;
};

export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
 testDataForOrder : {

    username : "neel.janawade7@yopmail.com",
    password : "Neel@3694",
    productName : "ADIDAS ORIGINAL"
}
})