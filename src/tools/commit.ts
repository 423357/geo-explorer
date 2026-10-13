// Ferramenta: git commit
import { GitExecutor } from '../services/git-executor';
export const commitTool = async (message: string, cwd: string) => GitExecutor.run(`git commit -m "${message}"`, cwd);
