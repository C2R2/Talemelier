const numberFormat = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
});

export default function formatter(numberToFormat) {
  return numberFormat.format(numberToFormat);
}
