import { expect } from '@playwright/test';

const selectors = {
  button: {
    signIn: '#nav-link-accountList',
    allMenu: 'span.hm-icon-label',
    closeAllMenu: '#hmenu-close-icon',
    searchBox: '#twotabsearchtextbox',
    continueShopping: 'button:has-text("Continue shopping")'
  },

  menu: {
    canvas: '#hmenu-canvas',
    container: '#hmenu-canvas #hmenu-content',
    trendingSection: 'section[aria-labelledby="Trending"]',

    // dynamic section locator
    section: (name) => `section[aria-labelledby="${name}"]`
  }
};

class AmazonHomePage {

  constructor(page) {
    this.page = page;
  }

  async gotoURL(path = '/') {

    await this.page.goto(
      path,
      { waitUntil: 'domcontentloaded' }
    );
  }

  // popup does not always appear
  async handleContinueShopping() {

    const btn = this.page.locator(
      selectors.button.continueShopping
    );

    if (await btn.isVisible()) {
      await btn.click();
    }
  }

  async clickSignIn() {

    await this.page
      .locator(selectors.button.signIn)
      .click();
  }

  async clickAllMenu() {

    await this.page.waitForTimeout(2000);

    await this.page.waitForLoadState(
      'domcontentloaded'
    );

    await this.page
      .locator(selectors.button.allMenu)
      .click({ force: true });
  }

  async searchProduct(product) {

    await this.page
      .locator(selectors.button.searchBox)
      .fill(product);

    await this.page.keyboard.press('Enter');

    await this.page.waitForLoadState(
      'domcontentloaded'
    );
  }

  // verify menu sections and items
  async verifyMenuSections(menuData) {

    const container = this.page.locator(
      selectors.menu.container
    );

    for (const menu of menuData) {

      const section = container.locator(
        selectors.menu.section(menu.section)
      );

      await expect(
        section.first()
      ).toBeVisible();

      for (const item of menu.items) {

        await expect(
          section.getByText(item).first()
        ).toBeVisible();
      }
    }
  }

  async closeAllMenu() {

    await this.page.waitForTimeout(1000);

    await this.page.keyboard.press('Escape');

    await expect(
      this.page
        .locator(selectors.menu.container)
        .locator(selectors.menu.trendingSection)
        .first()
    ).toBeHidden();
  }

  async verifyMenuOpen() {

    await this.page.waitForTimeout(1000);

    await expect(
      this.page
        .locator(selectors.menu.container)
        .locator(selectors.menu.trendingSection)
        .first()
    ).toBeVisible();
  }

  //threshold
  // =========================
  // VISUAL TESTING METHODS
  // =========================

  // capture full page screenshot
  async captureFullPageScreenshot(fileName) {

    await this.page.screenshot({
      path: `screenshots/${fileName}.png`,
      fullPage: true
    });
  }

  // capture specific element screenshot
  async captureElementScreenshot(fileName) {

    await this.page
      .locator(selectors.menu.container)
      .screenshot({
        path: `screenshots/${fileName}.png`
      });
  }

  // visual comparison for full page
  async compareFullPageScreenshot(fileName) {

    await expect(this.page)
      .toHaveScreenshot(
        `${fileName}.png`,
        {
          fullPage: true
        }
      );
  }

  // visual comparison for menu section only
  async compareMenuScreenshot(fileName) {

    await expect(
      this.page.locator(selectors.menu.container)
    ).toHaveScreenshot(
      `${fileName}.png`
    );
  }
}

export default AmazonHomePage;