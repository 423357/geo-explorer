// Ferramenta: git push
import { GitExecutor } from '../services/git-executor';
export const pushTool = async (cwd: string) => GitExecutor.run('git push', cwd);
