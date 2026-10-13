// Ferramenta: git clone
import { RepositoryManager } from '../services/repository-manager';
export const cloneTool = async (url: string, dest: string) => RepositoryManager.clone(url, dest);
