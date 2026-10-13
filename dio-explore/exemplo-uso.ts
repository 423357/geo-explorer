// Exemplo de uso dos slash commands via código
import * as fs from 'fs';
import * as path from 'path';

const trilhasPath = path.join(__dirname, 'data', 'trilhas_dio.json');
const dados = JSON.parse(fs.readFileSync(trilhasPath, 'utf-8'));

// Exemplo: buscar trilha por tecnologia
function buscarTrilha(tecnologia: string) {
  return dados.trilhas.find(
    (t: any) => t.tecnologia.toLowerCase() === tecnologia.toLowerCase()
  );
}

console.log(buscarTrilha('Python'));
