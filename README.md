# Demoblaze Playwright Framework

## Framework Structure

```
├── src/
│   ├── config/           # Configuration and setup
│   │   ├── environment.ts      # Centralized environment variables
│   │   ├── global-setup.ts     # Pre-test setup (runs once)
│   │   └── global-teardown.ts  # Post-test cleanup (runs once)
│   │
│   ├── data/             # Test data management
│   │   ├── auth-test-data.ts   # Authentication test data
│   │   ├── cart-test-data.ts   # Cart/product test data
│   │   ├── order-test-data.ts  # Order form test data
│   │   ├── messages.ts         # Expected UI messages
│   │   └── products.ts         # Product types and categories
│   │
│   ├── pages/            # Page Object Model
│   │   ├── base.page.ts        # Base page with common methods
│   │   ├── home.page.ts        # Homepage interactions
│   │   ├── login.page.ts       # Login modal
│   │   ├── signup.page.ts      # Signup modal
│   │   ├── product.page.ts     # Product detail page
│   │   ├── cart.page.ts        # Shopping cart page
│   │   ├── place-order.page.ts # Checkout modal
│   │   └── components/         # Reusable UI components
│   │       └── header.component.ts
│   │
│   ├── support/          # Test fixtures and hooks
│   │   ├── page-fixtures.ts    # Page object fixtures
│   │   ├── api-fixtures.ts     # API context fixtures
│   │   └── hooks.ts            # Before/after hooks
│   │
│   ├── utils/            # Utility functions
│   │   ├── api-utils.ts        # API helper methods
│   │   └── dialog-utils.ts     # Browser dialog handlers
│   │
│   └── workflows/        # Business workflow helpers
│       └── cart.workflow.ts    # Cart operations workflow
│
├── tests/                # Test specifications
│   ├── authentication/   # Login/signup tests
│   │   └── login.spec.ts
│   └── checkout/         # Cart and order tests
│       ├── cart.spec.ts
│       └── order.spec.ts
│
├── playwright.config.ts  # Playwright configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

### Design Rationale

| Layer | Purpose | Benefit |
|-------|---------|---------|
| **Pages** | Encapsulate UI interactions | Changes to UI only affect page files |
| **Components** | Reusable UI elements (header, modals) | DRY principle, consistent interactions |
| **Data** | Centralized test data with Faker.js | Dynamic data, easy maintenance |
| **Utils** | Common helper functions | Reusable across all tests |
| **Workflows** | Multi-step business processes | Readable tests, reduce duplication |
| **Fixtures** | Dependency injection for pages | Clean test setup, automatic cleanup |
| **Config** | Environment-based settings | Easy switching between environments |

### Key Design Decisions

1. **Page Object Model (POM)** - Separates test logic from UI implementation. When the UI changes, only page files need updates.

2. **Fixtures over Inheritance** - Playwright fixtures provide cleaner dependency injection than class inheritance, with automatic setup/teardown.

3. **Data-Driven Testing** - Test data is externalized in `/data` folder, making it easy to add new test cases without modifying test code.

4. **Centralized Configuration** - All timeouts, URLs, and settings in one place (`environment.ts`), configurable via environment variables.

5. **Explicit Waits** - Uses Playwright's auto-waiting assertions (`toBeVisible`, `toContainText`) instead of arbitrary `waitForTimeout` for reliable tests.

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

### Automatic Triggers

The workflow runs automatically when you:
- Push to `main`, `master`, or `develop` branch
- Create a Pull Request to these branches

### Manual Test Execution

To run tests manually in GitHub:

1. Go to **Actions** tab in your repository
2. Select **Manual Test Run** workflow from the left sidebar
3. Click **Run workflow** button (right side)
4. Select the branch and click **Run workflow**

### View Test Results

1. Go to **Actions** tab
2. Click on the workflow run
3. Download artifacts:
   - `playwright-report` - HTML test report
   - `test-results` - Screenshots/videos (on failure)
