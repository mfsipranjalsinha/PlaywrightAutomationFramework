import { expect } from '@playwright/test';

class AmazonLoginPage {

  constructor(page) {
    this.page = page;

    this.emailInput = page.locator('#ap_email_login');
    this.continueBtn = page.locator('.a-button-input');
    this.emailDisplay = page.locator('#auth-email-claim');
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveTitle(/Amazon Sign-In/);
  }

  async enterEmail(email) {
    await this.emailInput.fill(email);
    await expect(this.emailInput).toHaveValue(email);
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async verifyEmailDisplayed(email) {
    await expect(this.emailDisplay).toHaveText(email);
  }

}

export default AmazonLoginPage;