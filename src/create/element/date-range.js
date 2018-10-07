import { createListeners } from './utils';
export default function (h, item, model) {
  const options = item.options || {};
  const defaultOptions = {
    shortcuts: [{
      text: '最近一周',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]
  };
  const values = item.prop.split(',').map(prop => model[prop]);
  return h('el-date-picker', {
    props: {
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
      ...options,
      type: options.type || 'daterange',
      pickerOptions: options.pickerOptions || defaultOptions,
      defaultValue: new Date().getTime(),
      editable: false,
      value: !values[0] ? [] : values
    },
    on: {
      ...createListeners(item.listeners, this),
      input(value) {
        item.prop.split(',').forEach((prop, index) => {
          model[prop] = value ? value[index] : '';
        });
        if (item.listeners && item.listeners.input) item.listeners.input.call(this, value);
      }
    }
  });
};
