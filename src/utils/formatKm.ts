export function formatKm(km: number | undefined): string {
  if (!km) return "";
  // Transforma 12398 em "12.398"
  return km.toLocaleString("pt-BR");
}
