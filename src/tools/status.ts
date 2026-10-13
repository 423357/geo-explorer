// Ferramenta: git status
import { RepositoryManager } from '../services/repository-manager';
export const statusTool = async (cwd: string) => RepositoryManager.status(cwd);
