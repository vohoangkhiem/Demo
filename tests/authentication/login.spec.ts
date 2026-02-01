import { test } from '../../src/support/page-fixtures';
import { validLoginWithSignupTestCases, invalidLoginTestCases } from '../../src/data/auth-test-data';

test.describe('Login Feature', () => {

  test.beforeEach(async ({ homePage }) => {
    await homePage.goto();
  });

  test.describe('Login with valid credentials', { tag: ['@functional', '@smoke', '@regression'] }, () => {

    for (const testCase of validLoginWithSignupTestCases) {
      test(testCase.description, async ({ signUpPage, loginPage }) => {
        const { username, password } = await signUpPage.signUp(testCase.credentials);
        await loginPage.login(username, password);
        await loginPage.expectLoginSuccess(username);
      });
    }
  });

  test.describe('Attempt login with invalid credentials', { tag: ['@functional', '@validation', '@regression'] }, () => {
    
    for (const testCase of invalidLoginTestCases) {
      test(testCase.description, async ({ loginPage }) => {
        await loginPage.loginWithInvalidCredentials(testCase);
        await loginPage.expectLoginFailed();
      });
    }
  });
});