import createActionList from '@common/create/element/action-list';
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
const userAuthStatusDict = [{
  label: '资料未上传',
  type: 'warning',
  value: -1
}, {
  label: '待审核',
  type: 'danger',
  value: 0
}, {
  label: '审核拒绝',
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
      prop: 'userName'
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
      label: '认证状态',
      prop: 'authStatus',
      type: 'select',
      options: {
        options: authStatusDict
      }
    },
    {
      label: '审核状态',
      prop: 'reviewsStatus',
      type: 'select',
      options: {
        options: userAuthStatusDict
      }
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action(model) {
            const { authStatus, reviewsStatus } = model;
            this.$router.replace({
              name: this.$route.name,
              query: { authStatus: authStatus, reviewsStatus: reviewsStatus }
            });
            this.loadDataTable();
          },
          authId: 'usercenter-authentication-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/user/getUserAuthList',
    params(model) {
      let { authStatus, reviewsStatus } = this.$route.query;
      if (typeof reviewsStatus === 'undefined') {
        reviewsStatus = 0;
      } else {
        reviewsStatus = isNaN(parseInt(reviewsStatus))
          ? ''
          : parseInt(reviewsStatus);
      }

      authStatus = isNaN(parseInt(authStatus)) ? '' : parseInt(authStatus);
      this.searchForm.authStatus = authStatus;
      this.searchForm.reviewsStatus = reviewsStatus;
      model.authStatus = authStatus;
      model.reviewsStatus = reviewsStatus;
      return model;
    },
    columns: [
      {
        label: '会员ID',
        minWidth: 150,
        prop: 'inviteCode'
      },
      {
        label: '用户名',
        minWidth: 140,
        prop: 'username'
      },
      {
        label: '真实姓名',
        minWidth: 130,
        prop: 'realName'
      },
      {
        label: '手机号',
        minWidth: 150,
        prop: 'mobile'
      },
      {
        label: '邮箱',
        minWidth: 200,
        prop: 'email'
      },
      {
        label: '身份证号',
        minWidth: 200,
        prop: 'idCard'
      },
      {
        label: '认证状态',
        prop: 'authStatus',
        type: 'tag',
        minWidth: 150,
        dict: authStatusDict
      },
      {
        label: '审核状态',
        prop: 'reviewsStatus',
        type: 'tag',
        minWidth: 150,
        dict: userAuthStatusDict
      },
      {
        label: '操作',
        fixed: 'right',
        render(h, item, model) {
          // if (model.reviewsStatus === 0) {
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
                  action(model) {
                    this.$router.push({
                      path: '/user/authentication-detail',
                      query: { id: model.id }
                    });
                  },
                  authId: 'usercenter-authentication-examine'
                }
              ]
            },
            model
          );
          // }
        },
        width: 150
      }
    ]
  }
};
