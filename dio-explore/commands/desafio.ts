// Slash command /desafio em TypeScript
export async function desafioCommand(tecnologia: string, nivel: string): Promise<string> {
  return `🎯 Desafio gerado!\nTecnologia: ${tecnologia}\nNível: ${nivel}\nDescreva a solução para o problema proposto.`;
}
