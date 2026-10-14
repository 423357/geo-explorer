import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import type { Certificado } from '../types/index.js';

export function gerarCertificado(alunoNome: string, trilha: string, cargaHoraria: number): Certificado {
  const codigoValidacao = crypto
    .createHash('sha256')
    .update(`${alunoNome}-${trilha}-${Date.now()}`)
    .digest('hex')
    .substring(0, 16)
    .toUpperCase();

  return {
    id: `cert-${Date.now()}`,
    alunoNome,
    trilha,
    dataEmissao: new Date().toISOString(),
    codigoValidacao,
    cargaHoraria,
  };
}

export function salvarCertificado(certificado: Certificado, outputDir: string = 'dist'): string {
  const alunoSlug = certificado.alunoNome
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const nomeArquivo = `certificado_${alunoSlug}_${certificado.trilha}_${timestamp}.md`;
  const caminhoCompleto = path.join(outputDir, nomeArquivo);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const conteudo = `
╔══════════════════════════════════════════════════════════════╗
║              CERTIFICADO DE CONCLUSÃO — DIO                  ║
╚══════════════════════════════════════════════════════════════╝

# Certificado de Conclusão

Este documento certifica que

## ${certificado.alunoNome.toUpperCase()}

concluiu com êxito a trilha de aprendizado:

### 🎯 ${certificado.trilha.toUpperCase()}

**Detalhes:**
- 📅 Data de Emissão : ${new Date(certificado.dataEmissao).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
- ⏱️  Carga Horária  : ${certificado.cargaHoraria} horas
- 🆔 Código          : \`${certificado.codigoValidacao}\`
- 🔖 ID Certificado  : \`${certificado.id}\`

---

> Certificado gerado pelo **IBM Bob Lab MCP**
> Plataforma: Digital Innovation One (DIO)
> Valide em: https://www.dio.me/certificate/${certificado.codigoValidacao}

---
*Este certificado foi emitido eletronicamente e tem validade comprovada pelo código de validação acima.*
  `.trim();

  fs.writeFileSync(caminhoCompleto, conteudo, 'utf-8');
  return caminhoCompleto;
}

export function formatarCertificado(certificado: Certificado): string {
  return `
✅ Certificado gerado com sucesso!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 Aluno     : ${certificado.alunoNome}
🎯 Trilha    : ${certificado.trilha}
📅 Emissão   : ${new Date(certificado.dataEmissao).toLocaleDateString('pt-BR')}
⏱️  Carga     : ${certificado.cargaHoraria}h
🔑 Código    : ${certificado.codigoValidacao}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}
