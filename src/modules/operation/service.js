import createActionList from '@common/create/element/action-list';
import { date } from '@common/utils/filters';

const statusDict = [{
  label: '未处理',
  type: 'danger',
  value: 1
}, {
  label: '已处理',
  type: 'primary',
  value: 2
}];

export default {
  search: [
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      options: {
        options: statusDict
      }
    }, {
      label: '创建时间',
      type: 'date-range',
      prop: 'startTime,endTime',
      default: [date(new Date(new Date().getTime() - 7 * 24 * 3600000)), date(new Date())],
      options: {
        valueFormat: 'yyyy-MM-dd',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期'
      }
    }, {
      type: 'action-list',
      calss: 'operation-action-list',
      actionList: [{
        label: '搜索',
        icon: 'el-icon-search',
        action: 'loadDataTable',
        authId: 'operation-service-search'
      }]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/work_issue/getList',
    columns: [
      {
        label: '用户名',
        minWidth: 220,
        prop: 'userName'
      }, {
        label: '姓名',
        minWidth: 180,
        prop: 'realName'
      }, {
        label: '问题内容',
        prop: 'question',
        minWidth: 200
      }, {
        label: '创建时间',
        minWidth: 250,
        prop: 'created'
      }, {
        label: '回复时间',
        minWidth: 250,
        prop: 'lastUpdateTime'
      }, {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 200,
        dict: statusDict
      }, {
        label: '操作',
        fixed: 'right',
        width: 100,
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [{
                label: '回复',
                type: 'primary',
                size: 'small',
                icon: 'el-icon-edit',
                action: 'openEditDialog',
                authId: 'operation-service-edit'
              }]
            },
            model
          );
        }
      }
    ]
  },
  editDialog: {
    title: '回复客户',
    saveURL: '/v1/manage/common/admin/work_issue/updateAnswer',
    saveMethod: 'get',
    items: [ {
      label: '用户名',
      prop: 'userName',
      options: {
        disabled: true
      }
    }, {
      label: '姓名',
      prop: 'realName',
      options: {
        disabled: true
      }
    }, {
      label: '创建时间',
      prop: 'created',
      options: {
        disabled: true
      }
    }, {
      label: '问题内容',
      prop: 'question',
      options: {
        type: 'textarea',
        autosize: {minRows: 5, maxRows: 5},
        disabled: true
      }
    }, {
      label: '回复内容',
      prop: 'answer',
      rules: [{required: true, message: '请选择回复内容', trigger: 'blur'}],
      options: {
        type: 'textarea',
        autosize: {minRows: 10, maxRows: 10}
      }
    }]
  }
};
