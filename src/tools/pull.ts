// Ferramenta: git pull
import { GitExecutor } from '../services/git-executor';
export const pullTool = async (cwd: string) => GitExecutor.run('git pull', cwd);
