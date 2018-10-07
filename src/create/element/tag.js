export default function (h, item, model) {
  const value = model[item.prop];
  let option = {
    label: value
  };
  if (item.dict) {
    item.dict.forEach(op => {
      if (op.value === value) {
        option.type = op.type;
        option.label = op.label;
      }
    });
  }
  return h('el-tag', {
    props: {
      type: option.type
    }
  }, option.label);
}
