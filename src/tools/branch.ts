// Ferramenta: git branch
import { GitExecutor } from '../services/git-executor';
export const branchTool = async (cwd: string) => GitExecutor.run('git branch', cwd);
