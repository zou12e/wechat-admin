import { createListeners } from './utils';
export default function (h, item, model) {
  const options = item.options || {};
  // const values = item.prop.split(',').map(prop => model[prop]);
  return h('el-time-picker', {
    props: {
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间',
      rangeSeparator: '至',
      placeholder: '选择时间范围',
      ...options,
      isRange: options.isRange || false,
      pickerOptions: options.pickerOptions,
      editable: false,
      value: item.prop ? model[item.prop] : []
    },
    on: {
      ...createListeners(item.listeners, this),
      input(value) {
        // item.prop.split(',').forEach((prop, index) => {
        //   model[prop] = value ? value[index] : '';
        // });
        model[item.prop] = value;
        if (item.listeners && item.listeners.input) item.listeners.input.call(this, value);
      }
    }
  });
};
