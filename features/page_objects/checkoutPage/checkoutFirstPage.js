const {By} = require('selenium-webdriver');
const { BasePage } = require('../basePage');

class CheckoutFirstPage extends BasePage{
    constructor(world) {
        super(world);
        this.world = world;
      }

      get #firstNameInput () { return this.world.driver.findElement(By.css('[data-test="firstName"]')); }
      get #lastNameInput () { return this.world.driver.findElement(By.css('[data-test="lastName"]')); }
      get #postalCodeInput () { return this.world.driver.findElement(By.css('[data-test="postalCode"]')); }
      get #continueButton () { return this.world.driver.findElement(By.css('[data-test="continue"]')); }
      
    async submitCheckout(firstName, lastName, postalCode) {
        await this.#firstNameInput.clear()
        await this.#firstNameInput.sendKeys(firstName)

        await this.#lastNameInput.clear()
        await this.#lastNameInput.sendKeys(lastName)

        await this.#postalCodeInput.clear()
        await this.#postalCodeInput.sendKeys(postalCode)

        await this.#continueButton.click()
    }

}

module.exports = {CheckoutFirstPage};