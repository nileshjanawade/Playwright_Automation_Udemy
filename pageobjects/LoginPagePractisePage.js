class LoginPagePractisePage {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.termsCheckbox = page.locator('#terms');
        this.signInButton = page.locator('#signInBtn');
    }

    async goTo() {
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.termsCheckbox.check();
        await this.signInButton.click();
    }

    async waitForShopPage() {
        await this.page.waitForURL(/angularpractice\/shop/);
    }

    async verifyProductVisible(productName) {
        const productLocator = this.page.locator('h4').filter({ hasText: productName });
        await productLocator.waitFor();
        return productLocator.isVisible();
    }
}

module.exports = { LoginPagePractisePage };
