import { expect } from '@playwright/test';

const selectors = {
  text: {
    title: 'span#productTitle',
    price: '.priceToPay .a-price-whole',
    rating: '#averageCustomerReviews span.a-icon-alt',
    wishlistName: '#huc-list-link'

  },

  image: {
    productImages: '#altImages img'
  },

  button: {
    addToCart: '#add-to-cart-button:visible',
    addToWishlist: '#add-to-wishlist-button-submit',
    viewYourList: '#huc-view-your-list-button a'

  },

  section: {
    wishlistPopup: '#huc-atwl-inner',
    wishlistHeader: '#huc-atwl-header-section'
  }
};

class ProductDetailsPage {
  constructor(page) {
    this.page = page;
  }

  // Verify opened product matches selected search result
  async verifyProduct(productData) {
    const title = this.page.locator(selectors.text.title);

    await this.page.waitForTimeout(2000);

    await expect(title).toBeVisible();
    await expect(title).toContainText(productData.name);

    // Validate price if available
    if (productData.price) {
      const price = this.page.locator(selectors.text.price);

      await expect(price).toBeVisible();
      await expect(price).toContainText(productData.price);
    }

    // Validate rating if available
    if (productData.rating) {
      const rating = this.page.locator(selectors.text.rating);

      if (await rating.count()) {
        await expect(rating.first()).toContainText(productData.rating);
      }
    }

    await this.checkImages();
  }

  // Verify product images visible
  async checkImages() {
    const images = this.page.locator(selectors.image.productImages);
    await expect(images.first()).toBeVisible();
  }

  // Add product to cart
  async addToCart() {
    const addToCartBtn = this.page
      .locator(selectors.button.addToCart)
      .first();

    await this.page.waitForTimeout(2000);
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async addProductToWishlist() {
  await this.page.waitForLoadState('domcontentloaded');
  const wishlistButton = this.page.locator(
    selectors.button.addToWishlist
  );

  await expect(wishlistButton).toBeVisible();
  await wishlistButton.click();

}
  async verifyProductAddedToWishlist() {
  const wishlistPopup = this.page.locator(
    selectors.section.wishlistPopup
  );

  await expect(wishlistPopup).toBeVisible();

  const wishlistHeader = this.page.locator(
    selectors.section.wishlistHeader
  );

  await expect(wishlistHeader).toContainText(
    'One item added to'
  );

  const viewListButton = this.page.locator(
    selectors.button.viewYourList
  );

  await expect(viewListButton).toBeVisible();
}

  async viewWishlist() {
  const viewListButton = this.page.locator(
    selectors.button.viewYourList
  );
  await expect(viewListButton).toBeVisible();
  await viewListButton.click();

}
}

export default ProductDetailsPage;