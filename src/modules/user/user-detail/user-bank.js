import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '禁用',
  type: 'danger',
  value: 0
}, {
  label: '启用',
  type: 'success',
  value: 1
}];

export default {
  props: ['userId'],
  dataTable: {
    loadURL: '/user/bank/getList',
    method: 'get',
    params(model) {
      model.usrId = this.$route.query.id;
      return model;
    },
    status: {
      url: '/user/bank/updateStatus',
      method: 'get',
      params(id, status) {
        return {
          id,
          status
        };
      }
    },
    columns: [
      {
        label: 'ID',
        prop: 'id'
      },
      {
        label: '银行卡名称',
        prop: 'remark'
      },
      {
        label: '开户行',
        prop: 'bank'
      },
      {
        label: '开户人',
        prop: 'realName'
      },
      {
        label: '开户账号',
        prop: 'bankCard'
      },
      {
        label: '创建时间',
        prop: 'created'
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
                  action: 'openEditDialog'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus'
                  }
                  : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus'
                  }
              ]
            },
            model
          );
        },
        width: 200
      }
    ]
  },
  editDialog: {
    title: '修改银行卡',
    saveURL: '/user/bank/update',
    saveParams (params) {
      delete params.bankCity;
      delete params.created;
      delete params.lastUpdateTime;
      delete params.bankCity;
      delete params.mobile;
      return params;
    },
    items: [{
      label: '银行卡名称',
      prop: 'remark',
      rules: [{required: true, message: '请输入银行卡名称', trigger: 'blur'}]
    }, {
      label: '开户行',
      prop: 'bank',
      rules: [{required: true, message: '请输入开户行', trigger: 'blur'}]
    }, {
      label: '开户地址',
      prop: 'bankAddr',
      rules: [{required: true, message: '请输入开户地址', trigger: 'blur'}]
    }, {
      label: '开户人',
      prop: 'realName',
      rules: [{required: true, message: '请输入开户人', trigger: 'blur'}]
    }, {
      label: '开户账号',
      prop: 'bankCard',
      rules: [{required: true, message: '请输入开户账号', trigger: 'blur'}]
    }, {
      label: '开户省',
      prop: 'bankProv',
      rules: [{required: true, message: '请输入开户省', trigger: 'blur'}]
    }]
  }
};
