import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '启用',
  type: 'success',
  value: 2
}, {
  label: '禁用',
  type: 'danger',
  value: 1
}];
export default {
  remote: [{
    url: '/v1/manage/trade/coin/select',
    key: 'coinAll',
    default: []
  }],
  search: [
    // {
    //   label: '名称',
    //   prop: 'name',
    //   options: {
    //     placeholder: '名称',
    //     clearable: true
    //   }
    // },
    // {
    //   label: '状态',
    //   type: 'select',
    //   prop: 'status',
    //   options: {
    //     options: statusDict,
    //     clearable: true
    //   }
    // },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '刷新',
          icon: 'el-icon-refresh',
          action: 'loadDataTable',
          authId: 'trade-market-config-search'
        },
        {
          label: '新增',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'trade-market-config-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/trade/area/list',
    status: {
      // change status 需要配置
      url: '/v1/manage/trade/area/edit',
      method: 'post',
      params(id, status) {
        return {
          id,
          status: status === 0 ? 2 : status
        };
      }
    },
    columns: [
      {
        label: 'ID',
        prop: 'id',
        className: 'wrap-normal'
      },
      {
        label: '名称',
        prop: 'name'
      },
      {
        label: '排序',
        prop: 'sort'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 100,
        dict: statusDict
      },
      {
        label: '操作',
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                {
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'trade-market-config-edit'
                }
                // model.status === 2
                //   ? {
                //     label: '禁用',
                //     size: 'small',
                //     type: 'danger',
                //     action: 'changeStatus'
                //   }
                //   : {
                //     label: '启用',
                //     size: 'small',
                //     action: 'changeStatus'
                //   }
              ]
            },
            model
          );
        },
        width: 180
      }
    ]
  },
  addDialog: {
    title: '新建区域配置',
    saveURL: '/v1/manage/trade/area/add',
    width: '500px',
    items: [{
      label: '名称',
      prop: 'name',
      rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
    }, {
      label: '币种',
      prop: 'coinId',
      type: 'select',
      remote: {
        key: 'coinAll',
        labelField: 'name',
        valueField: 'id'
      },
      rules: [{ required: true, message: '请选择币种', trigger: 'blur' }]
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{ required: true, message: '请选择排序', trigger: 'blur' }],
      options: {
        min: 1
      }
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      default: 2,
      options: {
        'active-value': 2,
        'inactive-value': 1
      }
    }]
  },
  editDialog: {
    title: '编辑区域配置',
    saveURL: '/v1/manage/trade/area/edit',
    saveParams (form) {
      return {
        id: form.id,
        name: form.name,
        coinId: form.coinId,
        sort: form.sort,
        status: form.status
      };
    },
    width: '500px',
    items: [{
      label: '名称',
      prop: 'name',
      rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
    }, {
      label: '币种',
      prop: 'coinId',
      type: 'select',
      remote: {
        key: 'coinAll',
        labelField: 'name',
        valueField: 'id'
      },
      rules: [{ required: true, message: '请选择币种', trigger: 'blur' }]
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{ required: true, message: '请选择排序', trigger: 'blur' }],
      options: {
        min: 1
      }
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      options: {
        'active-value': 2,
        'inactive-value': 1
      }
    }]
  }
};
