export function formatCurrency(cents: number) {
  const number = cents / 100;
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(number);
}
// Exemplo de uso na tela: formatCurrencyFromFirebase(car.price) -> "R$ 104.900,00"
