import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '已上架',
  type: 'success',
  value: 1
}, {
  label: '已下架',
  type: 'danger',
  value: 2
}, {
  label: '已撤销',
  type: 'info',
  value: 3
}, {
  label: '已完成',
  type: 'success',
  value: 4
}];
const typeDict = [{
  label: '买入',
  type: 'success',
  value: 1
}, {
  label: '卖出',
  type: 'warning',
  value: 2
}];
const payIcon = [
  { typeId: '1', icon: require('../../assets/image/cardpay.png') },
  { typeId: '2', icon: require('../../assets/image/wxpay.png') },
  { typeId: '3', icon: require('../../assets/image/alipay.png') }
];

export default {
  search: [
    {
      label: '商家名称',
      prop: 'merchantName'
    },
    {
      label: '广告状态',
      type: 'select',
      prop: 'status',
      options: {
        options: statusDict
      }
    },
    {
      label: '广告类型',
      type: 'select',
      prop: 'productType',
      options: {
        options: typeDict
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
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'otc-advertisement-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcProduct/sys/query',
    status: {
      url: '/v1/manage/otc/otcProduct/optProductStatus',
      method: 'post',
      params(id, status) {
        if (status === 0) {
          status = 2;
        }
        return {
          productId: id,
          status
        };
      }
    },
    columns: [
      {
        label: '广告ID',
        prop: 'id',
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
        label: '类型',
        prop: 'productType',
        minWidth: 200,
        type: 'tag',
        dict: typeDict
      },
      {
        label: '发布数量',
        prop: 'stock',
        minWidth: 200
      },
      {
        label: '剩余数量',
        width: 250,
        prop: 'surplusStock',
        minWidth: 250
      },
      {
        label: '单价',
        width: 250,
        prop: 'priceNow'
      },
      {
        label: '限额（报价币）',
        width: 250,
        prop: 'volumeMin,volumeMax',
        render(h, item, model) {
          return (
            model.volumeMin + ' - ' + model.volumeMax
          );
        }
      },
      {
        label: '支付方式',
        width: 250,
        prop: 'payType',
        type: 'imgs',
        options: {
          imgUrl: payIcon,
          width: '20px',
          height: '20px'
        }
      },
      {
        label: '状态',
        width: 250,
        prop: 'status',
        type: 'tag',
        dict: statusDict
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
      },
      {
        label: '操作',
        fixed: 'right',
        width: 100,
        render(h, item, model) {
          if (model.status === 1 || model.status === 2) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  model.status === 2
                    ? {
                      label: '上架',
                      size: 'small',
                      type: 'danger',
                      action: 'changeStatus',
                      authId: 'otc-advertisement-status'
                    }
                    : {
                      label: '下架',
                      size: 'small',
                      action: 'changeStatus',
                      authId: 'otc-advertisement-status'
                    }
                ]
              },
              model
            );
          }
        }
      }
    ]
  }
};
