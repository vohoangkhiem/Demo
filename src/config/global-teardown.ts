import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig): Promise<void> {
}

export default globalTeardown;