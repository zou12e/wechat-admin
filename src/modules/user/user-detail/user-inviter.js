export default {
  dataTable: {
    loadURL: '/v1/manage/user/invite/admin/list',
    params(model) {
      model.id = this.$route.query.id;
      return model;
    },
    columns: [
      {
        label: 'ID',
        prop: 'userId'
      },
      {
        label: '用户名',
        prop: 'inviteName'
      },
      {
        label: '真实姓名',
        prop: 'realName'
      },
      {
        label: '创建时间',
        prop: 'created'
      }
    ]
  }
};
