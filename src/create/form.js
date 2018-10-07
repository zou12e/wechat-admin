import createElement from './element';
export default function createForm (h, options, model) {
  if (!options.items || options.items.length === 0) return;
  return h('el-form', {
    staticClass: options.class,
    props: {
      inline: options.inline,
      labelWidth: options.labelWidth,
      labelPosition: options.labelPosition || 'right',
      size: options.size,
      disabled: options.disabled,
      model: model
    },
    ref: options.ref
  }, options.items.map((item) => {
    return h('el-form-item', {
      staticClass: item.class,
      props: {
        label: item.label,
        labelWidth: item.labelWidth,
        required: item.required,
        rules: item.rules,
        prop: item.prop
      }
    }, [createElement.call(this, h, item, model)]);
  }));
}
