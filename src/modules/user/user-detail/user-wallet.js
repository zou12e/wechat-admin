export default {
  dataTable: {
    loadURL: '/user/address/selectPage',
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
        label: '钱包地址',
        prop: 'address'
      },
      {
        label: '创建时间',
        prop: 'created'
      }
    ]
  }
};
