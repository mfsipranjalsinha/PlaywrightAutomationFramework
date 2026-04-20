class AmazonHomePage {

  constructor(page) {
    this.page = page;

    this.searchBox = page.locator('#twotabsearchtextbox');
    this.continueShoppingBtn = page.getByText('Continue to Shopping');
    this.signInLink = page.getByRole('link', { name: 'Hello, sign in Account & Lists' });
  }

  async navigate() {
    await this.page.goto('https://www.amazon.in/');
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(3000); // stabilize rendering
  }

  async handleContinueShoppingIfPresent() {
  const btn = this.page.getByText(/continue shopping/i);

  if (await btn.isVisible().catch(() => false)) {
    console.log('Continue Shopping detected → clicking');
    await btn.click();

    // Wait for real homepage to load
    await this.page.waitForSelector('#twotabsearchtextbox', { timeout: 10000 }).catch(() => {});
  }
}

  async searchProduct(productName) {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  async clickSignIn() {
  const visible = await this.signInLink.isVisible().catch(() => false);

  if (!visible) {
    console.log('Sign-in not visible → skipping due to bot/intermediate page');
    return false;
  }

  await this.signInLink.click();
  return true;
}

  async detectBot() {
    const content = await this.page.content();

    return {
      isCaptcha: content.includes('Enter the characters you see below'),
      isRobot: content.includes('not a robot'),
      isBlocked: content.includes('Sorry, we just need to make sure'),
      isContinueShopping: content.includes('Continue shopping')
    };
  }

}

export default AmazonHomePage;