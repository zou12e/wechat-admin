import dayjs from 'dayjs';
const statusDict = [{
  label: '审核中',
  type: 'danger',
  value: 1
}, {
  label: '撤销',
  type: 'info',
  value: 2
}, {
  label: '打币中',
  type: 'success',
  value: 3
}, {
  label: '拒绝',
  type: 'info',
  value: 4
}, {
  label: '打币失败',
  type: 'warning',
  value: 5
}, {
  label: '提币成功',
  type: 'primary',
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
      label: '提现金额',
      prop: 'startBalance,endBalance',
      render(h, item, model) {
        return [
          <el-input
            style="width: 150px"
            value={model.startBalance}
            on-input={value =>
              (model.startBalance = value ? Number(value) : '')
            }
            placeholder="最小金额"
            clearable
          />,
          <span style="margin-left: 10px; margin-right: 10px;">-</span>,
          <el-input
            style="width: 150px"
            value={model.endBalance}
            onInput={value => (model.endBalance = value ? Number(value) : '')}
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
      default: [
        dayjs()
          .subtract(7, 'day')
          .format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ],
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
          authId: 'finance-funds-withdraw-record-search'
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
    loadURL: '/v1/manage/assets/record/list?type=4',
    exportURL: '/coin_withdraw/exportList',
    exportFileName: '提币记录',
    columns: [
      {
        label: '订单ID',
        prop: 'id',
        width: 200
      },
      {
        label: '用户名',
        prop: 'userName',
        width: 120
      },
      {
        label: '手机号码',
        prop: 'mobile',
        width: 150
      },
      {
        label: '币种名称',
        prop: 'coinName',
        width: 100
      },
      {
        label: '提现量',
        prop: 'balance',
        width: 150
      },
      {
        label: '实际提现',
        prop: 'realBalance',
        width: 150
      },
      {
        label: '手续费',
        prop: 'fee',
        width: 100
      },
      {
        label: '钱包地址',
        prop: 'receiverAddress',
        width: 250,
        'class-name': 'wrap-normal'
      },
      {
        label: '交易ID',
        prop: 'txId',
        width: 250,
        'class-name': 'wrap-normal'
      },
      {
        label: '申请时间',
        prop: 'createTimeStr',
        width: 180
      },
      {
        label: '审核时间',
        prop: 'updateTimeStr',
        width: 180
      },
      {
        label: '审核备注',
        prop: 'adminComment'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 100,
        dict: [
          {
            label: '未知',
            type: 'danger',
            value: 0
          },
          ...statusDict
        ]
      }
    ]
  },
  actions: {
    handlderInput(prop, value) {
      this.searchForm[prop] = value;
    }
  }
};
