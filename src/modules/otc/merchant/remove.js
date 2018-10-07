export default {
  search: [
    {
      label: '商家名称',
      prop: 'merchantName'
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
      label: '更新时间',
      type: 'date-range',
      prop: 'updateStartTime,updateEndTime',
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
          authId: 'otc-merchant-remove-search'
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
    loadURL: '/v1/manage/otc/otcMerchantInfo/sys/queryRelieve',
    columns: [
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
        label: '退回保证金',
        prop: 'bailDesc',
        minWidth: 150
      },
      {
        label: '图片资料',
        prop: 'imageUrl',
        minWidth: 200,
        type: 'img',
        options: {
          class: 'imgs',
          width: '50px',
          height: '50px'
        }
      },
      {
        label: '视频资料',
        prop: 'videoUrl',
        minWidth: 200,
        render(h, item, model) {
          return h(
            'a',
            {
              style: 'height: 50px',
              attrs: {
                target: 'new',
                href: model['videoUrl']
              }
            },
            model['videoUrl']
          );
        }
      },
      {
        label: '操作人',
        prop: 'optUserName',
        minWidth: 200
      },
      {
        label: '创建时间',
        width: 250,
        prop: 'created',
        minWidth: 250
      },
      {
        label: '解除时间',
        width: 250,
        prop: 'relieveTime'
      }
    ]
  }
};
