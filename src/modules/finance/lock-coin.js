import createButton from '../../create/element/button';

const rechargeDict = [{
  label: '新增锁仓',
  type: 'success',
  value: '新增锁仓'
}, {
  label: '撤销锁仓',
  type: 'danger',
  value: '撤销锁仓'
}];
const coinTypeDict = [{
  label: 'WT',
  value: 'WT'
}];
const coinNameDict = [{
  label: 'WT-WBG',
  value: 'WT-WBG'
}];
const volumeDict = [{
  label: '250',
  value: '250'
},{
  label: '500',
  value: '500'
}, {
  label: '2500',
  value: '2500'
}, {
  label: '4000',
  value: '4000'
}, {
  label: '5000',
  value: '5000'
}, {
  label: '20000',
  value: '20000'
}, {
  label: '25000',
  value: '25000'
}, {
  label: '40000',
  value: '40000'
}, {
  label: '50000',
  value: '50000'
}];

export default {
  remote: [
    {
      url: '/v1/manage/user/wt/queryWtProductList',
      key: 'WtProductList',
      default: []
    },
    {
      url: '/v1/manage/user/wt/sys/queryDetail/sum',
      key: 'summaryVolume',
      lazy: true,
      default: []
    }
  ],
  search: [
    {
      label: '用户名',
      prop: 'username'
    }, {
      label: '币种',
      type: 'select',
      options: {
        options: coinTypeDict,
        clearable: true
      },
      prop: 'coinType'
    }, {
      label: '锁仓类型',
      type: 'select',
      remote: {
        key: 'WtProductList',
        labelField: 'name',
        valueField: 'id'
      },
      options: {
        clearable: true
      },
      prop: 'wtProductId'
    }, {
      label: '创建时间',
      type: 'date-range',
      prop: 'startCreateDate,endCreateDate',
      options: {
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'finance-lock-coin-search'
        },
        {
          label: '充值',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'finance-lock-coin-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/user/wt/sys/queryDetail?detailType=1',
    loadData(params) {
      this.loadRemoteData('summaryVolume', {
        detailType: 1,
        ...params
      });
    },
    renderFooter (data) {
      const volume = this.remote.summaryVolume;
      let pageTotal = 0;
      data.map((item) => {
        pageTotal += item.volume;
      });
      return <div style='margin-top: 10px;position: absolute;left: 0;width: 70%;bottom: 20px;'><span style='display: inline-block;margin-right:20px;'>汇总发放量：{volume}</span><span>当前页面发放量：{pageTotal}</span></div>;
    },
    columns: [
      {
        label: '用户名',
        prop: 'userName',
        minWidth: 180
      }, {
        label: '姓名',
        minWidth: 160,
        prop: 'realName'
      }, {
        label: '会员ID',
        minWidth: 200,
        prop: 'inviteCode'
      }, {
        label: '币种',
        prop: 'coinType',
        minWidth: 150
      }, {
        label: '锁仓类型',
        minWidth: 150,
        prop: 'wtProductName'
      }, {
        label: '变动类型',
        prop: 'changeTypeName',
        type: 'tag',
        dict: rechargeDict,
        minWidth: 140
      }, {
        label: '数量',
        minWidth: 140,
        prop: 'volume'
      }, {
        label: '操作人',
        minWidth: 140,
        prop: 'createBy'
      }, {
        label: '创建时间',
        prop: 'createTime',
        minWidth: 200
      }, {
        label: '备注',
        minWidth: 150,
        prop: 'remark'
      }
    ]
  },
  addDialog: {
    title: '预发行TOKEN发放',
    saveURL: '/v1/manage/user/wt/recharge',
    saveSuccess: '发放成功',
    saveParams(model) {
      const { id: userId } = model.user;
      const type = model.volume > 0 ? 1 : 2;

      const {coinName, coinType, volume, remark} = model;
      const params = {coinName, coinType, volume, remark, type, userId};
      return params;
    },
    items: [
      {
        label: '发放用户',
        prop: 'username',
        options: {
          append(h, item, model) {
            return createButton(h, {
              options: {
                label: '查询',
                action: (model) => {
                  let {username} = model;
                  username = username.trim();
                  if (username.length === 0) return;
                  this.$http.get('/v1/manage/user/loadUserByUsername', {username}).then(res => {
                    if (res.id) {
                      model.user = res;
                    } else {
                      model.user = 'error';
                    }
                    this.$refs['addForm'].validateField('user');
                  });
                },
                type: 'primary'
              }
            }, model);
          }
        }
      },
      {
        label: ' ',
        prop: 'user',
        render(h, item, model) {
          const {user} = model;
          if (!user || !user.id) return '';
          return h('div', {}, [
            h('span', {attrs: {style: 'margin-right: 10px;'}}, `用户名：${user.username}`),
            h('span', {attrs: {style: 'margin-right: 10px;'}}, `姓名：${user.realName}`),
            h('span', {}, `手机号：${user.mobile}`)
          ]);
        },
        rules: [{
          validator: (rule, value, callback) => {
            if (value === 'error') {
              callback(new Error('无此用户'));
            } else if (!value || !value.id) {
              callback(new Error('请查询用户'));
            } else {
              callback();
            }
          }
        }]
      },
      {
        label: '币种',
        prop: 'coinType',
        type: 'select',
        options: {
          options: coinTypeDict
        },
        rules: [{ required: true, message: '请选择币种', trigger: 'change' }]
      },
      {
        label: '产品名称',
        prop: 'coinName',
        type: 'select',
        options: {
          options: coinNameDict,
          clearable: true
        },
        rules: [{ required: true, message: '请选择产品名称', trigger: 'change' }]
      },
      {
        label: '发放数量',
        prop: 'volume',
        type: 'select',
        options: {
          options: volumeDict,
          clearable: true
        },
        rules: [{ required: true, message: '请输入发放数量', trigger: 'change' }]
      }, {
        label: '备注',
        prop: 'remark'
      }
    ]
  }
};
