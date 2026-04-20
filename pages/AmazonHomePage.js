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
    if (await this.continueShoppingBtn.isVisible().catch(() => false)) {
      await this.continueShoppingBtn.click();
    }
  }

  async searchProduct(productName) {
    await this.searchBox.waitFor({ state: 'visible', timeout: 10000 });
    await this.searchBox.fill(productName);
    await this.searchBox.press('Enter');
  }

  async clickSignIn() {
    await this.signInLink.click();
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