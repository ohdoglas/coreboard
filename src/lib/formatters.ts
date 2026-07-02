export const numberFormatter = new Intl.NumberFormat('pt-BR');

export function formatPoints(value: number) {
  return `${numberFormatter.format(value)} pts`;
}

export function percentFromProgress(current: number, target: number) {
  if (target <= 0) return 0;
  return Math.min(100, Math.round((current / target) * 100));
}
