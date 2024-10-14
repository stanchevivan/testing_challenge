const {By} = require('selenium-webdriver');
const { Product } = require('../../support/product');

class ProductComponent {
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
    get addToCartButton () { return this.parent.findElement(By.css('[data-test="inventory-item"] .pricebar > button')); }

    async getName() {
        return await this.productNameText.getText();
    }
    async getDescription() {
        return await this.productDescriptionText.getText();
    }
    async getPrice() {
        return await this.productPriceText.getText();
    }

    async addToCart() {
        let product = new Product(this.getName(), this.getDescription(), this.getPrice());    
        this.world.itemsInCart.push(product)
        
        await this.addToCartButton.click();
    }
}

module.exports = {ProductComponent}