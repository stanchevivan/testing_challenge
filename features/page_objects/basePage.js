const {By} = require('selenium-webdriver');

class BasePage {
    constructor(world) {
        this.world = world;
      }
    // get #burgerMenuButton () { return this.world.driver.findElement(By.css('button:has(> .img[data-test="open-menu"])')); }
    get #burgerMenuButton () { return this.world.driver.findElement(By.xpath('//button[following-sibling::img[@data-test="open-menu"]]')); }
    get #logOutLink () { return this.world.driver.findElement(By.css('[data-test="logout-sidebar-link"]')); }
    
    async openBurgerMenu() {
        await this.#burgerMenuButton.click();
    }

    async logout() {
        //TODO use wait instead of sleep
        await this.world.driver.sleep(400)
        if(!await this.#logOutLink.isDisplayed()) {
           this.openBurgerMenu()
        }
        //TODO use wait instead of sleep
        await this.world.driver.sleep(400)
        await this.#logOutLink.click()
    }

}

module.exports = {BasePage};