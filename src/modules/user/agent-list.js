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
      label: '下级代理商',
      prop: 'lower',
      type: 'switch',
      options: {
        'active-value': 2
      }
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
    loadURL: '/user/subagentList',
    status: {
      url: '/user/updateAgentUserStatus',
      method: 'get',
      params(id, status) {
        return {
          id,
          status
        };
      }
    },
    columns: [
      {
        label: '会员ID',
        width: 250,
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
        width: 200,
        prop: 'level'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 300,
        dict: statusDict
      },
      {
        label: '审核备注',
        width: 400,
        prop: 'agentNote'
      },
      {
        label: '注册时间',
        width: 300,
        prop: 'created'
      },
      {
        label: '操作',
        width: 300,
        render(h, item, model) {
          if (model.status === 0 || model.status === 1) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '下级代理',
                    size: 'small',
                    icon: 'el-icon-share',
                    action(model) {
                      this.searchForm.lower = 2;
                      this.loadDataTable();
                    }
                  },
                  model.status === 1
                    ? {
                      label: '禁用',
                      size: 'small',
                      type: 'danger',
                      action: 'changeStatus'
                    }
                    : {
                      label: '启用',
                      size: 'small',
                      action: 'changeStatus'
                    }
                ]
              },
              model
            );
          } else {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '下级代理',
                    size: 'small',
                    icon: 'el-icon-share',
                    action(model) {
                      this.searchForm.lower = 2;
                      this.loadDataTable();
                    }
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
