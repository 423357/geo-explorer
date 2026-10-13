// Logger simples
export const logger = {
  info: (msg: string) => console.error(`[INFO] ${msg}`),
  error: (msg: string) => console.error(`[ERROR] ${msg}`),
  warn: (msg: string) => console.error(`[WARN] ${msg}`),
};
