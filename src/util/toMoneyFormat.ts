export default function toMoneyFormat(
  value: number | string
): string | undefined {
  if (typeof value === 'string') value = +value;

  return (
    '$' +
    value
      .toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })
      .substring(2)
  );
}
