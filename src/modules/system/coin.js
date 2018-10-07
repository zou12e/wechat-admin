
export default {
  remote: [{
    url: '/v1/manage/common/coin/list',
    key: 'coinAll',
    default: []
  }],
  search: [
    {
      label: '币种名称',
      prop: 'name'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'system-coin-search'
        },
        {
          label: '新增',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-coin-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/coin/list',
    columns: [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: 'LOGO',
        prop: 'img',
        type: 'img',
        options: {
          width: '50px',
          height: '50px'
        }
      },
      {
        label: '币种名称',
        prop: 'name'
      },
      {
        label: '币种类型',
        prop: 'coinType'
      }
    ]
  },
  addDialog: {
    title: '新增币种',
    saveURL: '/v1/manage/common/admin/coin/add',
    saveParams(model) {
      return {
        ...model,
        ...this.params
      };
    },
    items: [{
      label: '币种',
      type: 'select',
      prop: 'id',
      remote: {
        key: 'coinAll',
        labelField: 'name',
        valueField: 'id'
      },
      listeners: {
        input(value, options) {
          const res = options.filter((res) => { if (res.id === value) { return res; } });
          this.params = {
            id: res[0].id || '',
            name: res[0].name || '',
            title: res[0].title || '',
            img: res[0].img || '',
            coinType: res[0].type || '',
            round: res[0].round || 0
          };
        }
      },
      rules: [{ required: true, message: '请选择币种', trigger: 'blur' }]
    }]
  }
};
