export function formatPhone(phone: string | number | undefined): string {
  if (!phone) return "";

  // Garante que temos apenas os números como string
  const numbers = String(phone).replace(/\D/g, "");

  // Se tiver 10 dígitos, formata como fixo: (00) 0000-0000
  if (numbers.length === 10) {
    return numbers.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }

  // Se tiver 11 dígitos, formata como celular com 9º dígito: (00) 0 0000-0000
  if (numbers.length === 11) {
    return numbers.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, "($1) $2 $3-$4");
  }

  // Caso venha com algum tamanho atípico, retorna o original limpo ou parcial
  return numbers;
}
