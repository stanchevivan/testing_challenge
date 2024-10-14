@UI
Feature: Ordering & Sorting

Background: 
    * I open "login" page
    * User logs in with username "standard_user"

@ordering
Scenario: Place order
    When I add the 1st product to cart
    * I add the last product to cart
    * I open "cart" page
    Then I verify items in cart are correct
    When I remove the 1st item from the cart
    * I open "inventory" page
    * I add the 2nd to the last product to cart
    * I open "cart" page
    Then I verify items in cart are correct
    When I go to checkout
    * I submit checkout
    |firstName|lastName|postalCode|
    |Ivan     |Stanchev|0101      |
    * I verify order is correct on checkout
    * I place the order
    * I verify order is placed
    * I open "cart" page
    Then I verify items in cart are correct
    * I logout

@sorting
Scenario: Sorting by price
    When I sort products by "Price (high to low)"
    Then I verify products are sorted by "Price (high to low)"
    * I logout