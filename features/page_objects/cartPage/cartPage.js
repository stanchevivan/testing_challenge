const {By} = require('selenium-webdriver');
const {CartItemComponent} = require('./cartItemComponent');
const {filterAsync} = require('../../support/helper');
const { BasePage } = require('../basePage');

class CartPage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }

      #allItemsSelector = By.css('[data-test="inventory-item"].cart_item')
      get #checkoutButton () { return this.world.driver.findElement(By.css('[data-test="checkout"]')); }
      
    async goToCheckout() {
        await this.#checkoutButton.click();
    }

    async itemsList() {
        let itemElements = await this.world.driver.findElements(this.#allItemsSelector);
        return await itemElements.map((p) => new CartItemComponent(this.world, p));
    }
       
    async getNumberOfItems() {
        return (await this.itemsList()).length
    }

    async getItemByIndex(index) {
        let result = (await this.itemsList())[index]

        if (!result) {
            throw new Error(`Item with index ${index} not found !`)
        }

        return result
    }

    async getItemByName(name) {
        let result = (await filterAsync(await this.itemsList(), async product => {
            return await product.getName() === name
        }))[0]

        if (!result) {
            throw new Error(`Product with name ${name} not found !`)
        }

        return result
    }

    async getItems() {
        
    }

}

module.exports = {CartPage};