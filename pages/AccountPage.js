import { expect } from '@playwright/test';

const selectors = {
  button: {
    account: '#nav-link-accountList',
    addAddress: '#ya-myab-plus-address-icon'
  },

  card: {
    address: '[data-card-identifier="AddressesAnd1Click"]',
    addAddressCard: '.first-desktop-address-tile'
  }
};

class AccountPage {
  constructor(page) {
    this.page = page;
  }

  // Open account page
  async openAccount() {
    const accountBtn = this.page.locator(selectors.button.account);

    // small pause to mimic user
    await this.page.waitForTimeout(2000);
    await expect(accountBtn).toBeVisible();
    await accountBtn.focus();
    await this.page.keyboard.press('Enter');
    await accountBtn.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Open addresses section
  async openAddresses() {
    const addressCard = this.page.locator(selectors.card.address);

    await this.page.waitForTimeout(2000);
    await expect(addressCard).toBeVisible();
    await addressCard.scrollIntoViewIfNeeded();

    // mimic human interaction
    await addressCard.focus();
    await this.page.keyboard.press('Enter');
    await addressCard.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  // Click add address button
  async clickAddAddress() {

  const addAddressCard = this.page.locator(selectors.card.addAddressCard);
  await expect(addAddressCard).toBeVisible();
  await addAddressCard.click();
  await this.page.waitForLoadState('domcontentloaded');
}
}

export default AccountPage;