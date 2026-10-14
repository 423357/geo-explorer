#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { exec } from "child_process";
import { promisify } from "util";
import { z } from "zod";
const execAsync = promisify(exec);
// Diretório do repositório — usa variável de ambiente ou o diretório atual
const REPO_DIR = process.env.GIT_REPO_DIR || process.cwd();
async function runGit(command) {
    try {
        const { stdout, stderr } = await execAsync(`git ${command}`, {
            cwd: REPO_DIR,
        });
        return stdout || stderr || "(sem saída)";
    }
    catch (error) {
        const err = error;
        const msg = err.stderr || err.stdout || err.message || String(error);
        throw new Error(msg.trim());
    }
}
const server = new McpServer({ name: "mcp-github-server", version: "1.0.0" });
// ─── git_status ──────────────────────────────────────────────────────────────
server.registerTool("git_status", {
    description: "Mostra o status atual do repositório Git (arquivos modificados, staged, untracked)",
    inputSchema: z.object({}),
}, async () => {
    try {
        const result = await runGit("status");
        return { content: [{ type: "text", text: result }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git status: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_add ─────────────────────────────────────────────────────────────────
server.registerTool("git_add", {
    description: "Adiciona arquivos ao staging area do Git",
    inputSchema: z.object({
        arquivos: z
            .string()
            .describe('Arquivos a adicionar. Use "." para adicionar todos, ou especifique caminhos separados por espaço'),
    }),
}, async ({ arquivos }) => {
    try {
        const result = await runGit(`add ${arquivos}`);
        return { content: [{ type: "text", text: `✅ Arquivos adicionados ao staging: ${arquivos}\n${result}` }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git add: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_commit ───────────────────────────────────────────────────────────────
server.registerTool("git_commit", {
    description: "Cria um commit com os arquivos em staging",
    inputSchema: z.object({
        mensagem: z.string().describe("Mensagem descritiva do commit (ex: feat: adiciona nova funcionalidade)"),
    }),
}, async ({ mensagem }) => {
    try {
        const result = await runGit(`commit -m "${mensagem.replace(/"/g, '\\"')}"`);
        return { content: [{ type: "text", text: `✅ Commit criado!\n\n${result}` }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git commit: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_push ────────────────────────────────────────────────────────────────
server.registerTool("git_push", {
    description: "Envia commits locais para o repositório remoto",
    inputSchema: z.object({
        remote: z.string().default("origin").describe("Nome do repositório remoto (padrão: origin)"),
        branch: z.string().default("main").describe("Nome da branch (padrão: main)"),
    }),
}, async ({ remote, branch }) => {
    try {
        const result = await runGit(`push ${remote} ${branch}`);
        return { content: [{ type: "text", text: `✅ Push realizado para ${remote}/${branch}!\n\n${result}` }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git push: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_pull ────────────────────────────────────────────────────────────────
server.registerTool("git_pull", {
    description: "Busca e integra mudanças do repositório remoto",
    inputSchema: z.object({
        remote: z.string().default("origin").describe("Nome do repositório remoto (padrão: origin)"),
        branch: z.string().default("main").describe("Nome da branch (padrão: main)"),
    }),
}, async ({ remote, branch }) => {
    try {
        const result = await runGit(`pull ${remote} ${branch}`);
        return { content: [{ type: "text", text: `✅ Pull realizado de ${remote}/${branch}!\n\n${result}` }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git pull: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_log ─────────────────────────────────────────────────────────────────
server.registerTool("git_log", {
    description: "Exibe o histórico de commits do repositório",
    inputSchema: z.object({
        limite: z.number().default(10).describe("Número de commits a exibir (padrão: 10)"),
    }),
}, async ({ limite }) => {
    try {
        const result = await runGit(`log --oneline --decorate --graph -${limite}`);
        return { content: [{ type: "text", text: `📋 Últimos ${limite} commits:\n\n${result}` }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git log: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_branch ──────────────────────────────────────────────────────────────
server.registerTool("git_branch", {
    description: "Lista as branches existentes ou cria uma nova branch",
    inputSchema: z.object({
        nova_branch: z
            .string()
            .optional()
            .describe("Nome da nova branch a criar (opcional — se omitido, lista as branches existentes)"),
    }),
}, async ({ nova_branch }) => {
    try {
        const command = nova_branch ? `checkout -b ${nova_branch}` : "branch -a";
        const result = await runGit(command);
        const msg = nova_branch
            ? `✅ Branch "${nova_branch}" criada e ativada!\n\n${result}`
            : `🌿 Branches disponíveis:\n\n${result}`;
        return { content: [{ type: "text", text: msg }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git branch: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── git_diff ────────────────────────────────────────────────────────────────
server.registerTool("git_diff", {
    description: "Mostra as diferenças entre arquivos modificados (não staged) ou staged",
    inputSchema: z.object({
        staged: z
            .boolean()
            .default(false)
            .describe("Se true, mostra diff dos arquivos em staging. Se false, mostra diff dos arquivos modificados"),
    }),
}, async ({ staged }) => {
    try {
        const command = staged ? "diff --cached" : "diff";
        const result = await runGit(command);
        const texto = result.trim() || "✅ Nenhuma diferença encontrada.";
        return { content: [{ type: "text", text: texto }] };
    }
    catch (error) {
        return {
            content: [{ type: "text", text: `Erro ao executar git diff: ${error instanceof Error ? error.message : String(error)}` }],
            isError: true,
        };
    }
});
// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`🐙 MCP GitHub Server rodando em stdio | Repositório: ${REPO_DIR}`);
}
main().catch((error) => {
    console.error("Erro fatal:", error);
    process.exit(1);
});
