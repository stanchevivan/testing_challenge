const {By, NoSuchElementError} = require('selenium-webdriver');
const {ProductComponent} = require('./productComponent');
const {filterAsync} = require('../../support/helper');
const { BasePage } = require('../basePage');

class ProductsPage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }

      #allProductsSelector = By.css('[data-test="inventory-item"].inventory_item')
      get #sortingDropdown () { return this.world.driver.findElement(By.css('[data-test="product-sort-container"]')); } 
          
    async productsList() {
        let productElements = await this.world.driver.findElements(this.#allProductsSelector);
        return await productElements.map((p) => new ProductComponent(this.world, p));
    }
       
    async getNumberOfProducts() {
        return (await this.productsList()).length
    }

    async getProductByIndex(index) {
        let result = (await this.productsList())[index]

        if (!result) {
            throw new Error(`Product with name ${index} not found !`)
        }

        return result
    }

    async getProductByName(name) {
        let result = (await filterAsync(await this.productsList(), async product => {
            return await product.getName() === name
        }))[0]

        if (!result) {
            throw new Error(`Product with name ${name} not found !`)
        }

        return result
    }

    async changeSorting(sorting) {
        await this.#sortingDropdown.click()

        let priceOption
        try {
            priceOption = await this.world.driver.findElement(By.xpath(`//option[contains(text(),"${sorting}")]`));
        }
        catch(error) {
            if (error.name === 'NoSuchElementError') {
                throw new Error(`Sorting "${sorting}" not found !`);
            }
            else {
                throw error;
            }
        }
        
        priceOption.click()
    }
}

module.exports = {ProductsPage};