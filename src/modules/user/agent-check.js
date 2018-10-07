import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '禁用',
  type: 'danger',
  value: 0
}, {
  label: '启用',
  type: 'success',
  value: 1
}, {
  label: '未审核',
  type: 'info',
  value: 2
}, {
  label: '审核失败',
  type: 'warning',
  value: 3
}];
export default {
  search: [
    {
      label: '会员ID',
      prop: 'inviteCode'
    },
    {
      label: '用户名',
      prop: 'username'
    },
    {
      label: '手机号码',
      prop: 'mobile'
    },
    {
      label: '层级',
      prop: 'level'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/user/reviewSubagentList',
    columns: [
      {
        label: '会员ID',
        width: 300,
        prop: 'inviteCode'
      },
      {
        label: '用户名',
        width: 300,
        prop: 'username'
      },
      {
        label: '手机号',
        width: 300,
        prop: 'mobile'
      },
      {
        label: '层级',
        width: 250,
        prop: 'level'
      },
      {
        label: '审核状态',
        prop: 'status',
        type: 'tag',
        width: 200,
        dict: statusDict
      },
      {
        label: '审核备注',
        width: 450,
        prop: 'agentNote'
      },
      {
        label: '注册时间',
        width: 340,
        prop: 'created'
      },
      {
        label: '操作',
        render(h, item, model) {
          if (model.status === 2) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '审核',
                    type: 'primary',
                    size: 'small',
                    icon: 'el-icon-edit',
                    action: 'openEditDialog'
                  }]
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
    title: '代理商注册审核',
    saveURL: '/user/updateReviewsStatus',
    saveParams (params) {
      const id = params.id;
      const note = params.agentNote;
      const reviewsStatus = 1;
      params = {id, note, reviewsStatus};
      return params;
    },
    saveMethod: 'get',
    items: [{
      label: 'ID',
      prop: 'id',
      options: {
        disabled: true
      }
    }, {
      label: '用户名',
      prop: 'username',
      options: {
        disabled: true
      }
    }, {
      label: '手机号',
      prop: 'mobile',
      options: {
        disabled: true
      }
    }, {
      label: '层级',
      prop: 'level',
      options: {
        disabled: true
      }
    }, {
      label: '注册时间',
      prop: 'created',
      options: {
        disabled: true
      }
    }, {
      label: '审核备注',
      prop: 'agentNote'
    }
    ]
  }
};
