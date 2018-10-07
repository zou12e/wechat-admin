export default {
  dataTable: {
    loadURL: '/user/wallet/selectPage',
    params(model) {
      model.userId = this.$route.query.id;
      return model;
    },
    columns: [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: '币种名称',
        prop: 'coinName'
      },
      {
        label: '提币地址',
        prop: 'addr'
      },
      {
        label: '创建时间',
        prop: 'created'
      }
    ]
  }
};
