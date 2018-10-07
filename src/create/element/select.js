import { createListeners } from './utils';

export default function (h, item, model) {
  const options = (item.remote ? this.remote[item.remote.key].map((option) => {
    return {
      label: option[item.remote.labelField],
      value: option[item.remote.valueField],
      ...option
    };
  }) : item.options.options) || [];
  return h('el-select', {
    props: {
      clearable: true,
      ...item.options,
      value: model[item.prop]
    },
    on: {
      ...createListeners(item.listeners, this),
      input: (value) => {
        model[item.prop] = value;
        if (item.listeners && item.listeners.input) item.listeners.input.call(this, value, options);
      }
    }
  }, options.map((option) => {
    return h('el-option', {
      props: {
        label: option.label,
        value: option.value
      }
    });
  }));
};
