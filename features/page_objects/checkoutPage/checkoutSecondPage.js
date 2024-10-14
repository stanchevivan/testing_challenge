const {By} = require('selenium-webdriver');
const {extractAmount} = require('../../support/helper');
const assert = require('assert')
const { BasePage } = require('../basePage');

class CheckoutSecondPage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }
      get #subtotalText () { return this.world.driver.findElement(By.css('[data-test="subtotal-label"]')); }
      get #finishButton () { return this.world.driver.findElement(By.css('[data-test="finish"]')); }
      
    async getSubTotal() {
        return await extractAmount(await this.#subtotalText.getText())
    }

    async finishCheckout() {
        this.#finishButton.click()
    }

    async verifyOrder() {
        let expectedPrice = 0;
        for (const item of this.world.itemsInCart) {
            expectedPrice += parseFloat(await extractAmount(await item.price));
        }

        assert.equal(expectedPrice, await this.getSubTotal())
    }
}

module.exports = {CheckoutSecondPage};