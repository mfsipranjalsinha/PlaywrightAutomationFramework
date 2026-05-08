import { test } from '@playwright/test';
import AmazonHomePage from '../pages/AmazonHomePage.js';
import SearchResultsPage from '../pages/SearchResultsPage.js';
import ProductDetailsPage from '../pages/ProductDetailsPage.js';

let home;
let results;
let product;

test.describe('Product Details Feature', () => {

  test.beforeEach(async ({ page }) => {
    home = new AmazonHomePage(page);
    results = new SearchResultsPage(page);
    product = new ProductDetailsPage(page);

    await home.gotoURL('/');
    await home.handleContinueShopping();
  });

  test('Verify Product Details Data Consistency', async () => {

    // Search product
    await home.searchProduct('headphones');

    await results.checkResultsLoaded();
    await results.checkKeyword('headphones');

    // Get product data from search results
    const productData = await results.getProductData(0);

    // Open product details and verify data consistency
    await results.openProduct(0);
    await product.verifyProduct(productData);

  });

});