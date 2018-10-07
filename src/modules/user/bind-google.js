import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '未绑定',
  type: 'danger',
  value: 0
}, {
  label: '已绑定',
  type: 'success',
  value: 1
}, {
  label: '错误状态',
  type: 'info',
  value: 2
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
      label: '创建时间',
      type: 'date-range',
      prop: 'startTime,endTime',
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
          authId: 'usercenter-bind-google-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/user/manager/getUserGoogleAuthList?gaStatus=1',
    columns: [
      {
        label: '会员ID',
        minWidth: 200,
        prop: 'inviteCode'
      },
      {
        label: '用户名',
        prop: 'username',
        minWidth: 200
      },
      {
        label: '谷歌认证绑定状态',
        prop: 'status',
        type: 'tag',
        dict: statusDict,
        minWidth: 200
      },
      {
        label: '创建时间',
        width: 250,
        prop: 'created',
        minWidth: 250
      },
      {
        label: '更新时间',
        width: 250,
        prop: 'lastUpdateTime'
      },
      {
        label: '操作',
        fixed: 'right',
        width: 120,
        render(h, item, model) {
          if (model.status === 0 || model.status === 1) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '解除绑定',
                    size: 'small',
                    icon: 'el-icon-edit',
                    type: 'primary',
                    action(model) {
                      this.$confirm('您确定要解除用户谷歌认证信息吗？', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                      }).then(() => {
                        this.$http.post('/v1/manage/user/manager/user_google_auth_update?id=' + model.id).then((v) => {
                          this.$message.success('操作成功');
                          this.loadDataTable();
                        });
                      });
                    },
                    authId: 'usercenter-bind-google-delete'
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
