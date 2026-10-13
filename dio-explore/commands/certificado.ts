// Slash command /certificado em TypeScript
export async function certificadoCommand(nome: string, trilha: string): Promise<string> {
  const data = new Date().toLocaleDateString('pt-BR');
  const id = `DIO-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${new Date().getFullYear()}`;
  return `🎓 Certificado gerado!\nAluno: ${nome}\nTrilha: ${trilha}\nData: ${data}\nID: ${id}`;
}
