import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '待处理',
  type: 'danger',
  value: 0
}, {
  label: '已处理',
  type: 'success',
  value: 1
}];

const typeDict = [{
  label: '买家未付款',
  type: 'danger',
  value: 1
}, {
  label: '卖家未释放币',
  type: 'info',
  value: 2
}, {
  label: '其他原因',
  type: 'warning',
  value: 3
}];

export default {
  search: [
    {
      label: '订单ID',
      prop: 'orderId'
    },
    {
      label: '会员昵称',
      prop: 'vipNickName'
    },
    {
      label: '申诉状态',
      type: 'select',
      prop: 'status',
      options: {
        options: statusDict
      }
    },
    {
      label: '申诉类型',
      type: 'select',
      prop: 'appealType',
      options: {
        options: typeDict
      }
    },
    {
      label: '创建时间',
      type: 'date-range',
      prop: 'createStartTime,createEndTime',
      options: {
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '处理时间',
      type: 'date-range',
      prop: 'dealStartTime,dealEndTime',
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
          authId: 'otc-appeal-search'
        }
        // ,
        // {
        //   label: '导出',
        //   icon: 'el-icon-download',
        //   type: 'primary',
        //   action: 'exportExcel'
        // }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcAppeal/sys/query',
    columns: [
      {
        label: '订单号',
        prop: 'orderId',
        minWidth: 200
      },
      {
        label: '商家名称',
        prop: 'merchantName',
        minWidth: 200
      },
      {
        label: '会员昵称',
        prop: 'vipNickName',
        minWidth: 200
      },
      {
        label: '申诉人',
        prop: 'appealUser',
        minWidth: 200
      },
      {
        label: '申诉类型',
        prop: 'appealType',
        type: 'tag',
        minWidth: 200,
        dict: typeDict
      },
      {
        label: '处理状态',
        prop: 'status',
        type: 'tag',
        minWidth: 200,
        dict: statusDict
      },
      {
        label: '申诉说明',
        width: 250,
        prop: 'appealContent',
        minWidth: 250
      },
      {
        label: '创建时间',
        width: 250,
        prop: 'created'
      },
      {
        label: '处理时间',
        width: 250,
        prop: 'dealTime'
      },
      {
        label: '备注',
        width: 250,
        prop: 'optRemark'
      },
      {
        label: '操作',
        fixed: 'right',
        render(h, item, model) {
          if (model.status === 0) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '处理',
                    type: 'primary',
                    size: 'small',
                    icon: 'el-icon-edit',
                    action: 'openEditDialog',
                    authId: 'otc-appeal-edit'
                  }
                ]
              },
              model
            );
          }
        },
        width: 200
      }
    ]
  },
  editDialog: {
    title: '申诉处理',
    top: '100px',
    saveURL: '/v1/manage/otc/otcAppeal/sys/update',
    saveParams(model) {
      if (model.appealType === -1 || model.optResult === true) {
        model.optResult = '';
      }
      return {
        optResult: model.optResult,
        id: model.id,
        optRemark: model.optRemark
      };
    },
    onOpen(model) {
      const itemLength = this.dialog.edit.options.items.length;
      if (itemLength > 2) {
        this.dialog.edit.options.items.pop();
      }
      switch (model.appealType) {
        case 1:
          this.dialog.edit.options.items.push({
            label: '释放商家库存',
            prop: 'optResult',
            type: 'switch',
            options: {
              'active-text': '是',
              'inactive-text': '否',
              'inactive-value': '',
              'active-value': 1
            }
          });
          break;
        case 2:
          this.dialog.edit.options.items.push({
            label: '放币给买家',
            prop: 'optResult',
            type: 'switch',
            options: {
              'active-text': '是',
              'inactive-text': '否',
              'inactive-value': '',
              'active-value': 2
            }
          });
          break;
      }
    },
    items: [{
      label: '类型',
      prop: 'appealType',
      type: 'tag',
      dict: typeDict
    }, {
      label: '备注',
      prop: 'optRemark',
      required: true,
      rules: [{ required: true, message: '请输入备注', trigger: 'blur' }]
    }, {
      label: '放币给买家',
      prop: 'optResult',
      type: 'switch',
      options: {
        'active-text': '是',
        'inactive-text': '否',
        'inactive-value': '',
        'active-value': 2
      }
    }]
  }
};
