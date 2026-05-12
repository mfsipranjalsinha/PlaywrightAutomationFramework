// @ts-check

import 'dotenv/config';

import {
  defineConfig,
  devices
} from '@playwright/test';

import { ENV }
  from './config/env.js';

export default defineConfig({

  testDir: './tests',

  fullyParallel: true,

  forbidOnly:
    !!process.env.CI,

  retries:
    process.env.CI ? 2 : 0,

  workers:
    process.env.CI ? 1 : 1,

  timeout: 90000,

  reporter: [

    ['list'],

    ['html', {
      open: 'never'
    }],

    ['allure-playwright']

  ],

  use: {

    headless:
      process.env.CI ? true : false,

    viewport: {
      width: 1280,
      height: 720
    },

    actionTimeout: 10000,

    navigationTimeout: 30000,

    trace:
      'on-first-retry',

    screenshot:
      'only-on-failure',

    video:
      'retain-on-failure'

  },

  expect: {
    timeout: 15000
  },

  projects: [

    {
      name: 'chromium',

      testIgnore: [
        '**/*.api.spec.js'
      ],

      use: {

        ...devices['Desktop Chrome'],

        baseURL:
          'https://www.amazon.in'

      }
    },

    // {
    //   name: 'firefox',

    //   testIgnore: [
    //     '**/*.api.spec.js'
    //   ],

    //   use: {

    //     ...devices['Desktop Firefox'],

    //     baseURL:
    //       'https://www.amazon.in'

    //   }
    // },

    // {
    //   name: 'webkit',

    //   testIgnore: [
    //     '**/*.api.spec.js'
    //   ],

    //   use: {

    //     ...devices['Desktop Safari'],

    //     baseURL:
    //       'https://www.amazon.in'

    //   }
    // },

    {
      name: 'api',

      testMatch: [
        '**/*.api.spec.js'
      ],

      use: {

        baseURL:
          'https://reqres.in',

        extraHTTPHeaders: {

          'x-api-key':
            ENV.reqres.apiKey

        }

      }
    }

  ]

});