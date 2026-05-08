import { test } from '@playwright/test';

import AmazonHomePage from '../pages/AmazonHomePage.js';
import SearchResultsPage from '../pages/SearchResultsPage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';
import CartPage from '../pages/CartPage.js';

let home;
let results;
let product;
let cart;

test.describe('Cart Feature', () => {

  test.beforeEach(async ({ page }) => {

    home = new AmazonHomePage(page);

    results = new SearchResultsPage(page);

    product = new ProductDetailsPage(page);

    cart = new CartPage(page);

    await home.gotoURL('/');

    await home.handleContinueShopping();
  });

  test(' @regression Dynamic Cart End To End Flow', async () => {

    // Search first product
    await home.searchProduct('laptop');

    await results.checkResultsLoaded();

    await results.checkKeyword('laptop');

    // Capture first product data
    const product1 = await results.getProductData(0);

    // Open first product
    await results.openProduct(0);

    // Verify product details page
    await product.verifyProduct(product1);

    // Add first product to cart
    await product.addToCart();

    // Search second product
    await home.searchProduct('headphone');

    await results.checkResultsLoaded();

    await results.checkKeyword('headphone');

    // Capture second product data
    const product2 = await results.getProductData(1);

    // Open second product
    await results.openProduct(1);

    // Verify second product details
    await product.verifyProduct(product2);

    // Add second product to cart
    await product.addToCart();

    // Open cart
    await cart.openCart();

    // Verify cart has 2 items
    await cart.verifyCart(2);

    // Delete first product
    await cart.deleteProduct(0);

    // Verify cart has 1 item
    await cart.verifyCart(1);

    // Delete remaining product
    await cart.deleteProduct(0);

    // Verify cart empty
    await cart.verifyCartEmpty();

  });

});