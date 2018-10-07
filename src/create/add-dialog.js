import createDialogs from './dialogs';

export default function (options) {
  options = options.addDialog;
  if (!options) return;
  const dialog = createDialogs({
    dialogs: [{
      ...options,
      key: 'add',
      action: {
        url: options.saveURL,
        method: options.saveMethod,
        params: options.saveParams,
        success: options.saveSuccess || '新建成功'
      }
    }]
  });

  return {
    ...dialog,
    methods: {
      ...dialog.methods,
      openAddDialog(model) {
        this.openDialog('add');
      },
      closeAddDialog(model) {
        this.closeDialog('add');
      }
    }
  };
}
