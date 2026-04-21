import { expect } from '@playwright/test';

const selectors = {
  results: '[data-component-type="s-search-result"]',
  productTitles: 'h2 span'
};

class SearchResultsPage {
  constructor(page) {
    this.page = page;

    this.results = page.locator(selectors.results);
    this.productTitles = page.locator(selectors.productTitles);
  }

  async verifyResultsVisible() {
    await expect(this.results.first()).toBeVisible();
  }

  async verifyResultsContainKeyword(keyword) {
    const count = await this.productTitles.count();

    for (let i = 0; i < count && i < 5; i++) {
      const text = await this.productTitles.nth(i).innerText();

      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        return;
      }
    }

    throw new Error(`No results found with keyword: ${keyword}`);
  }

  getBrandFilter(brandName) {
    return this.page.locator(
      `[aria-label="Apply the filter ${brandName} to narrow results"]`
    );
  }

  async applyBrandFilter(brandName) {
    const filter = this.getBrandFilter(brandName);

    await expect(filter.first()).toBeVisible();
    await filter.first().click();

    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyBrandFilterApplied(brandName) {
    await this.page.waitForTimeout(1000);

    const appliedFilter = this.page.locator(
      `[aria-label="Remove the filter ${brandName} to expand results"] input`
    );

    await expect(appliedFilter).toBeChecked();
  }
}

export default SearchResultsPage;