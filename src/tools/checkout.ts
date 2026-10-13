// Ferramenta: git checkout
import { GitExecutor } from '../services/git-executor';
export const checkoutTool = async (branch: string, cwd: string) => GitExecutor.run(`git checkout ${branch}`, cwd);
