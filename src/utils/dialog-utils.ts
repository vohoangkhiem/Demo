import { Page } from '@playwright/test';

/**
 * Handles dialog during an action - accepts it and returns the message.
 */
export async function handleDialog(
  page: Page,
  action: () => Promise<void>
): Promise<string> {
  let message = '';
  const dialogCaptured = new Promise<void>((resolve) => {
    page.once('dialog', async (dialog) => {
      message = dialog.message();
      await dialog.accept();
      resolve();
    });
  });

  await action();
  await dialogCaptured;

  return message;
}
