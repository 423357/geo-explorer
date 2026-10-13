// Slash command /trilha em TypeScript
import * as fs from 'fs';
import * as path from 'path';

export async function trilhaCommand(tecnologia: string): Promise<string> {
  const dados = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/trilhas_dio.json'), 'utf-8')
  );
  const trilha = dados.trilhas.find(
    (t: any) => t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
  if (!trilha) return `Trilha para "${tecnologia}" não encontrada.`;
  return `📚 Trilha: ${trilha.nome}\nNível: ${trilha.nivel}\nMódulos: ${trilha.modulos}\nXP: ${trilha.xp_total}`;
}
