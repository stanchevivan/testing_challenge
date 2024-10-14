const { setWorldConstructor } = require('@cucumber/cucumber');
const {Builder, Browser} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
require("chromedriver")
require("geckodriver")
let browser = Browser.CHROME

class CustomWorld {
  constructor({ attach, parameters }) {
    this.attach = attach
    this.parameters = parameters
    const width = 1280; 
    const height = 1080;
    this.driver = new Builder()
    .forBrowser(browser)
    .setChromeOptions(new chrome.Options()
    .windowSize({ width, height }))
    .build();
    this.itemsInCart = []
  }

  //TODO add actual browser version to report
  async getUserAgent() {
    let agent = await this.driver.executeScript('return navigator.userAgent;');
    return agent
  }
}

setWorldConstructor(CustomWorld);

module.exports = browser