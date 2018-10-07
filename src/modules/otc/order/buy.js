const statusDict = [{
  label: '付款中',
  type: 'danger',
  value: 1
}, {
  label: '已付款',
  type: 'warning',
  value: 2
}, {
  label: '已取消',
  type: 'info',
  value: 0
}, {
  label: '已放币',
  type: 'success',
  value: 3
}];

export default {
  search: [
    {
      label: '会员昵称',
      prop: 'vipNickName'
    },
    {
      label: '商家名称',
      prop: 'merchantName'
    },
    {
      label: '订单ID',
      prop: 'orderId'
    },
    {
      label: '参考号',
      prop: 'orderNum'
    },
    {
      label: '订单状态',
      type: 'select',
      prop: 'status',
      options: {
        options: statusDict
      }
    },
    {
      label: '创建时间',
      type: 'date-range',
      prop: 'beginDate,endDate',
      options: {
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '更新时间',
      type: 'date-range',
      prop: 'updateBeginDate,updateEndDate',
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
          authId: 'otc-order-buy-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcOrder/sys/queryOrderList',
    params(model) {
      let { productType } = model;
      if (typeof productType === 'undefined') {
        productType = 1;
      } else {
        productType = isNaN(parseInt(productType)) ? '' : parseInt(productType);
      }
      this.searchForm.productType = productType;
      model.productType = productType;
      return model;
    },
    columns: [
      {
        label: '订单号',
        prop: 'id',
        minWidth: 200
      },
      {
        label: '会员昵称',
        prop: 'vipNickName',
        minWidth: 200
      },
      {
        label: '商家名称',
        prop: 'merchantName',
        minWidth: 200
      },
      {
        label: '币种',
        prop: 'coinName',
        minWidth: 200
      },
      {
        label: '数量',
        prop: 'volume',
        minWidth: 200
      },
      {
        label: '买入单价',
        prop: 'price',
        minWidth: 200
      },
      {
        label: '订单总金额',
        prop: 'totalPrice',
        minWidth: 250
      },
      {
        label: '参考号',
        width: 250,
        prop: 'orderNum'
      },
      {
        label: '订单状态',
        width: 250,
        prop: 'status',
        type: 'tag',
        dict: statusDict
      },
      {
        label: '买家手续费',
        width: 250,
        prop: 'buyFee'
      },
      {
        label: '卖家手续费',
        width: 250,
        prop: 'sellFee'
      },
      {
        label: '创建时间',
        width: 250,
        prop: 'created'
      },
      {
        label: '更新时间',
        width: 250,
        prop: 'lastUpdateTime'
      }
    ]
  }
};
