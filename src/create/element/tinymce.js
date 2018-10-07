export default function (h, item, model) {
  const text = model[item.prop];
  const options = item.options || {};
  const listeners = item.listeners;
  return h('tinymce', {
    props: {
      ...options,
      value: text
    },
    on: {
      input: (value) => {
        model[item.prop] = value;
        if (listeners && listeners.input) listeners.input.call(this, value);
      }
    }
  });
}
