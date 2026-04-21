import { test, expect } from '@playwright/test';
import AmazonHomePage from '../pages/AmazonHomePage';
import AmazonLoginPage from '../pages/AmazonLoginPage';
import SearchResultsPage from '../pages/SearchResultsPage';
import 'dotenv/config';

test.only('Verify All Menu Sections and Items', async ({ page }) => {

  const home = new AmazonHomePage(page);

  await home.gotoURL('https://www.amazon.in/');
  await home.handleContinueShopping();
  await home.clickAllMenu();

  await expect(home.getAllMenuContainer()).toBeVisible();

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

  for (const menu of menuData) {
    await home.verifyMenuSection(menu.section);

    for (const item of menu.items) {
      await home.verifyMenuItem(menu.section, item);
    }
  }

  await home.closeAllMenu();
  await expect(home.getAllMenuContainer()).toBeHidden();
});


test('Valid Login Flow', async ({ page }) => {

  const home = new AmazonHomePage(page);
  const login = new AmazonLoginPage(page);

  await home.gotoURL('https://www.amazon.in/');
  await home.handleContinueShopping();
  await home.clickSignIn();

  await login.verifyLoginPage();

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;

  await login.enterEmail(email);
  await login.clickContinue();

  await login.enterPassword(password);
  await login.clickSignin();

  await expect(login.getUserGreeting()).toContainText('Hello');
});


test('Search and apply HP brand filter', async ({ page }) => {

  const home = new AmazonHomePage(page);
  const results = new SearchResultsPage(page);

  await home.gotoURL('https://www.amazon.in/');
  await home.handleContinueShopping();
  await home.searchProduct('laptop');

  await results.verifyResultsVisible();
  await results.verifyResultsContainKeyword('laptop');

  await results.applyBrandFilter('HP');
  await results.verifyBrandFilterApplied('HP');
});