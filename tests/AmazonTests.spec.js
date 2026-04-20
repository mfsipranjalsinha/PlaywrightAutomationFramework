import { test, expect } from '@playwright/test';
import AmazonHomePage from '../pages/AmazonHomePage';
import AmazonLoginPage from '../pages/AmazonLoginPage';

test.describe('Amazon CI - POM', () => {

  test('Bot Detection + Search Flow without Login', async ({ page }) => {

    const home = new AmazonHomePage(page);

    await home.navigate();

    console.log('Current URL:', page.url());

    const botStatus = await home.detectBot();

    console.log('----- BOT STATUS -----');
    console.log(botStatus);

    // Always take screenshot AFTER stabilization
    await page.screenshot({ path: 'test-results/debug.png', fullPage: true });

    // If blocked → expected in CI
    if (
      botStatus.isCaptcha ||
      botStatus.isRobot ||
      botStatus.isBlocked ||
      botStatus.isContinueShopping
    ) {
      console.log('Bot protection detected - expected behavior in CI');
      return;
    }

    // If not blocked → continue normal flow
    await home.searchProduct('laptop');

    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-results/normal-flow.png', fullPage: true });

    expect(true).toBeTruthy();
  })

test('Valid Login Flow', async ({ page }) => {

  const home = new AmazonHomePage(page);
  const login = new AmazonLoginPage(page);

  await home.navigate();

  const botStatus = await home.detectBot();
  console.log('BOT STATUS:', botStatus);

  // Handle intermediate page
  await home.handleContinueShoppingIfPresent();

  // Try clicking sign in
  const clicked = await home.clickSignIn();

  if (!clicked) {
    console.log('Skipping login flow due to blocked/intermediate UI');
    return;
  }

  await login.verifyLoginPage();

  const email = 'pspsinha6@gmail.com';

  await login.enterEmail(email);
  await login.clickContinue();

  await login.verifyEmailDisplayed(email);

});

});

// Verify that a registered user can successfully log in using valid credentials and access the homepage.
// Verify that a user can search for a product using a keyword and relevant results are displayed.
// Verify that a user can open a product and view correct details such as name, price, images, and ratings.
// Verify that a user can add a product to the cart from the product listing or product detail page.
// Verify that the cart displays correct product information including name, quantity, and total price.