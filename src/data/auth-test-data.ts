import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { alertMessages } from './messages';

export interface UserCredentials {
  username: string;
  password: string;
}

export interface ValidLoginWithSignupTestCase {
  description: string;
  credentials?: UserCredentials;
}

export interface InvalidLoginTestCase {
  description: string;
  credentials: UserCredentials;
  expectedMessage: string;
}

export class AuthTestData {
  static generateUsername(length: number = 15): string {
    return faker.string.alphanumeric(length);
  }

  static generatePassword(length: number = 15): string {
    return faker.internet.password({ length, memorable: false, pattern: /[A-Za-z0-9!@#$%^&*]/ });
  }

  static getEnvCredentials(): UserCredentials {
    this.loadEnv();
    const fileEnv = this.readEnvFile();
    return {
      username:
        fileEnv.TEST_USERNAME || process.env.TEST_USERNAME || '',
      password:
        fileEnv.TEST_PASSWORD || process.env.TEST_PASSWORD || '',
    };
  }

  static get longUsernameUser(): UserCredentials {
    return {
      username: this.generateUsername(100),
      password: this.generatePassword(),
    };
  }

  static get longPasswordUser(): UserCredentials {
    return {
      username: this.generateUsername(),
      password: this.generatePassword(100),
    };
  }

  static get wrongPasswordUser(): UserCredentials {
    return {
      username: this.getEnvCredentials().username,
      password: 'WrongPassword123',
    };
  }

  static get nonExistentUser(): UserCredentials {
    return {
      username: this.generateUsername(15),
      password: this.getEnvCredentials().password,
    };
  }

  static get emptyUsernameUser(): UserCredentials {
    return {
      username: '',
      password: this.getEnvCredentials().password,
    };
  }

  static get emptyPasswordUser(): UserCredentials {
    return {
      username: this.getEnvCredentials().username,
      password: '',
    };
  }
 
  static get emptyUser(): UserCredentials {
    return {
      username: '',
      password: '',
    };
  }

  private static loadEnv(): void {
    dotenv.config({ path: path.resolve(process.cwd(), '.env'), override: true });
  }

  private static readEnvFile(): Record<string, string> {
    try {
      const envPath = path.resolve(process.cwd(), '.env');
      if (!fs.existsSync(envPath)) {
        return {};
      }
      const raw = fs.readFileSync(envPath, 'utf-8');
      return dotenv.parse(raw) as Record<string, string>;
    } catch {
      return {};
    }
  }
}

export const validLoginWithSignupTestCases: ValidLoginWithSignupTestCase[] = [
  {
    description: 'Login with valid credentials after successful sign-up',
    credentials: undefined
  },
  {
    description: 'Login with valid credentials using long username (100 characters)',
    credentials: AuthTestData.longUsernameUser
  },
  {
    description: 'Login with valid credentials using long password (100 characters)',
    credentials: AuthTestData.longPasswordUser
  }
];

export const invalidLoginTestCases: InvalidLoginTestCase[] = [
  {
    description: 'Login attempt with incorrect password',
    credentials: AuthTestData.wrongPasswordUser,
    expectedMessage: alertMessages.loginWrongPassword
  },
  {
    description: 'Login attempt with non-existent username',
    credentials: AuthTestData.nonExistentUser,
    expectedMessage: alertMessages.loginFailed
  },
  {
    description: 'Login attempt with empty username',
    credentials: AuthTestData.emptyUsernameUser,
    expectedMessage: alertMessages.loginEmptyFields
  },
  {
    description: 'Login attempt with empty password',
    credentials: AuthTestData.emptyPasswordUser,
    expectedMessage: alertMessages.loginEmptyFields
  },
  {
    description: 'Login attempt with empty username and empty password',
    credentials: AuthTestData.emptyUser,
    expectedMessage: alertMessages.loginEmptyFields
  }
];

export default AuthTestData;
