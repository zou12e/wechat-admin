import createActionList from './element/action-list';
import createTable from './element/table';
import createForm from './form';

export default function (options) {
  const dialogs = options.dialogs;
  if (!dialogs) return;
  const dialog = {};
  dialogs.forEach(options => {
    if (!options) return;
    const items = options.items || [];
    const model = {
      ...options.form
    };
    if (!options.labelWidth) {
      options.labelWidth = '150px';
    }
    options.ref = `${options.key}Form`;
    items.forEach(item => {
      if (!item.prop) return;
      item.prop.split(',').forEach(key => {
        model[key] = item.default || '';
      });
    });
    options.defaultModel = model;
    dialog[options.key] = {
      open: false,
      actioning: false,
      form: {
        ...model
      },
      options: options,
      columns: options.dataTable ? options.dataTable.columns : [],
      selectedItems: [],
      searchParams: {},
      unValidCall: options.unValidCall,
      table: {
        list: [],
        page: 1,
        total: 0,
        loading: false
      }
    };
  });

  return {
    data: {
      dialog
    },
    methods: {
      openDialog (key, model) {
        const item = this.dialog[key];
        if (!item) return;
        item.open = true;
        if (key === 'add' && item.options.onOpen) {
          item.options.onOpen.call(this, item);
        }
        if (!model) return;
        const { options = {} } = this.dialog[key];

        if (options.detail && options.detail.url) {
          const { url, params = a => a, method = 'get' } = options.detail;
          this.$http[method](url, params.call(this, model)).then(data => {
            item.form = data;
            if (options.onOpen) options.onOpen.call(this, data);
          });
        } else {
          item.form = {
            ...options.defaultModel,
            ...model
          };
          delete item.form.$index;
          if (options.onOpen) options.onOpen.call(this, item.form);
        }
        item.searchParams = {
          ...model
        };
        this.loadDialogDataTable(key);
      },
      closeDialog (key) {
        const dialog = this.dialog[key];
        if (!dialog) return;
        dialog.open = false;
        this.$refs[dialog.options.ref] && this.$refs[dialog.options.ref].resetFields();
      },
      loadDialogDataTable (key, page) {
        const dialog = this.dialog[key];
        if (!dialog || !dialog.options.dataTable) return;
        const { loadURL, pageSize, params = a => a } = dialog.options.dataTable;
        if (!loadURL) return;
        const isPage = dialog.options.dataTable.page !== false;
        if (dialog.table.loading || !loadURL) return;
        if (typeof page !== 'number') page = 1;
        dialog.table.page = page || 1;
        const paramsTemp = {
          ...dialog.searchParams
        };

        if (isPage) {
          paramsTemp.current = this.table.page;
          paramsTemp.size = pageSize || 15;
        }

        dialog.table.loading = true;
        return this.$http.get(loadURL, params.call(this, paramsTemp))
          .then((result) => {
            if (Array.isArray(result)) {
              dialog.table.list = result;
            } else {
              dialog.table.list = result.records;
              dialog.table.total = result.total;
            }
            dialog.table.loading = false;
          })
          .catch(() => {
            dialog.table.loading = false;
          });
      }
    },
    render (h) {
      return Object.keys(this.dialog).map((key) => {
        const { form, options, actioning, open } = this.dialog[key];
        const footer = h('div', {
          staticClass: 'dialog-footer',
          slot: 'footer'
        }, options.actionList ? createActionList.call(this, h, {
          actionList: options.actionList
        }, form) : [
          h('el-button', {
            on: {
              click: () => this.closeDialog(key)
            }
          }, options.cancelLabel || '取消'),
          h('el-button', {
            props: {
              type: 'primary',
              loading: actioning
            },
            on: {
              click: () => {
                if (!options.action) return;
                return this.$refs[options.ref].validate()
                  .then((isValid) => {
                    if (!isValid || this.dialog[key].actioning) {
                      return;
                    };
                    const { url, params = (a) => { return a; }, method = 'post' } = options.action;
                    if (!url) return;
                    this.dialog[key].actioning = true;
                    return this.$http[method](url, params.call(this, form));
                  }).then(() => {
                    this.dialog[key].actioning = false;
                    this.closeDialog(key);
                    if (this.loadDataTable) this.loadDataTable(this.table.page);
                    this.$message.success(options.action.success || '操作成功');
                  }).catch(() => {
                    if (this.dialog[key].unValidCall) {
                      this.dialog[key].unValidCall();
                    }
                    this.dialog[key].actioning = false;
                  });
              }
            }
          }, options.sureLabel || '确定')
        ]);
        return h('el-dialog', {
          props: {
            visible: open,
            title: options.title,
            width: options.width,
            top: options.top,
            customClass: 'details-dialog'
          },
          on: {
            'update:visible': (val) => {
              this.dialog[key].open = val;
              this.$refs[options.ref] && this.$refs[options.ref].resetFields();
            }
          }
        }, [
          createForm.call(this, h, options, form),
          createTable.call(this, h, options.dataTable ? {
            ...options.dataTable,
            listeners: {
              ...options.dataTable.listeners,
              ref: `${key}DataTable`,
              pageChange: (page) => this.loadDialogDataTable(key, page)
            }
          } : null, this.dialog[key]),
          footer
        ]);
      });
    }
  };
}
