import dayjs from 'dayjs';
import Big from './big.js';
/**
 * 格式化成小数点
 */
export function toDecimalPoint (value, len = 2, addZero = false) {
  let money = String(Number(String(value).replace(/,/g, ''))); // 处理可能出现.5这样的数字
  // 处理非数字
  if (Number.isNaN(Number(money))) {
    money = '0';
  }
  money = scienceNumber(money);
  const re = new RegExp(`^(-?\\d+\\.)(\\d{${len}})\\d+$`);
  money = money.replace(re, '$1$2');
  if (addZero) {
    const pointIndex = money.indexOf('.');
    let zeroLength = pointIndex === -1 ? len : len - (money.length - pointIndex - 1);
    if (zeroLength === len && pointIndex === -1 && len) money += '.';
    while (zeroLength > 0) {
      money += '0';
      zeroLength--;
    }
  } else if (/^-0\.0+$/.test(money)) { // 处理-0.00的情况
    money = '0';
  }
  return money;
}

export function date (value, format = 'YYYY-MM-DD') {
  return dayjs(value).format(format);
}

export function profitClass (value) {
  return value < 0 ? 'mu-success-text-color' : 'mu-error-text-color';
}

export function scienceNumber (num) {
  if (!num) return '0';
  return new Big(num).toFixed();
}
