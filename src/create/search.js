import createForm from './form';
export default function (options) {
  options = options.search;
  if (!options) return {};
  const items = Array.isArray(options) ? options : options.items;
  const model = {};
  items.forEach((item) => {
    if (!item.prop) return;
    item.prop.split(',').forEach((key, index, arr) => {
      model[key] = arr.length > 1 && Array.isArray(item.default) ? item.default[index] : item.default;
    });
  });
  let op = {
    class: 'search-form',
    inline: true,
    labelWidth: '100px'
  };

  if (Array.isArray(options)) {
    op.items = options;
  } else {
    op = {
      ...op,
      ...options
    };
  }

  return {
    data: {
      searchForm: {},
      searchOptions: op
    },
    created() {
      this.searchForm = {...model};
    },
    render (h) {
      return createForm.call(this, h, this.searchOptions, this.searchForm);
    }
  };
};
