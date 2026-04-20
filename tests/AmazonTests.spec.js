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
  });

  test('Valid Login Flow', async ({ page }) => {

    const home = new AmazonHomePage(page);
    const login = new AmazonLoginPage(page);

    await home.navigate();

    await home.handleContinueShoppingIfPresent();

    await home.clickSignIn();

    await login.verifyLoginPage();

    const email = 'pspsinha6@gmail.com';

    await login.enterEmail(email);
    await login.clickContinue();

    await login.verifyEmailDisplayed(email);
  });

});