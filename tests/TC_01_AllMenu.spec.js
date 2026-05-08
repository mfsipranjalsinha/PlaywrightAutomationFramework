import { test } from '@playwright/test';
import AmazonHomePage from '../pages/AmazonHomePage.js';

/** @type {AmazonHomePage} */
let home;

const menuData = [
  {
    section: 'Trending',
    items: ['Bestsellers', 'New Releases', 'Movers and Shakers']
  },
  {
    section: 'Help & Settings',
    items: ['Your Account', 'Customer Service', 'Sign in']
  }
];

test.describe('All Menu Feature', () => {

  test.beforeEach(async ({ page }) => {
    home = new AmazonHomePage(page);

    await home.gotoURL('/');
    await home.handleContinueShopping();
  });

  test('smoke Verify All Menu Sections and Items', async () => {

  await home.clickAllMenu();

  await home.verifyMenuOpen();

  await home.verifyMenuSections(menuData);

  // capture screenshots
  await home.captureFullPageScreenshot(
    'all-menu-full-page'
  );

  await home.captureElementScreenshot(
    'all-menu-section'
  );

  // visual comparison
  await home.compareFullPageScreenshot(
    'all-menu-full-page'
  );

  await home.compareMenuScreenshot(
    'all-menu-section'
  );

  await home.closeAllMenu();

});

});