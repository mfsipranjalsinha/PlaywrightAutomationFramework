import { expect } from '@playwright/test';

const selectors = {
  input: {
    email: '#ap_email_login',
    password: '#ap_password'
  },
  button: {
    continue: '.a-button-input',
    signIn: '#signInSubmit'
  },
  text: {
    emailDisplay: '#auth-email-claim',
    greeting: '#nav-link-accountList-nav-line-1'
  }
};

class AmazonLoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.locator(selectors.input.email);
    this.passwordInput = page.locator(selectors.input.password);

    this.continueBtn = page.locator(selectors.button.continue);
    this.signInBtn = page.locator(selectors.button.signIn);

    this.emailDisplay = page.locator(selectors.text.emailDisplay);
    this.greetingText = page.locator(selectors.text.greeting);
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveTitle(/Amazon Sign-In/);
  }

  async enterEmail(email) {
    await this.emailInput.clear();
    await this.emailInput.pressSequentially(email, { delay: 100 });
  }

  async clickContinue() {
    await this.continueBtn.click();
  }

  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickSignin() {
    await this.signInBtn.click();
  }

  async verifyEmailDisplayed(email) {
    await expect(this.signInBtn).toBeVisible();
    await expect(this.emailDisplay).toContainText(email);
  }

  getUserGreeting() {
    return this.greetingText;
  }
}

export default AmazonLoginPage;