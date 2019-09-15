export default function toFixed(value, decimalPlaces) {
  return Math.floor(value * Math.pow(10, decimalPlaces)) / (Math.pow(10, decimalPlaces));
}