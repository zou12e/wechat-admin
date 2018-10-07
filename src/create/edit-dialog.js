import createDialogs from './dialogs';

export default function (options) {
  options = options.editDialog;
  if (!options) return;
  const dialog = createDialogs({
    dialogs: [{
      ...options,
      key: 'edit',
      action: {
        url: options.saveURL,
        method: options.saveMethod,
        params: options.saveParams,
        success: options.saveSuccess || '更新成功'
      }
    }]
  });

  return {
    ...dialog,
    methods: {
      ...dialog.methods,
      openEditDialog (model) {
        this.openDialog('edit', model);
      },
      closeEditDialog (model) {
        this.closeDialog('edit');
      }
    }
  };
};
