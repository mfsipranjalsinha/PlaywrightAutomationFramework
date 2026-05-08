import { expect } from '@playwright/test';

const selectors = {
  input: {
    fullName: '#address-ui-widgets-enterAddressFullName',
    phone: '#address-ui-widgets-enterAddressPhoneNumber',
    pincode: '#address-ui-widgets-enterAddressPostalCode',
    addressLine1: '#address-ui-widgets-enterAddressLine1',
    addressLine2: '#address-ui-widgets-enterAddressLine2',
    landmark: '#address-ui-widgets-landmark',
    city: '#address-ui-widgets-enterAddressCity'
  },

  dropdown: {
    state: '#address-ui-widgets-enterAddressStateOrRegion-dropdown-nativeId'
  },

  button: {
    submit: 'input[aria-labelledby="address-ui-widgets-form-submit-button-announce"]'
  },

  address: {
    card: '[id^="ya-myab-display-address-block"]',
    cardByIndex: (index) => `#ya-myab-display-address-block-${index}`,
    deleteBtn: (index) => `#ya-myab-address-delete-btn-${index}`,
    confirmDeleteBtn: (index) => `#deleteAddressModal-${index}-submit-btn`
  }
};

class AddressPage {
  constructor(page) {
    this.page = page;
  }

  // Verify address form loaded
  async checkAddressPageLoaded() {
    await expect(
      this.page.locator(selectors.input.fullName)
    ).toBeVisible();
  }
  
    // Fill address form using provided data
  async fillAddressForm(data) {
    await this.page.waitForTimeout(2000);

    await this.page
      .locator(selectors.input.fullName)
      .pressSequentially(data.name, { delay: 100 });

    await this.page
      .locator(selectors.input.phone)
      .pressSequentially(data.phone, { delay: 100 });

    await this.page
      .locator(selectors.input.pincode)
      .pressSequentially(data.pincode, { delay: 100 });

    await this.page
      .locator(selectors.input.addressLine1)
      .pressSequentially(data.addressLine1, { delay: 100 });

    await this.page
      .locator(selectors.input.addressLine2)
      .pressSequentially(data.addressLine2, { delay: 100 });

    await this.page
      .locator(selectors.input.landmark)
      .pressSequentially(data.landmark, { delay: 100 });

    await this.page.locator(selectors.input.city).clear();

    await this.page
      .locator(selectors.input.city)
      .pressSequentially(data.city, { delay: 100 });

    await this.page
      .locator(selectors.dropdown.state)
      .selectOption(data.state);
  }

  // Submit new address form
  async submitAddress() {
    const submitBtn = this.page.locator(selectors.button.submit);

    await this.page.waitForTimeout(2000);

    await expect(submitBtn).toBeVisible();

    await submitBtn.focus();
    await this.page.keyboard.press('Enter');

    await this.page.waitForLoadState('domcontentloaded');
  }

  // Verify new address appears in address list
  async verifyAddressAdded(addressData) {
    const addressBlock = this.page
      .locator(selectors.address.card)
      .filter({ hasText: addressData.name })
      .filter({ hasText: addressData.phone })
      .first();

    await expect(addressBlock).toBeVisible();
  }

  // Delete address using unique data
  async deleteAddress(addressData) {
    const addressCard = this.page
      .locator(selectors.address.card)
      .filter({ hasText: addressData.name })
      .filter({ hasText: addressData.phone })
      .first();

    await expect(addressCard).toBeVisible();
    const cardId = await addressCard.getAttribute('id');
    const index = cardId.split('-').pop();
    const deleteBtn = this.page.locator(
      selectors.address.deleteBtn(index)
    );

    await expect(deleteBtn).toBeVisible();
    await deleteBtn.click();

    const confirmBtn = this.page.locator(
      selectors.address.confirmDeleteBtn(index)
    );

    await expect(confirmBtn).toBeVisible();
    await confirmBtn.click();
  }

  // Verify address deleted from address list
  async verifyAddressDeleted(addressData) {
    const addressBlock = this.page
      .locator(selectors.address.card)
      .filter({ hasText: addressData.name })
      .filter({ hasText: addressData.phone });

    await expect(addressBlock).toHaveCount(0);
  }
}

export default AddressPage;