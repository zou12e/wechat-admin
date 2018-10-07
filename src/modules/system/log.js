export default {
  search: [
    {
      label: '时间',
      type: 'date-range',
      prop: 'startTime,endTime',
      options: {
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '姓名',
      prop: 'userName'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'system-log-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/sys_user/log',
    columns: [
      {
        label: '日志类型',
        prop: 'group'
      },
      {
        label: '时间',
        prop: 'created'
      },
      {
        label: '操作人员',
        prop: 'username'
      },
      {
        label: 'IP地址',
        prop: 'ip'
      },
      {
        label: '详情',
        prop: 'remark'
      }
    ]
  }
};
