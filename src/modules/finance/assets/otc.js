import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '全部',
  type: 'success',
  value: ''
}, {
  label: '禁用',
  type: 'danger',
  value: 2
}, {
  label: '启用',
  type: 'success',
  value: 1
}];
export default {
  remote: [
    {
      url: '/v1/manage/trade/coin/select',
      key: 'coinAll',
      default: []
    }
  ],
  search: [
    {
      label: '会员ID',
      prop: 'inviteCode',
      options: {
        placeholder: '会员ID',
        clearable: true
      }
    },
    {
      label: '用户名',
      prop: 'username',
      options: {
        placeholder: '用户名',
        clearable: true
      }
    },
    {
      label: '手机号码',
      prop: 'mobile',
      options: {
        placeholder: '手机号码',
        clearable: true
      }
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '币种',
      prop: 'coinId',
      type: 'select',
      remote: {
        key: 'coinAll',
        labelField: 'name',
        valueField: 'id'
      },
      options: {
        clearable: true
      }
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      options: {
        options: statusDict,
        clearable: true
      }
    },
    {
      label: '账户余额',
      prop: 'startAmount,endAmount',
      render(h, item, model) {
        return [
          <el-input
            style="width: 150px"
            value={model.startAmount}
            on-input={value =>
              (model.startAmount = value ? Number(value) : '')
            }
            placeholder="最小金额"
            clearable
          />,
          <span style="margin-left: 10px; margin-right: 10px;">-</span>,
          <el-input
            style="width: 150px"
            value={model.endAmount}
            onInput={value => (model.endAmount = value ? Number(value) : '')}
            placeholder="最大金额"
            clearable
          />
        ];
      }
    },
    {
      label: '时间',
      type: 'date-range',
      prop: 'createStartTime,createEndTime',
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
          authId: 'finance-assets-otc-search'
        }
        // {
        //   label: '导出',
        //   icon: 'el-icon-edit',
        //   type: 'primary',
        //   action: 'exportExcel'
        // }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcAccount/sys/query',
    // exportURL: '/account/exportList',
    // exportFileName: '账户资产',
    columns: [
      {
        label: 'ID',
        prop: 'id',
        minWidth: 180
      },
      {
        label: '会员ID',
        prop: 'inviteCode',
        minWidth: 180
      },
      {
        label: '用户名',
        prop: 'username',
        minWidth: 120,
        className: 'wrap-normal'
      },
      {
        label: '真实姓名',
        prop: 'realName',
        minWidth: 120
      },
      {
        label: '币种名称',
        prop: 'coinName',
        minWidth: 120
      },
      {
        label: '手机号码',
        prop: 'mobile',
        minWidth: 150
      },
      {
        label: '账户余额',
        prop: 'balanceAmount',
        minWidth: 200
      },
      {
        label: '冻结余额',
        prop: 'freezeAmount',
        minWidth: 200
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 100,
        dict: statusDict
      },
      {
        label: '操作',
        fixed: 'right',
        minWidth: 200,
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                {
                  label: '充值',
                  type: 'primary',
                  size: 'small',
                  action(model) {
                    this.openDialog('recharge', {
                      coinId: model.coinId,
                      userId: model.userId,
                      id: model.id
                    });
                  },
                  authId: 'finance-assets-otc-recharge'
                },
                model.status === 1
                  ? {
                    label: '冻结',
                    size: 'small',
                    type: 'danger',
                    action(model) {
                      this.handleFreeze(model);
                    },
                    authId: 'finance-assets-otc-status'
                  } : {
                    label: '解冻',
                    size: 'small',
                    action(model) {
                      this.handleFreeze(model);
                    },
                    authId: 'finance-assets-otc-status'
                  }
              ]
            },
            model
          );
        },
        width: 180
      }
    ]
  },
  dialogs: [
    {
      key: 'recharge',
      title: '充值',
      action: {
        url: '/v1/manage/otc/otcAccount/updateBalanceAmount',
        successTip: '充值成功',
        params(form) {
          return {
            amount: form.amount, // 金额
            id: form.id, // 账户id
            remark: form.remark // 备注
          };
        }
      },
      items: [
        {
          label: '充值金额',
          prop: 'amount',
          rules: [
            { required: true, message: '充值金额不能为空', trigger: 'blur' }
          ]
        },
        {
          label: '备注',
          prop: 'remark'
        }
      ]
    }
  ],
  actions: {
    handleFreeze(row) {
      let status;
      if (row.status === 1) {
        status = 2;
      } else {
        status = 1;
      }
      this.$http
        .post('/v1/manage/otc/otcAccount/updateStatusById', {
          id: row.id,
          status: status
        })
        .then(res => {
          this.$notify({
            type: 'success',
            title: '提示',
            message: '操作成功！'
          });
          this.loadDataTable(this.table.page);
        });
    }
  }
};
