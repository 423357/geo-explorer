// Executor de comandos Git
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export class GitExecutor {
  static async run(command: string, cwd?: string): Promise<string> {
    const { stdout, stderr } = await execAsync(command, { cwd });
    if (stderr && !stdout) throw new Error(stderr);
    return stdout.trim();
  }
}
