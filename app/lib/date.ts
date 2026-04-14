const DATE_ONLY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

export function parseDateValue(value: string): Date {
  if (DATE_ONLY_PATTERN.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}

export function formatDatePtBr(
  value: string,
  options: Intl.DateTimeFormatOptions,
) {
  return parseDateValue(value).toLocaleDateString("pt-BR", options);
}

export function compareDateStringsDesc(left: string, right: string) {
  return parseDateValue(right).getTime() - parseDateValue(left).getTime();
}