import { createListeners } from './utils';
export default function (h, item, model) {
  const options = item.options || {};
  return h('el-input', {
    attrs: {
      type: options.type || 'text'
    },
    props: {
      clearable: true,
      ...options,
      value: model[item.prop]
    },
    on: {
      ...createListeners(item.listeners, this),
      input(value) {
        model[item.prop] = value;
        if (item.listeners && item.listeners.input) item.listeners.input.call(this, value);
      }
    }
  }, [
    options.prepend ? h('span', { slot: 'prepend' }, options.prepend) : null,
    options.append ? h('span', { slot: 'append' }, [options.append.call(this, h, item, model)]) : null,
    ...(options.children || [])
  ]);
};
