import { typeDict, robotDict, invovateDict, orderStatusDict } from './dicts';
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
      label: '展示机器人数据',
      prop: 'isRobot',
      type: 'select',
      options: {
        clearable: true,
        options: robotDict
      },
      labelWidth: '120px'
    },
    {
      label: '交易状态',
      prop: 'status',
      type: 'select',
      options: {
        clearable: true,
        options: orderStatusDict
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
          authId: 'trade-record-entrust-search'
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
    loadURL: '/v1/manage/trade/order/list',
    // exportURL: '/entrust/order/exportList',
    // exportFileName: '币币交易委托',
    columns: [
      {
        label: '订单ID',
        prop: 'id',
        minWidth: 200
      },
      {
        label: '会员ID',
        prop: 'inviteCode',
        minWidth: 150
      },
      {
        label: '用户名',
        prop: 'userName',
        minWidth: 120
      },
      {
        label: '手机号码',
        prop: 'mobile',
        minWidth: 150
      },
      {
        label: '交易市场',
        prop: 'symbolTitle',
        minWidth: 180
      },
      {
        label: '价格类型',
        prop: 'type',
        formatter: (value) => {
          const res = invovateDict.find(item => item.value === value);
          return res ? res.label : value;
        }
      },
      {
        label: '委托价格',
        prop: 'price',
        minWidth: 180
      },
      {
        label: '委托数量',
        prop: 'volume',
        minWidth: 180
      },
      {
        label: '已成交量',
        prop: 'deal',
        minWidth: 180
      },
      {
        label: '手续费',
        prop: 'fee',
        minWidth: 180
      },
      {
        label: '冻结金额',
        prop: 'freeze',
        minWidth: 180
      },
      {
        label: '交易方式',
        prop: 'side',
        type: 'tag',
        minWidth: 100,
        dict: typeDict
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 100,
        dict: orderStatusDict
      }, {
        label: '委托时间',
        prop: 'createTimeStr',
        minWidth: 180
      }
    ]
  }
};
