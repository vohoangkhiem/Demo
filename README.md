# Demoblaze Playwright Framework
## Features

- **Page Object Model (POM)** - Clean, maintainable test architecture
- **Cross-Browser Support** - Chrome, Firefox, WebKit (Safari)
- **Mobile Device Emulation** - Pixel 5, iPhone 12
- **TypeScript** - Type-safe test development
- **Faker.js Integration** - Dynamic, realistic test data generation
- **HTML Reports** - Clear Playwright test reports
- **Modular Design** - Easy to extend and maintain
- **Centralized Configuration** - Environment-based settings

## Prerequisites

- Node.js 18+ (LTS recommended)
- npm (included with Node.js)

Verify installation:
node -v
npm -v

## Installation

1. Clone or extract the project:
git clone <repository-url>
cd demoblaze-playwright-framework

2. Install dependencies:
npm ci

Note: `npm ci` ensures consistent versions from package-lock.json

3. Install Playwright browsers:
npx playwright install

## Running Tests
npx playwright test

## View Test Report
After test execution, open the HTML report:
npx playwright show-report

## Configuration

Key settings in `playwright.config.ts`:
- **Default browser**: Chrome
- **Timeouts**: Configurable via environment variables
- **Retries**: Auto-retry on CI (2 retries)

## GitHub Actions CI/CD

A GitHub Actions workflow is included at `.github/workflows/playwright.yml`.

### Manual Execution

1. Go to your GitHub repository
2. Click **Actions** tab
3. Select **Playwright E2E Tests** workflow
4. Click **Run workflow**
5. Click **Run workflow** button

### View Test Results

1. Go to **Actions** tab
2. Click on the workflow run
3. Download artifacts:
   - `playwright-report-{browser}` - HTML test report
   - `test-results-{browser}` - Screenshots/videos (on failure)