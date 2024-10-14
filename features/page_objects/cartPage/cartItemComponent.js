const {By} = require('selenium-webdriver');
const {filterAsync} = require('../../support/helper');

class CartItemComponent {
    constructor (world, parent) {
        if (!parent) {
            throw new Error('Parent WebElement is required.');
        }
        this.world = world;
        this.parent = parent;
    }

    get productNameText () { return this.parent.findElement(By.css('[data-test="inventory-item-name"]')); }
    get productDescriptionText () { return this.parent.findElement(By.css('[data-test="inventory-item-desc"]')); }
    get productPriceText () { return this.parent.findElement(By.css('[data-test="inventory-item-price"]')); }
    get removeFromCartButton () { return this.parent.findElement(By.css('button')); }

    async getName() {
        return await this.productNameText.getText();
    }
    async getDescription() {
        return await this.productDescriptionText.getText();
    }
    async getPrice() {
        return await this.productPriceText.getText();
    }

    async removeFromCart() {   
        let itemName = await this.getName()
        this.world.itemsInCart = await filterAsync(await this.world.itemsInCart, async item => {
            return await item.name !== itemName
        })

        await this.removeFromCartButton.click();
    }
}

module.exports = {CartItemComponent}