import createElement from '../../create/element';
import {checkUndefined} from '@common/utils';

const createTab = function(h, tab, model) {
  const {title, items} = tab;
  return h('el-tab-pane',
    {props: {label: title}},
    items.map((item) => {
      return h('el-form-item', {
        staticClass: item.class,
        style: {marginBottom: '22px'},
        props: {
          label: item.label,
          labelWidth: item.labelWidth,
          required: item.required,
          rules: item.rules,
          prop: item.prop
        }
      }, [createElement.call(this, h, item, model)]);
    })
  );
};
export function createTabs (h, item, tabs, model) {
  tabs = tabs.map(tab => createTab.call(this, h, tab, model));
  return h('el-tabs',
    {
      props: {
        type: 'border-card',
        activeName: item.activeTab
      },
      on: {
        'tab-click'(tab) {
          item.activeTab = tab.index;
        }
      }
    },
    [...tabs]
  );
};

export function valideTabs (tabs) {
  tabs.every((tab, index) => {
    if (!checkUndefined(this.form, tab.items.filter(t => t.required).map(t => t.prop))) {
      this.options.items[this.options.items.length - 1].activeTab = index.toString();
      return false;
    } else {
      return true;
    }
  });
};
