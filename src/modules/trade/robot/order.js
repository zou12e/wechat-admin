import dayjs from 'dayjs';
const orderType = [{
  label: '购买失败',
  type: 'danger',
  value: 1
}, {
  label: '已完成',
  type: 'success',
  value: 2
}];

export default{
  search: [
    {
      label: '订单号',
      prop: 'id'
    },
    {
      label: '用户名称',
      prop: 'userName'
    },
    {
      label: '时间',
      type: 'date-range',
      prop: 'createTimeFrom,createTimeTo',
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
          authId: 'trade-robot-order-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/trade/robotshop/order',
    columns: [
      {
        label: '订单号',
        prop: 'id',
        minWidth: '200'
      },
      {
        label: '会员昵称',
        prop: 'userName',
        minWidth: '150'
      },
      {
        label: '产品名称',
        prop: 'title',
        minWidth: '160',
        render(h, item, model) {
          return h('span', model.robot.title);
        }
      },
      {
        label: '套餐',
        prop: 'title',
        minWidth: '160',
        render(h, item, model) {
          return h('span', model.robotItem.title);
        }
      },
      {
        label: '使用时长/月',
        prop: 'months',
        minWidth: '150'
      },
      {
        label: '单价',
        prop: 'price',
        minWidth: '160',
        render(h, item, model) {
          return h('span', model.price + model.coinName);
        }
      },
      {
        label: '支付币种',
        prop: 'coinName',
        minWidth: '140'
      },
      {
        label: '订单状态',
        prop: 'status',
        minWidth: '160',
        type: 'tag',
        dict: orderType
      },
      {
        label: '创建时间',
        prop: 'createTimeStr',
        minWidth: '200'
      }
    ]
  }
};
