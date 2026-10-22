export function maskPhone(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 11);

  // Se tiver até 10 dígitos: (99) 9999-9999
  if (numbers.length <= 10) {
    return numbers
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d{1,4})$/, "$1-$2");
  }

  // Se tiver 11 dígitos: (99) 9 9999-9999
  return numbers
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{1})(\d{4})(\d{4})$/, "$1 $2-$3");
}

export function unmaskPhone(value: string) {
  return value.replace(/\D/g, "");
}

export function maskCurrency(value: string) {
  const numericValue = value.replace(/\D/g, "");
  const number = Number(numericValue) / 100;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  })
    .format(isNaN(number) ? 0 : number)
    .trim(); // Remove o R$ se quiser exibir só o número formatado, ou deixe se preferir
}

export function unmaskCurrency(value: string): number {
  const numericString = value.replace(/\D/g, "");
  // Retorna o valor em centavos como número inteiro (ex: "104.900,00" vira 10490000)
  return Number(numericString) || 0;
}

export function maskKm(value: string) {
  const numericValue = value.replace(/\D/g, "");
  if (!numericValue) return "";
  return Number(numericValue).toLocaleString("pt-BR");
}

export function unmaskKm(value: string): string {
  return value.replace(/\D/g, "");
}
