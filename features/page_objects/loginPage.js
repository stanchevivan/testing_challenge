const {By} = require('selenium-webdriver');
const { BasePage } = require('./basePage');

class LoginPage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }
    get #userNameInput () { return this.world.driver.findElement(By.css('[data-test="username"]')); }
    get #passwordInput () { return this.world.driver.findElement(By.css('[data-test="password"]')); }
    get #loginButton () { return this.world.driver.findElement(By.css('[data-test="login-button"]')); }

    async login(userName, password) {
        await this.#userNameInput.clear()
        await this.#userNameInput.sendKeys(userName)

        await this.#passwordInput.clear();
        await this.#passwordInput.sendKeys(password);
        //TODO use wait instead of sleep
        await this.world.driver.sleep(100)

        await this.#loginButton.click()
        //TODO use wait instead of sleep
        await this.world.driver.sleep(400)
    }

}

module.exports = {LoginPage};