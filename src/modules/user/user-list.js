import createActionList from '@common/create/element/action-list';
import md5 from 'js-md5';
const statusDict = [{
  label: '禁用',
  type: 'danger',
  value: 0
}, {
  label: '启用',
  type: 'success',
  value: 1
}];
const authStatusDict = [{
  label: '未认证',
  type: 'danger',
  value: 0
}, {
  label: '初级',
  type: 'success',
  value: 1
}, {
  label: '高级',
  type: 'primary',
  value: 2
}];
const isRobotDict = [{
  label: '否',
  value: 0
}, {
  label: '是',
  value: 1
}];
const isSetting = [{
  label: '未设置',
  type: 'danger',
  value: 0
}, {
  label: '已设置',
  type: 'success',
  value: 1
}];
const googleStatusDict = [{
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
      label: '真实姓名',
      prop: 'realName'
    },
    {
      label: '手机号码',
      prop: 'mobile'
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '上级邀请码',
      prop: 'parentInviteCode'
    },
    {
      label: '是否机器人',
      prop: 'isRobot',
      type: 'select',
      options: {
        options: isRobotDict
      }
    },
    {
      label: '使用状态',
      prop: 'status',
      type: 'select',
      options: {
        options: statusDict
      }
    },
    {
      label: '认证状态',
      prop: 'authStatus',
      type: 'select',
      options: {
        options: authStatusDict
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
          authId: 'usercenter-user-list-search'
        }
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
    loadURL: '/v1/manage/user/manager/userInfoList',
    exportURL: '/v1/manage/user/manager/exportList',
    exportFileName: '用户列表',
    status: {
      url: '/v1/manage/user/manager/updateStatus',
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
        width: 100,
        prop: 'inviteCode'
      },
      {
        label: '用户名',
        width: 150,
        prop: 'username'
      },
      {
        label: '真实姓名',
        width: 150,
        prop: 'realName'
      },
      {
        label: '手机号',
        width: 150,
        prop: 'mobile'
      },
      {
        label: '邮箱',
        prop: 'email',
        minWidth: 180
      },
      {
        label: '上级邀请码',
        prop: 'parentInviteCode',
        minWidth: 100
      },
      {
        label: '实名认证状态',
        prop: 'authStatus',
        type: 'tag',
        width: 150,
        dict: authStatusDict
      },
      {
        label: '是否设置支付密码',
        prop: 'paypassSetting',
        type: 'tag',
        width: 150,
        dict: isSetting
      },
      {
        label: '谷歌认证绑定状态',
        prop: 'gaStatus',
        type: 'tag',
        width: 150,
        dict: googleStatusDict
      },
      {
        label: '注册时间',
        width: 200,
        prop: 'created'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 100,
        dict: statusDict
      },
      {
        label: '操作',
        fixed: 'right',
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                {
                  label: '查看',
                  size: 'small',
                  icon: 'el-icon-search',
                  action(model) {
                    this.$router.push({
                      path: '/user/user-detail',
                      query: { id: model.id }
                    });
                  },
                  authId: 'usercenter-user-list-check'
                },
                {
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'usercenter-user-list-edit'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus',
                    authId: 'usercenter-user-list-status'
                  } : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'usercenter-user-list-status'
                  }
              ]
            },
            model
          );
        },
        width: 290
      }
    ]
  },
  editDialog: {
    title: '编辑用户',
    saveURL: '/v1/manage/user/manager/update',
    saveParams(model) {
      return {
        ...model,
        password: model.password.trim() ? md5(model.password.trim()) : undefined
      };
    },
    items: [
      {
        label: 'ID',
        prop: 'id',
        options: {
          disabled: true
        }
      },
      {
        label: '用户名',
        prop: 'username',
        options: {
          disabled: true
        }
      },
      {
        label: '登录密码',
        prop: 'password',
        options: {
          type: 'password'
        }
      },
      {
        label: '国际区号',
        prop: 'countryCode',
        options: {
          disabled: true
        }
      },
      {
        label: '手机号',
        prop: 'mobile',
        options: {
          disabled: false
        }
      },
      {
        label: '邮箱',
        prop: 'email',
        options: {
          disabled: false
        }
      },
      {
        label: '真实姓名',
        prop: 'realName'
      },
      {
        label: '身份证号',
        prop: 'idCard',
        options: {
          disabled: true
        }
      },
      {
        label: '实名认证状态',
        prop: 'authStatus',
        render(h, item, model) {
          switch (model.authStatus) {
            case 0:
              return h('span', '未认证');
            case 1:
              return h('span', '初级认证');
            case 2:
              return h('span', '高级认证');
          }
        }
      },
      {
        label: '是否机器人',
        prop: 'isRobot',
        type: 'select',
        options: {
          options: [
            {
              label: '否',
              value: 0
            },
            {
              label: '是',
              value: 1
            }
          ]
        }
      }
    ]
  }
};
