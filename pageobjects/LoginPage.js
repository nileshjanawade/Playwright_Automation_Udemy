class LoginPage {


    constructor(page) {

        this.page = page;
        this.signInButton = page.locator('#login');
        this.userName = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
    }

    async goto(){
       await this.page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    }

    async validLogin(email, password) {

        await this.userName.fill(email);
        await this.password.fill(password);
        await this.signInButton.click();
    }
}

module.exports = {LoginPage};