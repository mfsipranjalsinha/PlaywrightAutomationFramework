import { expect } from '@playwright/test';

const selectors = {
  button: {
    signIn: '#nav-link-accountList',
    continueShopping: 'text=Continue shopping',
    allMenu: 'span.hm-icon-label',
    closeAllMenu: '#hmenu-close-icon',
    searchBox: '#twotabsearchtextbox'
  },
  menu: {
    canvas: '#hmenu-canvas',
    container: '#hmenu-canvas #hmenu-content'
  }
};

class AmazonHomePage {
  constructor(page) {
    this.page = page;

    this.signInBtn = page.locator(selectors.button.signIn);
    this.allMenuBtn = page.locator(selectors.button.allMenu);
    this.closeMenuBtn = page.locator(selectors.button.closeAllMenu);
    this.searchBox = page.locator(selectors.button.searchBox);

    this.menuCanvas = page.locator(selectors.menu.canvas);
    this.menuContainer = page.locator(selectors.menu.container);
  }

  async gotoURL(url) {
  await this.page.goto(url, { waitUntil: 'domcontentloaded' });
}

  async clickSignIn() {
    await this.signInBtn.click();
  }

  async clickAllMenu() {
    await expect(this.allMenuBtn).toBeVisible();

    for (let i = 0; i < 2; i++) {
      await this.allMenuBtn.click();

      try {
        await expect(this.menuCanvas.first()).toBeVisible({ timeout: 3000 });
        return;
      } catch {
        await this.page.waitForTimeout(500);
      }
    }

    throw new Error('Hamburger menu did not open');
  }

  async searchProduct(product) {
    await this.searchBox.fill(product);
    await this.page.keyboard.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyMenuSection(sectionName) {
    const section = this.menuContainer.locator(`section[aria-labelledby="${sectionName}"]`);
    await expect(section.first()).toBeVisible({ timeout: 5000 });
  }

  async verifyMenuItem(sectionName, itemName) {
    const section = this.menuContainer.locator(`section[aria-labelledby="${sectionName}"]`);
    await expect(section.getByText(itemName).first()).toBeVisible({ timeout: 5000 });
  }

  async closeAllMenu() {
    await expect(this.closeMenuBtn).toBeVisible();

    await Promise.all([
      this.menuCanvas.waitFor({ state: 'hidden' }),
      this.closeMenuBtn.click()
    ]);
  }

  getAllMenuContainer() {
    return this.menuCanvas;
  }
}

export default AmazonHomePage;