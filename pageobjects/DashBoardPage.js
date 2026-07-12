class DashBoardPage{

    constructor(page){

        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink='/dashboard/cart']");

        this.addcartsuccessmsg = page.locator('.toast-bottom-right');
    }
    
async searchProductAddCart(productName){

    await this.page.waitForTimeout(2000);
    const titles = await this.productsText.allTextContents();
    console.log(titles);
      
    const count = await this.products.count();
    for(let i =0 ; i< count; ++i)
        {
            if ((await this.products.nth(i).locator('b').textContent()).trim() === productName)
            {
                //add cart
            
                await this.products.nth(i).locator('text= Add To Cart').click();                
                break;
            }
                   
        }
        // const addCartSuccessMsg = await this.addcartsuccessmsg.textContent();
        // console.log(addCartSuccessMsg);
}

async navigateToCart(){
    await this.cart.click();
}

}
module.exports = {DashBoardPage};
