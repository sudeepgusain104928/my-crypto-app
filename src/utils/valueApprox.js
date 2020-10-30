export function MoneyFormat(labelValue) {
  var buffer =
    Math.abs(Number(labelValue)) >= 1.0e9
      ? Math.abs(Number(labelValue)) / 1.0e9 + " B"
      : Math.abs(Number(labelValue)) >= 1.0e6
      ? Math.abs(Number(labelValue)) / 1.0e6 + " M"
      : Math.abs(Number(labelValue)) >= 1.0e3
      ? Math.abs(Number(labelValue)) / 1.0e3 + " K"
      : Math.abs(Number(labelValue));

  return parseFloat(buffer).toPrecision(4) + buffer.replace(/[^ B| M| K]/g, "");
}
