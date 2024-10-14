const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const {CheckoutFirstPage} = require('../page_objects/checkoutPage/checkoutFirstPage');
const {CheckoutSecondPage} = require('../page_objects/checkoutPage/checkoutSecondPage');
const {CheckoutCompletePage} = require('../page_objects/checkoutPage/checkoutCompletePage');

Given('I submit checkout', async function (table) {
    checkoutFirstPage = new CheckoutFirstPage(this)
   
    await checkoutFirstPage.submitCheckout(table.hashes()[0]["firstName"], table.hashes()[0]["lastName"], table.hashes()[0]["postalCode"])
})

Given('I verify order is correct on checkout', async function () {
    checkoutSecondPage = new CheckoutSecondPage(this)
    await checkoutSecondPage.verifyOrder();   
})

When('I place the order', async function () {
    this.itemsInCart = []
    checkoutSecondPage = new CheckoutSecondPage(this)
    await checkoutSecondPage.finishCheckout();
})

When('I verify order is placed', async function () {
    //TODO use wait instead of sleep
    await this.driver.sleep(500)
    checkoutCompletePage = new CheckoutCompletePage(this)
    assert.equal(await checkoutCompletePage.isSuccessfulOrderHeaderVisible(), true)
})