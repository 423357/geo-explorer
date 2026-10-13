// Gerenciamento de credenciais Git
export class CredentialHelper {
  static getCredentials(): { username: string; token: string } {
    return {
      username: process.env.GIT_USERNAME || '',
      token: process.env.GIT_TOKEN || '',
    };
  }
}
