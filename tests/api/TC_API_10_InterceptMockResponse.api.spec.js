import { test, expect }
  from '@playwright/test';

test.describe(
  'API Mocking',
  () => {

  test(
    '@regression Mock Fruit API Response',
    async ({ page }) => {

    await page.route(
      '*/**/api/v1/fruits',
      async route => {

        const response =
          await route.fetch();

        const json =
          await response.json();

        json.push({

          name: 'Pranjal',

          id: 100

        });

        await route.fulfill({

          response,

          json

        });

      }
    );

    await page.goto(
      'https://demo.playwright.dev/api-mocking'
    );

    await expect(
      page.getByText(
        'Pranjal',
        {
          exact: true
        }
      )
    ).toBeVisible();

  });

});