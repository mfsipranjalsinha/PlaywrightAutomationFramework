import { test } from '@playwright/test';

import AmazonHomePage from '../pages/AmazonHomePage.js';
import AmazonLoginPage from '../pages/AmazonLoginPage.js';
import AccountPage from '../pages/AccountPage.js';
import AddressPage from '../pages/AddressPage.js';

import addressData from '../test-Data/addressData.json' assert { type: 'json' };

let home;
let login;
let account;
let address;

test.describe('Address Feature', () => {

  test.beforeEach(async ({ page }) => {

    home = new AmazonHomePage(page);

    login = new AmazonLoginPage(page);

    account = new AccountPage(page);

    address = new AddressPage(page);

    // Open application
    await home.gotoURL('/');

    await home.handleContinueShopping();

    // Login before every test
    await home.clickSignIn();

    await login.enterEmailOrPhone(
      process.env.EMAIL
    );

    await login.clickContinue();

    await login.enterPassword(
      process.env.PASSWORD
    );

    await login.clickSignin();

    await login.verifyLoginSuccess();
  });

  test('Add New Address after Login', async () => {

    // Open account page
    await account.openAccount();

    // Open addresses section
    await account.openAddresses();

    // Click add address
    await account.clickAddAddress();

    // Verify address form loaded
    await address.checkAddressPageLoaded();

    // Fill address form
    await address.fillAddressForm(
      addressData.address
    );

    // Submit address
    await address.submitAddress();

    // Verify address added
    await address.verifyAddressAdded(
      addressData.address
    );

    // Delete added address
    await address.deleteAddress(
      addressData.address
    );

    // Verify address deleted
    await address.verifyAddressDeleted(
      addressData.address
    );
  });

});