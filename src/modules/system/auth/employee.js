import createActionList from '@common/create/element/action-list';

const statusDict = [{
  label: '启用',
  type: 'success',
  value: 1
}, {
  label: '禁用',
  type: 'danger',
  value: 0
}];
export default {
  remote: [
    {
      url: '/v1/manage/admin/role',
      key: 'getRoleList',
      default: [],
      transfer(data) {
        return data.records;
      }
    }, {
      url: '/v1/common/countries',
      key: 'countries',
      default: [],
      transfer(data) {
        return data.countries;
      }
    }
  ],
  search: [
    {
      label: '手机号',
      prop: 'mobile'
    }, {
      label: '姓名',
      prop: 'fullname'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'system-auth-employee-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-auth-employee-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'system-auth-employee-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/admin/user',
    checkbox: true,
    delete: {
      url: '/v1/manage/admin/user/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    columns: [
      {
        label: '用户名',
        prop: 'username'
      },
      {
        label: '姓名',
        prop: 'fullname'
      },
      {
        label: '手机号',
        prop: 'mobile'
      },
      {
        label: '邮箱',
        prop: 'email'
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
        render(h, item, model) {
          return createActionList.call(
            this,
            h,
            {
              actionList: [
                {
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'system-auth-employee-edit'
                }
              ]
            },
            model
          );
        },
        width: 200
      }
    ]
  },
  addDialog: {
    title: '新建员工',
    saveURL: '/v1/manage/admin/user/add',
    saveParams(model) {
      return {
        ...model,
        countryCode: '+' + model.countryCode,
        'role_strings': model['role_strings'].join(',')
      };
    },
    items: [{
      label: '用户名',
      prop: 'username',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    }, {
      label: '密码',
      prop: 'password',
      options: {
        type: 'password'
      },
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }, {
      label: '姓名',
      prop: 'fullname',
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
    }, {
      label: '国家',
      prop: 'countryCode',
      type: 'select',
      remote: {
        key: 'countries',
        labelField: 'cn',
        valueField: 'code'
      },
      options: {
        filterable: true
      },
      rules: [{ required: true, message: '请选择国家', trigger: 'blur' }]
    }, {
      label: '手机号',
      prop: 'mobile',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    }, {
      label: '邮箱',
      prop: 'email',
      rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    }, {
      label: '角色',
      prop: 'role_strings',
      type: 'checkbox',
      default: [],
      remote: {
        key: 'getRoleList',
        labelField: 'name',
        valueField: 'id'
      },
      rules: [{ required: true, message: '请添加角色', trigger: 'blur' }]
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      options: {
        'active-value': 1,
        'inactive-value': 0,
        'active-text': '启用',
        'inactive-text': '禁用'
      }
    }]
  },
  editDialog: {
    title: '编辑员工',
    saveURL: '/v1/manage/admin/user/update',
    saveParams(model) {
      const { email, fullname, id, mobile, password, status, username, countryCode } = model;
      return {
        email,
        fullname,
        id,
        mobile,
        password,
        status,
        username,
        countryCode: '+' + countryCode,
        'role_strings': model['role_strings']
          .map(s => {
            const item = this.remote.getRoleList.find(item => item.code === s);
            return item ? item.id : false;
          }).filter(item => !!item).join(',')
      };
    },
    onOpen(model) {
      model['role_strings'] = model['role_strings'] ? model['role_strings'].split(',') : '';
      model.countryCode = Number(model.countryCode);
    },
    items: [{
      label: '用户名',
      prop: 'username',
      rules: [{ required: true, message: '请输入用户名', trigger: 'blur' }]
    }, {
      label: '密码',
      prop: 'password',
      options: {
        type: 'password'
      },
      rules: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    }, {
      label: '姓名',
      prop: 'fullname',
      rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
    }, {
      label: '国家',
      prop: 'countryCode',
      type: 'select',
      remote: {
        key: 'countries',
        labelField: 'cn',
        valueField: 'code'
      },
      options: {
        filterable: true
      },
      rules: [{ required: true, message: '请选择国家', trigger: 'blur' }]
    }, {
      label: '手机号',
      prop: 'mobile',
      rules: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
    }, {
      label: '邮箱',
      prop: 'email',
      rules: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
    }, {
      label: '角色',
      prop: 'role_strings',
      type: 'checkbox',
      default: [],
      remote: {
        key: 'getRoleList',
        labelField: 'name',
        valueField: 'code'
      },
      rules: [{ required: true, message: '请添加角色', trigger: 'blur' }]
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      default: 1,
      options: {
        'active-value': 1,
        'inactive-value': 0,
        'active-text': '启用',
        'inactive-text': '禁用'
      }
    }]
  }
};
