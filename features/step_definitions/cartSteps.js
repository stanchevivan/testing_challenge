const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const {CartPage} = require('../page_objects/cartPage/cartPage');
const { Product } = require('../support/product');
const {compareArrays} = require('../support/helper');

Given('I verify items in cart are correct', async function () {
    cartPage = new CartPage(this)
    let itemsAsProducts = []

    for (const item of await cartPage.itemsList()) {
        itemsAsProducts.push(new Product(await item.getName(), await item.getDescription(), await item.getPrice()))
      }

      assert.equal(await compareArrays(itemsAsProducts,this.itemsInCart), true, "There are unexpected or missing items in the cart !")
})

When(/^I remove the (\d+)(st|nd|rd|th) item from the cart$/, async function (number, dummy) {
    cartPage = new CartPage(this)

    await (await cartPage.getItemByIndex(number - 1)).removeFromCart()
})

Given('I go to checkout', async function () {
    cartPage = new CartPage(this)
    await cartPage.goToCheckout()
})