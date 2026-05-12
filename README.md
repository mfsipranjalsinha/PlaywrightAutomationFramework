# PlaywrightAutomationFramework

[![Playwright CI Demo](https://github.com/mfsipranjalsinha/PlaywrightAutomationFramework/actions/workflows/playwright.yml/badge.svg)](https://github.com/mfsipranjalsinha/PlaywrightAutomationFramework/actions/workflows/playwright.yml)

A production-style hybrid automation framework built with **Playwright** and **JavaScript** for:

- UI automation
- API automation
- API mocking and interception
- Page Object Model (POM)
- CI/CD execution through GitHub Actions
- Allure reporting

This repository is designed to demonstrate scalable QA automation practices that can be shared with clients and included in a professional resume.

---

## Contents

- Overview
- Features
- Tech stack
- Project structure
- Prerequisites
- Setup
- Environment variables
- Running tests
- Reporting
- CI/CD
- Test design
- Adding new tests
- Troubleshooting
- License

---

## Overview

This framework covers both UI and API testing in a clean, maintainable structure.

### UI automation
The UI part of the framework automates Amazon flows such as:

- search
- product details
- cart
- address
- wishlist

### API automation
The API part of the framework covers:

- GET, POST, PUT, PATCH, DELETE
- valid and invalid response validation
- request and response handling
- authentication token reuse
- reusable API utilities
- sequential CRUD flows
- response mocking and interception

---

## Features

- Page Object Model implementation for UI tests
- Separate `tests/ui/` and `tests/api/` structure
- Reusable API client abstraction
- Centralized auth helper for token management
- JSON-based test payloads
- Valid and negative API testing
- Mocked API response validation
- Screenshots, videos, and traces on failure
- HTML and Allure reporting
- GitHub Actions CI/CD integration
- GitHub Pages deployment for Allure report
- Environment-based configuration using `.env`

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Playwright | UI and API automation |
| JavaScript (ES Modules) | Test and framework code |
| Node.js | Runtime |
| dotenv | Environment variable handling |
| Allure | Reporting |
| GitHub Actions | CI/CD |

---

## Project Structure

```text
PlaywrightAutomationFramework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── api-utils/
│   ├── apiClient.js
│   └── authHelper.js
├── config/
│   └── env.js
├── pages/
│   ├── AmazonHomePage.js
│   ├── AmazonLoginPage.js
│   ├── AccountPage.js
│   ├── AddressPage.js
│   ├── CartPage.js
│   ├── ProductDetailsPage.js
│   ├── SearchResultsPage.js
│   └── WishlistPage.js
├── payloads/
│   ├── createUserPayload.json
│   ├── loginPayload.json
│   └── mockApiUserPayload.json
├── screenshots/
├── test-data/
│   └── addressData.json
├── tests/
│   ├── ui/
│   └── api/
├── playwright.config.js
├── package.json
└── README.md

## Prerequisites

- Node.js 18 or later
- npm

Optional, but recommended for local report generation:

- Java 21 for Allure CLI
- GitHub account for CI/CD execution

---

## Setup

Clone the repository:

```bash
git clone https://github.com/mfsipranjalsinha/PlaywrightAutomationFramework.git
cd PlaywrightAutomationFramework
```

Install dependencies:

```bash
npm ci
```

Install Playwright browsers:

```bash
npx playwright install --with-deps
```

---

## Environment Variables

Create a `.env` file in the project root:

```env
EMAIL='your_email_here'
PASSWORD='your_password_here'
REQRES_API_KEY='your_reqres_api_key'
MOCKAPI_BASE_URL='your_mockapi_base_url'
```

### Purpose of each variable

- `EMAIL` and `PASSWORD` are used for Amazon login flows
- `REQRES_API_KEY` is used for ReqRes API requests
- `MOCKAPI_BASE_URL` is used for MockAPI CRUD validation

---

## Running Tests

### Run the full framework

```bash
npm run test
```

### Run UI tests only

```bash
npm run test:ui
```

### Run API tests only

```bash
npm run test:api
```

### Run smoke tests

```bash
npm run test:smoke
```

### Run regression tests

```bash
npm run test:regression
```

### Run sanity tests

```bash
npm run test:sanity
```

### Run E2E-tagged tests

```bash
npm run test:e2e
```

---

## Reporting

### HTML Report

Playwright generates an HTML report automatically after execution.

To open it locally:

```bash
npx playwright show-report
```

### Allure Report

Generate Allure results:

```bash
npm run allure:generate
```

Open the Allure report:

```bash
npm run allure:open
```

If needed, Allure can also be launched directly with:

```bash
npx allure open
```

---

## Hosted Allure Report

The latest Allure report is automatically deployed using GitHub Pages after a successful CI/CD run.

Live report:

https://mfsipranjalsinha.github.io/PlaywrightAutomationFramework/#

The hosted report includes:

- execution summary
- passed and failed test details
- screenshots on failure
- traces and debugging artifacts
- execution history
- API and UI execution results

This makes the latest execution easy to share with clients, recruiters, and reviewers without running the framework locally.

---

## CI/CD

This repository includes a GitHub Actions workflow at:

```text
.github/workflows/playwright.yml
```

### CI workflow includes

- repository checkout
- Node.js setup
- Java setup for Allure
- dependency installation
- Playwright browser installation
- automated test execution
- Allure report generation
- artifact upload
- GitHub Pages deployment for report sharing

The badge at the top of this README reflects the workflow status.

---

## Test Design

### UI tests

UI tests follow the Page Object Model approach:

- keep locators inside page classes
- keep assertions in test files
- reuse methods across specs
- reduce duplication

### API tests

API tests are structured to cover:

- request creation
- response parsing
- response validation
- positive and negative cases
- CRUD flows
- reusable API client usage
- auth handling
- mocking and interception

---

## API Coverage Included

### ReqRes API

Used for API fundamentals and response validation:

- GET users
- POST create user
- PUT update user
- PATCH partial update
- invalid login handling
- auth token reuse patterns

### MockAPI

Used for real CRUD persistence validation:

- create user
- fetch created user
- update user
- delete user
- verify deletion

### Mocking and Interception

A Playwright interception example is included using:

- `page.route()`
- `route.fetch()`
- `route.fulfill()`

This demonstrates frontend testing with mocked backend responses.

---

## Adding New Tests

### UI test example

Place new UI specs under:

```text
tests/ui/
```

### API test example

Place new API specs under:

```text
tests/api/
```

Use descriptive file names such as:

```text
TC_01_Search.ui.spec.js
TC_02_CreateUser.api.spec.js
```

Keep each test focused on one business behavior.

---

## Contributing

This repository is structured to stay clean and readable.

When adding tests:

- keep page objects focused
- avoid repeating locators
- use reusable API utilities
- keep test data in JSON files
- use tags for grouping
- keep CI-safe execution in mind
