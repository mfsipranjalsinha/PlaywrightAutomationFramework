import { test } from '@playwright/test';
import AmazonHomePage from '../pages/AmazonHomePage.js';
import SearchResultsPage from '../pages/SearchResultsPage.js';

/** @type {AmazonHomePage} */
let home;
/** @type {SearchResultsPage} */
let results;

test.describe('Search Feature', () => {

  test.beforeEach(async ({ page }) => {
    home = new AmazonHomePage(page);
    results = new SearchResultsPage(page);

    await home.gotoURL('/');
    await home.handleContinueShopping();
  });

  test('Search Product And Apply Brand Filter', async () => {

    // Search product
    await home.searchProduct('laptop');

    // Verify results loaded
    await results.checkResultsLoaded();

    // Apply brand filter
    await results.applyFilter('HP');

    // Verify filter applied
    await results.checkFilterApplied('HP');

    // Verify filtered products are relevant
    await results.checkKeyword('HP');

  });

});