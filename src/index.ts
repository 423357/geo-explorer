import { toolTrilha, toolDesafio, toolCertificado, toolStatus } from './tools/commands.js';
const argumentos = process.argv.slice(2);
const comando = argumentos[0];
const tecnologia = argumentos[1];
const nivel = argumentos[2];
const alunoNome = argumentos[1];
const trilhaNome = argumentos[2];

if (comando === 'trilha') {
  const resultado = toolTrilha(tecnologia);
  console.log(JSON.stringify(resultado, null, 2));
  process.exitCode = resultado.sucesso ? 0 : 1;
} else if (comando === 'desafio') {
  if (!tecnologia || !nivel) {
    console.log('Uso: node dist/index.js desafio <tecnologia> <nivel>');
process.exitCode = 1; 
} else {
  const resultado = toolDesafio(tecnologia, nivel, 'dist');
console.log(JSON.stringify(resultado, null, 2));
process.exitCode = resultado.sucesso ? 0 : 1;
  }
} else if (comando === 'certificado') {
  if (!alunoNome || !trilhaNome) {
      console.log('Uso: node dist/index.js certificado "<nome completo>" <tecnologia>');
 process.exitCode = 1;
    } else {
    const resultado = toolCertificado(alunoNome, trilhaNome, 'dist');
    console.log(JSON.stringify(resultado, null, 2));
    process.exitCode = resultado.sucesso ? 0 : 1;

  }
} else {
  console.log('Comandos disponíveis: trilha, desafio e certificado');
  process.exitCode = 1;
}