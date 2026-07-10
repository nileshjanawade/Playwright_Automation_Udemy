class DashBoardPage {

    constructor(page) {

        this.page = page;
        this.products = page.locator('.card-body');
        this.productsText = page.locator('.card-body b');
        this.cart = page.locator("[routerlink='/dashboard/cart']");
    }

    async searchProductAddCart(productName) {
       
        // await this.products.waitFor({state: 'visible'});
          await this.page.waitForTimeout(2000);
        const titles = await this.productsText.allTextContents();
        console.log(titles);

        const count = await this.products.count();
        for (let i = 0; i < count; ++i) {
            if ((await this.products.nth(i).locator('b').textContent()).trim() === productName) {
                //add cart
                // await this.page.waitForTimeout(2000);
                const addToCartBtn = await this.products.nth(i).locator('text=Add To Cart');
                // await addToCartBtn.waitFor({ state: 'visible' });
                await addToCartBtn.click();
                // await this.page.waitForTimeout(2000);
                // await this.products.nth(i).locator('text= Add To Cart').click();
                break;
            }

        }

    }

    async navigateToCart() {
        await this.cart.click();
                
    }
}
module.exports = { DashBoardPage };