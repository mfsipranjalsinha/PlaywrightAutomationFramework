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
  }

  async verifyPageTitle(expectedTitle) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  // Works for both email and phone (+91 format)
  async enterEmailOrPhone(emailphone) {
    const input = this.page.locator(selectors.input.email);

    //await input.clear();
    await input.pressSequentially(emailphone, { delay: 100 });
  }

  async clickContinue() {
    await this.page.locator(selectors.button.continue).click();
  }

  async enterPassword(password) {
    await this.page.locator(selectors.input.password).fill(password);
  }

  async clickSignin() {
    await this.page.locator(selectors.button.signIn).click();
  }

  // Exact match assertion (email OR phone)
  async verifyEmailPhoneDisplayed(expectedValue) {
    const emailText = this.page.locator(selectors.text.emailDisplay);

    await expect(emailText).toBeVisible();
    await expect(emailText).toHaveText(expectedValue);
  }

  // Login success validation using greeting
  async verifyLoginSuccess() {
    const greeting = this.page.locator(selectors.text.greeting);

    await expect(greeting).toBeVisible();
    await expect(greeting).toContainText('Hello');
  }

}

export default AmazonLoginPage;