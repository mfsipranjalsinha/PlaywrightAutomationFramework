import { expect } from '@playwright/test';

const MAX_RESULTS = 5;

const selectors = {
  product: {
    results: '[data-component-type="s-search-result"]',
    title: 'h2 span',
    link: 'a:has(h2)',
    price: '.a-price-whole',
    rating: '.a-icon-alt'
  },

  filter: {
    brand: (brand) =>
      `[aria-label="Apply the filter ${brand} to narrow results"]`,

    appliedBrand: (brand) =>
      `[aria-label="Remove the filter ${brand} to expand results"] input`
  }
};

class SearchResultsPage {
  constructor(page) {
    this.page = page;
  }

  // just check results loaded
  async checkResultsLoaded() {
    await expect(
      this.page.locator(selectors.product.results).first()
    ).toBeVisible();
  }

  // make sure search returned relevant non-sponsored products
  async checkKeyword(keyword) {

    const products = this.page
      .locator(selectors.product.results)
      .filter({ hasNotText: 'Sponsored' });

    const count = await products.count();

    let found = 0;

    for (let i = 0; i < count; i++) {
      const text = await products
        .nth(i)
        .locator(selectors.product.title)
        .innerText();

      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        found++;
      }
    }

    console.log(`Checked: ${count}, Matches: ${found}`);
    expect(found).toBeGreaterThan(0);
  }

  async checkFilterApplied(brand) {
    const applied = this.page.locator(
      selectors.filter.appliedBrand(brand)
    );
    await expect(applied).toBeChecked();
  }

  // apply brand filter
   async applyFilter(brand) {
    const filter = this.page
      .locator(selectors.filter.brand(brand))
      .first();

    await expect(filter).toBeVisible();
    await filter.click();
  }

  // get product info from search results
  async getProductData(index) {

    const products = this.page
      .locator(selectors.product.results)
      .filter({ hasNotText: 'Sponsored' });

    const count = await products.count();

    if (index >= count) {
      throw new Error(`Index ${index} > total products ${count}`);
    }

    const product = products.nth(index);

    const name = await product
      .locator(selectors.product.title)
      .innerText();

    const price = await product
      .locator(selectors.product.price)
      .first()
      .innerText()
      .catch(() => null);

    const rating = await product
      .locator(selectors.product.rating)
      .first()
      .innerText()
      .catch(() => null);

    console.log({ name, price, rating });

    return { name, price, rating };
  }

  // open product in same tab
  async openProduct(index) {

    const products = this.page
      .locator(selectors.product.results)
      .filter({ hasNotText: 'Sponsored' });

    const count = await products.count();

    if (index >= count) {
      throw new Error(`Index ${index} > total products ${count}`);
    }

    const link = products
      .nth(index)
      .locator(selectors.product.link)
      .first();

    await expect(link).toBeVisible();

    await link.scrollIntoViewIfNeeded();

    // remove target to force same tab
    await link.evaluate(node => node.removeAttribute('target'));

    await Promise.all([
      this.page.waitForLoadState('domcontentloaded'),
      link.click()
    ]);
  }

}

export default SearchResultsPage;