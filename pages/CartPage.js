import { expect } from '@playwright/test';

const selectors = {

  text: {
    items: '.sc-list-item',
    productTitle: '.sc-product-title',
    productPrice: '.sc-product-price',
    itemCount: '#sc-subtotal-label-activecart',
    subtotal: '#sc-subtotal-amount-activecart'
  },

  button: {
    delete: 'input[value="Delete"]',
    goToCart: '#sw-gtc a:has-text("Go to Cart")',
    cartIcon: '#nav-cart'
  }
};

class CartPage {

  constructor(page) {
    this.page = page;
  }

  // Open cart from add-to-cart popup or header cart icon
  async openCart() {

    const goToCart = this.page.locator(
      selectors.button.goToCart
    );

    // small wait to behave more like real user
    await this.page.waitForTimeout(2000);

    if (await goToCart.count()) {

      await goToCart.click();

    } else {

      await this.page
        .locator(selectors.button.cartIcon)
        .click();
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verify total items in cart
  async verifyCart(expectedCount) {

    const text = await this.page
      .locator(selectors.text.itemCount)
      .textContent();

    const actualCount = parseInt(
      text.match(/\d+/)?.[0] || '0'
    );

    console.log(`Expected Cart Count: ${expectedCount}`);
    console.log(`Actual Cart Count: ${actualCount}`);

    expect(actualCount).toBe(expectedCount);
  }

  // Delete item using index
  async deleteProduct(index = 0) {

    const deleteButtons = this.page.locator(
      selectors.button.delete
    );

    const count = await deleteButtons.count();

    if (index >= count) {

      throw new Error(
        `Delete index ${index} out of range. Total items: ${count}`
      );
    }

    // human-like pause before delete
    await this.page.waitForTimeout(2000);

    await deleteButtons
      .nth(index)
      .click();

    // wait for cart refresh
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Get all product names from cart
  async getCartItems() {

    const titles = this.page.locator(
      selectors.text.productTitle
    );

    const count = await titles.count();

    const items = [];

    for (let i = 0; i < count; i++) {

      const text = await titles
        .nth(i)
        .innerText();

      items.push(text.trim());
    }

    return items;
  }

  // Verify cart empty
  async verifyCartEmpty() {

    const text = await this.page
      .locator(selectors.text.itemCount)
      .textContent();

    const count = parseInt(
      text.match(/\d+/)?.[0] || '0'
    );

    expect(count).toBe(0);
  }
}

export default CartPage;