const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
const {ProductsPage} = require('../page_objects/productsPage/productsPage');
const {isArraySortedDescending, extractAmount} = require('../support/helper');

Given(/^I add the (\d+)(st|nd|rd|th) product to cart$/, async function (number, dummy) {
    productsPage = new ProductsPage(this)
    
    let product = await productsPage.getProductByIndex(number - 1);
    await product.addToCart();
});

Given('I add the last product to cart', async function () {
    productsPage = new ProductsPage(this)
    
    numberOfProducts = await productsPage.getNumberOfProducts()
    let product = await productsPage.getProductByIndex(numberOfProducts - 1);
    await  product.addToCart();
});

Given(/^I add the (\d+)(st|nd|rd|th) to the last product to cart$/, async function (number, dummy) {
    productsPage = new ProductsPage(this)

    numberOfProducts = await productsPage.getNumberOfProducts()
    let product = await productsPage.getProductByIndex(numberOfProducts - number);
    await product.addToCart();
});

When(/^I sort products by "(Price \(low to high\)|Price \(high to low\)|Name \(A to Z\)|Name \(Z to A\))"$/, async function (sorting) {
    await new ProductsPage(this).changeSorting(sorting)
})

// TODO handle all types of sorting
Then('I verify products are sorted by {string}',  async function (sorting) {
    productsPage = new ProductsPage(this)
    let prices = []
    let products = await productsPage.productsList()

    for(const product of products) {
        prices.push(await extractAmount(await product.getPrice()))
    }

    assert.equal(isArraySortedDescending(prices), true, `Products are not sorted as "${sorting}"`)
})
