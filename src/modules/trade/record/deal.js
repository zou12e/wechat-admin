import { typeDict, robotType, tradeStatusDict } from './dicts';
import dayjs from 'dayjs';

export default {
  remote: [{
    url: '/v1/manage/trade/symbol/select',
    key: 'marketAll',
    default: []
  }],
  search: [
    {
      label: '交易市场',
      prop: 'symbolId',
      type: 'select',
      remote: {
        labelField: 'name',
        valueField: 'id',
        key: 'marketAll'
      },
      options: {
        clearable: true
      }
    },
    {
      label: '交易方式',
      prop: 'side',
      type: 'select',
      options: {
        clearable: true,
        options: typeDict
      }
    },
    {
      label: '数据类型',
      prop: 'robotType',
      type: 'select',
      options: {
        clearable: true,
        options: robotType
      }
    },
    {
      label: '订单ID',
      prop: 'orderId',
      options: {
        placeholder: '订单ID',
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
      label: '会员ID',
      prop: 'inviteCode',
      options: {
        placeholder: '会员ID',
        clearable: true
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
        'end-placeholder': '结束日期'
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
          authId: 'trade-record-deal-search'
        }
        // ,
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
    loadURL: '/v1/manage/trade/deal/list',
    // exportURL: '/coin_recharge/exportCoinRecharge',
    exportFileName: '币币交易成交',
    columns: [
      // {
      //   label: '交易ID',
      //   prop: 'id',
      //   width: 180
      // },
      {
        label: '交易市场',
        prop: 'symbolTitle',
        minWidth: 180
      },
      {
        label: '买方订单ID',
        prop: 'buyOrderId',
        minWidth: 180
      },
      {
        label: '买方会员ID',
        prop: 'buyInviteCode',
        minWidth: 150
      },
      {
        label: '卖方订单ID',
        prop: 'sellOrderId',
        minWidth: 180
      },
      {
        label: '卖方会员ID',
        prop: 'sellInviteCode',
        minWidth: 150
      },
      {
        label: '成交价',
        prop: 'price',
        minWidth: 180
      },
      {
        label: '成交量',
        prop: 'volume',
        minWidth: 180
      },
      {
        label: '成交额',
        prop: 'amount',
        minWidth: 180
      },
      // {
      //   label: '价格类型',
      //   prop: 'type',
      //   formatter: (value) => {
      //     const res = invovateDict.find(item => item.value === value);
      //     return res ? res.label : value;
      //   }
      // },
      {
        label: '买方手续费',
        prop: 'buyFee',
        minWidth: 120
      },

      {
        label: '卖方手续费',
        prop: 'sellFee',
        minWidth: 120
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 100,
        dict: tradeStatusDict
      }, {
        label: '成交时间',
        prop: 'createTimeStr',
        minWidth: 180
      }
    ]
  }
};
