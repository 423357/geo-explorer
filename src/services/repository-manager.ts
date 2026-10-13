// Gerenciamento de repositórios
import { GitExecutor } from './git-executor';

export class RepositoryManager {
  static async clone(url: string, dest: string): Promise<string> {
    return GitExecutor.run(`git clone ${url} ${dest}`);
  }

  static async status(cwd: string): Promise<string> {
    return GitExecutor.run('git status', cwd);
  }

  static async pull(cwd: string): Promise<string> {
    return GitExecutor.run('git pull', cwd);
  }
}
