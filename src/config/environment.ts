import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });

export const config = {
  baseUrl: process.env.BASE_URL || 'https://www.demoblaze.com',

  browser: {
    headless: process.env.HEADLESS === 'false',
  },

  timeouts: {
    default: parseInt(process.env.DEFAULT_TIMEOUT || '30000', 10),
    action: parseInt(process.env.ACTION_TIMEOUT || '15000', 10),
    navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '30000', 10),
    expect: parseInt(process.env.EXPECT_TIMEOUT || '10000', 10),
  },

  retries: {
    ci: parseInt(process.env.CI_RETRIES || '2', 10),
    local: parseInt(process.env.LOCAL_RETRIES || '0', 10),
  },

  isCI: process.env.CI === 'true',
} as const;

export type Config = typeof config;
export default config;
