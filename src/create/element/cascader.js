import { createListeners } from './utils';
export default function(h, item, model) {
  return h('el-cascader', {
    props: {
      ...item.options,
      value: model[item.prop] || []
    },
    on: {
      ...createListeners(item.listeners, this),
      input(value) {
        model[item.prop] = value;
        if (item.listeners && item.listeners.input) item.listeners.input.call(this, value);
      }
    }
  });
}
