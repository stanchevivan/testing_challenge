const { Given, Then } = require('@cucumber/cucumber');
const {LoginPage} = require('../page_objects/loginPage');
const { BasePage } = require('../page_objects/basePage');
const { getUrlForEnvironment } = require('../support/helper');
const fs = require('fs');
require('dotenv').config()

Given('User logs in with username {string}', async function (userName) {
    const jsonFilePath = './credentials.json';
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    const users = JSON.parse(data).users;
    const user = users.find(user => user.username === userName);
    
    if (user) {
        loginPage = new LoginPage(this);
        await loginPage.login(user.username, user.password);
    } else {
        throw new Error(`User ${userName} not found`);
    }
});


Given('I open {string} page', async function (page) {
    let baseUrl = getUrlForEnvironment(process.env.ENVIRONMENT);
    let url;
    switch(page.toLowerCase()){
        case "login": 
            url = baseUrl
            break;
        case "inventory": 
            url = baseUrl + '/inventory.html'
            break;
        case "cart": 
            url = baseUrl + '/cart.html'
            break;
        default: 
            throw new Error(`URL ${url} not handled !`)
    }
    
    await this.driver.get(url);
});

Then('I logout', async function() {
    await new BasePage(this).logout();
})
