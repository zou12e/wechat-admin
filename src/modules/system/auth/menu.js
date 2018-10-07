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

const statusDict = [
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
      label: '名称',
      prop: 'name'
    },
    {
      label: '名称',
      props: 'name',
      class: 'is-hidden-input'
    },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'system-auth-menu-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'system-auth-menu-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'system-auth-menu-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/admin/menu',
    checkbox: true,
    delete: {
      url: '/v1/manage/admin/menu/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    status: {
      url: '/v1/manage/admin/menu/update',
      method: 'post',
      params(id, status) {
        return {
          id,
          status
        };
      }
    },
    columns: [
      {
        label: '菜单名称',
        prop: 'name'
      },
      {
        label: '排序',
        prop: 'sort'
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
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
                  authId: 'system-auth-menu-edit'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    type: 'danger',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'system-auth-menu-status'
                  } : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'system-auth-menu-status'
                  }
              ]
            },
            model
          );
        }
      }
    ]
  },
  addDialog: {
    title: '增加菜单',
    saveURL: '/v1/manage/admin/menu',
    saveParams(form) {
      const parentId =
        form.parents && form.parents.length > 0
          ? form.parents[form.parents.length - 1]
          : '';
      const params = {
        ...form,
        desc: form.name,
        parentId,
        parentKey: form.parents ? form.parents.join(',') : '',
        type: form.parents && form.parents.length > 0 ? 2 : 1
      };
      delete params.parents;
      return params;
    },
    items: [
      {
        label: '菜单名称',
        prop: 'name',
        rules: [
          {
            required: true,
            message: '请输入菜单名称'
          }
        ]
      },
      {
        label: '父菜单',
        type: 'cascader',
        prop: 'parents',
        options: {
          options: getMenu(UserModel.getters.menuTree()),
          'show-all-levels': false,
          'change-on-select': true,
          props: {
            label: 'name',
            value: 'id',
            children: 'children'
          }
        }
      },
      {
        label: '菜单路径',
        prop: 'targetUrl'
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        default: 1,
        options: {
          min: 0
        }
      },
      {
        label: '状态',
        prop: 'status',
        type: 'switch',
        default: 1,
        options: {
          'inactive-value': 0,
          'active-value': 1
        }
      }
    ]
  },
  editDialog: {
    title: '编辑菜单',
    saveURL: '/v1/manage/admin/menu/update',
    saveParams(form) {
      const parentId =
        form.parents && form.parents.length > 0
          ? form.parents[form.parents.length - 1]
          : '';
      const params = {
        ...form,
        desc: form.name,
        parentId,
        parentKey: form.parents ? form.parents.join(',') : '',
        type: form.parents && form.parents.length > 0 ? 2 : 1
      };
      delete params.parents;
      return params;
    },
    onOpen(model) {
      model.parents = model.parentKey ? model.parentKey.split(',') : [];
    },
    items: [
      {
        label: '菜单名称',
        prop: 'name',
        rules: [
          {
            required: true,
            message: '请输入菜单名称'
          }
        ]
      },
      {
        label: '父菜单',
        type: 'cascader',
        prop: 'parents',
        options: {
          options: getMenu(UserModel.getters.menuTree()),
          'show-all-levels': false,
          'change-on-select': true,
          props: {
            label: 'name',
            value: 'id',
            children: 'children'
          }
        }
      },
      {
        label: '菜单路径',
        prop: 'targetUrl'
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        default: 1,
        options: {
          min: 0
        }
      },
      {
        label: '状态',
        prop: 'status',
        type: 'switch',
        default: 1,
        options: {
          'inactive-value': 0,
          'active-value': 1
        }
      }
    ]
  }
};
