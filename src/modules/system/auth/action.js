import createActionList from '@common/create/element/action-list';
import UserModel from '@common/models/user';
const getMenu = (data, res = []) => {
  data.forEach(item => {
    let { name, id } = item;
    let len = res.push({ name, id });
    if (item.children && item.children.length !== 0) {
      res[len - 1].children = [];
      getMenu(item.children, res[len - 1].children);
    }
  });
  return res;
};

const methodDict = [{
  label: 'GET',
  value: 'get'
}, {
  label: 'POST',
  value: 'post'
}];

export default {
  search: [
    {
      label: '名称',
      prop: 'name'
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
          label: '新增功能权限',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-auth-action-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'system-auth-action-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/admin/privileges',
    delete: {
      url: '/v1/manage/admin/privileges/delete',
      method: 'post'
    },
    checkbox: true,
    columns: [
      {
        label: '名称',
        prop: 'name'
      },
      {
        label: '描述',
        prop: 'description'
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
                  authId: 'system-auth-action-edit'
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
    title: '新建功能权限',
    saveURL: '/v1/manage/admin/privileges',
    saveParams(model) {
      const muneid = model.topSelectedMenu[model.topSelectedMenu.length - 1];
      delete model.topSelectedMenu;
      return {
        ...model,
        menuId: muneid
      };
    },
    items: [
      {
        label: '名称',
        prop: 'name',
        rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      {
        label: '描述',
        prop: 'description',
        rules: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      {
        label: 'URL',
        prop: 'url',
        rules: [{ required: true, message: '请输入接口路径', trigger: 'blur' }]
      },
      {
        label: 'Method',
        prop: 'method',
        type: 'select',
        default: 'get',
        options: {
          options: methodDict
        },
        rules: [{ required: true, message: '请输入接口方法', trigger: 'blur' }]
      },
      {
        label: '菜单ID',
        type: 'cascader',
        prop: 'topSelectedMenu',
        options: {
          options: getMenu(UserModel.getters.menuTree()),
          'show-all-levels': false,
          props: {
            label: 'name',
            value: 'id',
            children: 'children'
          }
        },
        rules: [{ required: true, message: '请选择菜单ID', trigger: 'blur' }]
      }
    ]
  },
  editDialog: {
    title: '编辑功能权限',
    saveURL: '/v1/manage/admin/privileges/update',
    // saveMethod: 'patch',
    items: [
      {
        label: '名称',
        prop: 'name',
        options: {
          disabled: true
        },
        rules: [{ required: true, message: '请输入名称', trigger: 'blur' }]
      },
      {
        label: '描述',
        prop: 'description',
        rules: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      {
        label: 'URL',
        prop: 'url',
        rules: [{ required: true, message: '请输入接口路径', trigger: 'blur' }]
      },
      {
        label: 'Method',
        prop: 'method',
        type: 'select',
        default: 'get',
        options: {
          options: methodDict
        },
        rules: [{ required: true, message: '请输入接口方法', trigger: 'blur' }]
      }
    ]
  }
};
