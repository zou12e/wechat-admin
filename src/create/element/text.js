import * as formatters from '../formatter';

export default function (h, item, model) {
  let text = model[item.prop];
  if (item.formatter) {
    const args = item.formatter.args || [];
    const func = typeof item.formatter === 'function'
      ? item.formatter
      : typeof item.formatter === 'string'
        ? formatters[item.formatter]
        : formatters[item.formatter.name];
    text = func.apply(this, [text, model, ...args]);
  }
  return h('span', {
    staticClass: item.class
  }, text);
};
