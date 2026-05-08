import { expect } from '@playwright/test';

const selectors = {

  product: {
    title: '[id*="itemName"]'
  },

  section: {
    wishlistContainer: '#wl-list-info'
  },

  list: {
    title: '.wl-list-entry-title .a-color-base'
  },

  createList: {
    button: '#createList',
    dialogHeader: '.a-popover-header-content',
    listNameInput: '#list-name',
    createButton:
      'input[aria-labelledby="lists-desktop-create-list-label"]'
  }

};

class WishlistPage {

  constructor(page) {
    this.page = page;
  }

  // Navigate to wishlist page
  async navigateToWishlistPage() {

    await this.page.goto(
      '/hz/wishlist/ls'
    );
  }

  // Verify wishlist page loaded
  async verifyWishlistPage() {

    const wishlistContainer = this.page.locator(
      selectors.section.wishlistContainer
    );

    await expect(
      wishlistContainer
    ).toBeVisible();
  }

  // Verify product exists in wishlist
  async verifyProductAddedToWishlist(productData) {

    const productTitles = this.page.locator(
      selectors.product.title
    );

    await expect(
      productTitles.first()
    ).toBeVisible();

    // Partial match for stability
    await expect(
      productTitles.first()
    ).toContainText(
      productData.name.substring(0, 20)
    );
  }

  // Click create new list button
  async clickCreateList() {

    await this.page.locator(
      selectors.createList.button
    ).click();
  }

  // Verify create list dialog visible
  async verifyCreateListDialog() {

    const dialogHeader = this.page.locator(
      selectors.createList.dialogHeader
    );

    await expect(
      dialogHeader
    ).toContainText(
      'Create a new list'
    );
  }

  // Enter wishlist name
  async enterListName(listName) {

    await this.page.locator(
      selectors.createList.listNameInput
    ).fill(listName);
  }

  // Click create list button inside popup
  async clickCreateListButton() {

    await this.page.locator(
      selectors.createList.createButton
    ).click();

    await this.page.waitForTimeout(2000);
  }

  // Verify new list created
  async verifyListCreated(listName) {

    const listTitles = await this.page.locator(
      selectors.list.title
    ).allTextContents();

    const cleanedTitles = listTitles.map(
      title => title.trim()
    );

    expect(cleanedTitles).toContain(
      listName
    );
  }

}

export default WishlistPage;