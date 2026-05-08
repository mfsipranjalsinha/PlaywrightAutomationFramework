// @ts-check

import { defineConfig, devices } from '@playwright/test';

import 'dotenv/config';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : 1,

  timeout: 60000,

  reporter: [

    ['list'],

    ['html', { open: 'never' }],

    ['allure-playwright']

  ],

  use: {

    headless: process.env.CI ? true : false,

    baseURL: 'https://www.amazon.in',

    viewport: {
      width: 1280,
      height: 720
    },

    actionTimeout: 10000,

    navigationTimeout: 30000,

    trace: 'on-first-retry',

    screenshot: 'only-on-failure',

    video: 'retain-on-failure',

    launchOptions: {
      args: ['--disable-web-security']
    }
  },

  expect: {
    timeout: 15000
  },

  projects: [

    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }

  ]

});