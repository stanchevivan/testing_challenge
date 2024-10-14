const {By} = require('selenium-webdriver');
const { BasePage } = require('../basePage');

class CheckoutCompletePage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }

      get #successfulOrderHeader () { return this.world.driver.findElement(By.css('[data-test="complete-header"]')); }
            
    async isSuccessfulOrderHeaderVisible() {
        return await this.#successfulOrderHeader.isDisplayed()
    }
}

module.exports = {CheckoutCompletePage};