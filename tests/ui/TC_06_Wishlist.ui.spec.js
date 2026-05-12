import { test } from '@playwright/test';

import AmazonHomePage from '../../pages/AmazonHomePage.js';
import AmazonLoginPage from '../../pages/AmazonLoginPage.js';
import SearchResultsPage from '../../pages/SearchResultsPage.js';
import ProductDetailsPage from '../../pages/ProductDetailsPage.js';
import WishlistPage from '../../pages/WishlistPage.js';
import { ENV } from '../../config/env.js';

let home;
let login;
let results;
let product;
let wishlist;

test.describe('Wishlist Feature', () => {

  test.beforeEach(async ({ page }) => {

    home = new AmazonHomePage(page);
    login = new AmazonLoginPage(page);
    results = new SearchResultsPage(page);
    product = new ProductDetailsPage(page);
    wishlist = new WishlistPage(page);

    // Open application
    await home.gotoURL('/');

    await home.handleContinueShopping();

    // Login before every test
    await home.clickSignIn();

    await login.enterEmailOrPhone(
      ENV.amazon.email
    );

    await login.clickContinue();

    await login.enterPassword(
      ENV.amazon.password
    );

    await login.clickSignin();

    await login.verifyLoginSuccess();
  });

  test('Dynamic Wishlist End To End Flow', async () => {

    // Search product
    await home.searchProduct('wireless mouse');

    await results.checkResultsLoaded();

    // Capture product data
    const productData =
      await results.getProductData(0);

    // Open product
    await results.openProduct(0);

    // Add product to wishlist
    await product.addProductToWishlist();

    // Verify wishlist popup
    await product.verifyProductAddedToWishlist();

    // Open wishlist page
    await product.viewWishlist();

    // Verify wishlist page loaded
    await wishlist.verifyWishlistPage();

    // Verify product added to wishlist
    await wishlist.verifyProductAddedToWishlist(
      productData
    );

  });

  test('@smoke User Should Be Able To Create New Wishlist', async ({ page }) => {

    // Open wishlist page
    await wishlist.navigateToWishlistPage();

    // Verify wishlist page loaded
    await wishlist.verifyWishlistPage();

    // Click create list button
    await wishlist.clickCreateList();

    // Verify create list dialog visible
    await wishlist.verifyCreateListDialog();

    // Create unique wishlist name
    const listName =
      'Shopping List New'

    // Enter wishlist name
    await wishlist.enterListName(
      listName
    );

    // Click create button
    await wishlist.clickCreateListButton();

    // Verify list created
    await wishlist.verifyListCreated(
      listName
    );

  });

});