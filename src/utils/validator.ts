// Validações gerais
export function validateTecnologia(tech: string): boolean {
  return typeof tech === 'string' && tech.trim().length > 0;
}

export function validateNivel(nivel: string): boolean {
  return ['Básico', 'Intermediário', 'Avançado'].includes(nivel);
}
