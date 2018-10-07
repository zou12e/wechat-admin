import './create.less';
import { merge } from '@common/utils';
import search from './search';
import dataTable from './data-table';
import editDialog from './edit-dialog';
import addDialog from './add-dialog';
import actions from './actions';
import remote from './remote';
import dialogs from './dialogs';

const pluginMap = {
  list: [search, dataTable, dialogs, editDialog, addDialog, actions, remote]
};

function callHook (name, plugins, context) {
  plugins.forEach(plugin => {
    if (plugin[name]) plugin[name].apply(context, Array.prototype.slice.call(arguments, 3));
  });
}

export default function createPage (options, type = 'list') {
  const plugins = pluginMap[type].map((create) => create(options)).filter(plugin => !!plugin);
  const result = {};
  let actions = {};

  plugins.forEach(({ data, methods }) => {
    merge(result, data);
    actions = {
      ...actions,
      ...methods
    };
  });
  return {
    data () {
      return result;
    },
    created () {
      callHook('created', plugins, this);
    },
    mounted () {
      callHook('mounted', plugins, this);
    },
    beforeDestroy () {
      callHook('beforeDestroy', plugins, this);
    },
    methods: actions,
    render (h) {
      return h('div', {}, plugins.map((plugin) => {
        if (!plugin.render) return;
        return plugin.render.call(this, h);
      }));
    }
  };
}
