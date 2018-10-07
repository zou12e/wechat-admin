import dayjs from 'dayjs';
const statusDict = [ {
  label: '待入账',
  type: 'warning',
  value: 5
}, {
  label: '到账成功',
  type: 'success',
  value: 6
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
      prop: 'userName',
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
    // {
    //   label: '状态',
    //   prop: 'status',
    //   type: 'select',
    //   options: {
    //     options: statusDict,
    //     clearable: true
    //   }
    // },
    {
      label: '充值金额',
      prop: 'startBalance,endBalance',
      render(h, item, model) {
        return [
          <el-input
            style="width: 150px"
            value={model.startBalance}
            on-input={(value) => (model.startBalance = value ? Number(value) : '')}
            placeholder="最小金额"
            clearable
          />,
          <span style="margin-left: 10px; margin-right: 10px;">-</span>,
          <el-input
            style="width: 150px"
            value={model.endBalance}
            onInput={(value) => (model.endBalance = value ? Number(value) : '')}
            placeholder="最大金额"
            clearable
          />
        ];
      }
    },
    {
      label: '时间',
      type: 'date-range',
      prop: 'startTime,endTime',
      default: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      options: {
        valueFormat: 'yyyy-MM-dd',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        clearable: true
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
          authId: 'finance-funds-recharge-record-search'
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
    loadURL: '/v1/manage/assets/record/list?type=3',
    exportURL: '/coin_recharge/exportCoinRecharge',
    exportFileName: '充币记录',
    columns: [
      {
        label: '订单ID',
        prop: 'id',
        minWidth: 200
      },
      {
        label: '会员ID',
        prop: 'inviteCode',
        minWidth: 180
      },
      {
        label: '用户名',
        prop: 'username',
        minWidth: 120
      },
      {
        label: '手机号码',
        prop: 'mobile',
        minWidth: 150
      },
      {
        label: '币种名称',
        prop: 'coinName',
        minWidth: 100
      },
      {
        label: '充值数量',
        prop: 'balance',
        minWidth: 200
      },
      {
        label: '收款地址',
        prop: 'depositAddress',
        minWidth: 250,
        'class-name': 'wrap-normal'
      },
      {
        label: '交易ID',
        prop: 'txId',
        minWidth: 250,
        'class-name': 'wrap-normal'
      },
      {
        label: '充值时间',
        prop: 'created',
        minWidth: 180
      },
      {
        label: '完成时间',
        prop: 'updateTimeStr',
        width: 180
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 100,
        dict: statusDict
      }
    ]
  },
  actions: {
    handlderInput(prop, value) {
      this.searchForm[prop] = value;
    }
  }
};
