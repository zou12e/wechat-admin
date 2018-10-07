export { scienceNumber, toDecimalPoint, date } from '../../utils/filters';
export function dict (value, data = []) {
  let label = '';
  for (let i = 0; i < data.length; i++) {
    if (data[i].value === value) {
      return data[i].label;
    }
  }
  return label;
}
