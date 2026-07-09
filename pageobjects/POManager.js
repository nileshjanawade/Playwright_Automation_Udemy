const {DashBoardPage} = require('./DashBoardPage');
const {LoginPage} = require('./LoginPage');

class POManager{


    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(page);
        this.dashbaordPage = new DashBoardPage(page);

    }

    getLoginPage(){
        return this.loginPage;
    }

    getDashbaordpage(){
        return this.dashbaordPage;
    }
}
module.exports = {POManager};