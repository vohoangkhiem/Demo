import { defineConfig, devices } from '@playwright/test';
import { config as envConfig } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: envConfig.isCI ? envConfig.retries.ci : envConfig.retries.local,
  workers: envConfig.isCI ? 1 : undefined,

  reporter: [
    ['list'],
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }],
    ['json', { 
      outputFile: 'test-results/results.json' 
    }],
    ['junit', { 
      outputFile: 'test-results/junit.xml' 
    }]
  ],

  preserveOutput: 'always',
  timeout: envConfig.timeouts.default,

  expect: {
    timeout: envConfig.timeouts.expect,
  },

  use: {
    baseURL: envConfig.baseUrl,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    headless: envConfig.isCI || envConfig.browser.headless,
    launchOptions: {
      slowMo: 0,
    },
    actionTimeout: envConfig.timeouts.action,
    navigationTimeout: envConfig.timeouts.navigation,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9'
    }
  },

  projects: [
    // Default browser - run with: npx playwright test
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },
    // Firefox - run with: npx playwright test --project=firefox
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox']
    //   },
    // },
    // WebKit (Safari) - run with: npx playwright test --project=webkit
    // {
    //   name: 'webkit',
    //   use: { 
    //     ...devices['Desktop Safari']
    //   },
    // },
    // Mobile Chrome - run with: npx playwright test --project="Mobile Chrome"
    // {
    //   name: 'Mobile Chrome',
    //   use: { 
    //     ...devices['Pixel 5']
    //   },
    // },
    // Mobile Safari - run with: npx playwright test --project="Mobile Safari"
    // {
    //   name: 'Mobile Safari',
    //   use: { 
    //     ...devices['iPhone 12']
    //   },
    // },
  ],

  outputDir: 'test-results/',
  globalSetup: './src/config/global-setup.ts',
  globalTeardown: './src/config/global-teardown.ts',
});
