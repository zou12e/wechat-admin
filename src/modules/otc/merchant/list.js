import createActionList from '@common/create/element/action-list';

const statusDict = [{
  label: '待审核',
  type: 'danger',
  value: 0
}, {
  label: '审核通过',
  type: 'success',
  value: 1
}, {
  label: '审核拒绝',
  type: 'info',
  value: 2
}];
const status = [
  {
    label: '启用',
    type: 'success',
    value: 1
  },
  {
    label: '禁用',
    type: 'danger',
    value: 0
  }
];
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
      label: '审核时间',
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
          authId: 'otc-merchant-list-search'
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
    loadURL: '/v1/manage/otc/otcMerchantInfo/sys/query',
    status: {
      url: '/v1/manage/otc/otcMerchantInfo/sys/updateMerchantStatus',
      method: 'post',
      params(id, status, row) {
        return {
          merchantId: row.merchantId,
          status
        };
      }
    },
    columns: [
      {
        label: '商家名称',
        prop: 'merchantName',
        minWidth: 180
      },
      {
        label: '会员昵称',
        prop: 'vipNickName',
        minWidth: 180
      },
      {
        label: '商家保证金',
        prop: 'bailDesc',
        minWidth: 150
      },
      {
        label: '图片资料',
        prop: 'imageUrl',
        minWidth: 150,
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
        minWidth: 150,
        render(h, item, model) {
          return h('a', {
            style: 'height: 50px',
            attrs: {
              target: 'new',
              href: model['videoUrl']
            }
          }, model['videoUrl']);
        }
      },
      {
        label: '审核状态',
        prop: 'auditStatus',
        type: 'tag',
        dict: statusDict,
        width: 150
      },
      {
        label: '创建时间',
        prop: 'created',
        width: 200
      },
      {
        label: '审核时间',
        width: 200,
        prop: 'auditTime'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 110,
        dict: status
      },
      {
        label: '操作',
        width: 180,
        fixed: 'right',
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus',
                    authId: 'otc-merchant-list-status'
                  } : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'otc-merchant-list-status'
                  },
                {
                  label: '解除',
                  size: 'small',
                  icon: 'el-icon-edit',
                  type: 'primary',
                  authId: 'otc-merchant-list-delete',
                  action(model) {
                    const { merchantId } = model;
                    this.$confirm('你确定要解除商家系统，并退回保证金吗？？', '温馨提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                    }).then(() => {
                      this.$http.post('/v1/manage/otc/otcMerchantInfo/sys/updateMerchantRelieve?merchantId=' + merchantId).then((v) => {
                        this.$message.success('操作成功');
                        this.loadDataTable();
                      });
                    });
                  }
                }
              ]
            },
            model
          );
        }
      }
    ]
  }
};
