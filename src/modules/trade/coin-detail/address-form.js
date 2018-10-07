import createActionList from '@common/create/element/action-list';
import TradeModel from '@common/models/trade';
const statusDict = [{
  label: '归账',
  value: 1
}, {
  label: '打款',
  value: 2
}, {
  label: '手续费',
  value: 3
}];
export default {
  remote: [{
    url: '/coin/all?status=1',
    key: 'coinAll',
    default: []
  }],
  search: [
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '新增',
          icon: 'el-icon-edit',
          type: 'primary',
          action(model) {
            if (TradeModel.state.coinId) {
              this.openDialog('add', {
                coinId: TradeModel.state.coinId
              });
            } else {
              console.log(TradeModel);
              this.$message.error('请先新增币种信息');
              TradeModel.changeTab('base');
            }
          }
        },
        {
          label: '返回',
          icon: 'el-icon-search',
          type: 'danger',
          action() {
            this.$router.push('/trade/coin-config');
          }
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/admin/address/getByCoinId',
    params(model) {
      model.coinId = TradeModel.state.coinId;
      return model;
    },
    columns: [
      {
        label: '钱包地址',
        prop: 'address',
        width: 350
      },
      {
        label: '密钥',
        prop: 'keystore',
        width: 950,
        'class-name': 'wrap-normal'
      },
      {
        label: '状态',
        prop: 'status',
        width: 100,
        formatter(value) {
          const res = statusDict.find(item => item.value === value);
          return res ? res.label : value;
        }
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
                  action(model) {
                    this.openDialog('edit', {
                      coinId: TradeModel.state.coinId,
                      ...model
                    });
                  }
                }
              ]
            },
            model
          );
        },
        width: 100
      }
    ]
  },
  addDialog: {
    title: '新建钱包归集地址',
    saveURL: '/admin/address',
    width: '500px',
    items: [{
      label: '钱包地址',
      prop: 'address',
      rules: [{required: true, message: '请输入钱包地址', trigger: 'blur'}]
    }, {
      label: '密钥',
      prop: 'keystore'
    }, {
      label: '密码',
      prop: 'pwd',
      rules: [{required: true, message: '请输入密码', trigger: 'blur'}]
    }, {
      label: '地址类型',
      prop: 'status',
      type: 'select',
      rules: [{required: true, message: '请选择地址类型', trigger: 'blur'}],
      options: {
        options: statusDict
      }
    }]
  },
  editDialog: {
    title: '编辑钱包归集地址',
    saveURL: '/admin/address',
    saveMethod: 'put',
    width: '500px',
    items: [{
      label: '钱包地址',
      prop: 'address',
      rules: [{required: true, message: '请输入钱包地址', trigger: 'blur'}]
    }, {
      label: '密钥',
      prop: 'keystore'
    }, {
      label: '密码',
      prop: 'pwd',
      rules: [{required: true, message: '请输入密码', trigger: 'blur'}]
    }, {
      label: '地址类型',
      prop: 'status',
      type: 'select',
      rules: [{required: true, message: '请选择地址类型', trigger: 'blur'}],
      options: {
        options: statusDict
      }
    }]
  }
};
