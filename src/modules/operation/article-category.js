import createActionList from '@common/create/element/action-list';
import createSelect from '@common/create/element/select';
import config from '@common/config';
import {createTabs, valideTabs} from './createTabs';
import {CATEGORYTYPEARRAY} from './common';
const statusDict = [{
  label: '启用',
  type: 'success',
  value: 1
}, {
  label: '禁用',
  type: 'danger',
  value: 0
}];

const tabs = [{
  title: '简体中文',
  items: [{
    label: '类别名称',
    prop: 'categoryNameCN',
    required: true,
    rules: [{required: true, message: '请输入类别名称', trigger: 'blur'}]
  }, {
    label: '类别简介',
    prop: 'categoryDescCN',
    required: true,
    rules: [{required: true, message: '请输入类别简介', trigger: 'blur'}]
  }]
}, {
  title: '繁體中文',
  items: [{
    label: '類別名稱',
    prop: 'categoryNameHK',
    required: true,
    rules: [{required: true, message: '请输入类别名称', trigger: 'blur'}]
  }, {
    label: '類別簡介',
    prop: 'categoryDescHK',
    required: true,
    rules: [{required: true, message: '请输入类别简介', trigger: 'blur'}]
  }]
}, {
  title: 'English',
  items: [{
    label: 'Name',
    prop: 'categoryNameEN',
    required: true,
    rules: [{required: true, message: '请输入类别名称', trigger: 'blur'}]
  }, {
    label: 'Describe',
    prop: 'categoryDescEN',
    required: true,
    rules: [{required: true, message: '请输入类别简介', trigger: 'blur'}]
  }]
}];

const categoryTypeOption = CATEGORYTYPEARRAY;

export default {
  remote: [{
    url: '/v1/manage/common/admin/notice/category/getMainList',
    key: 'categorys',
    default: []
  }],
  search: [
    {
      label: '分类名称',
      prop: 'categoryName'
    },
    {
      label: '状态',
      prop: 'status',
      type: 'select',
      options: {
        options: statusDict
      }
    },
    {
      label: '所属一级分类',
      prop: 'pid',
      type: 'select',
      remote: {
        key: 'categorys',
        labelField: 'categoryNameCN',
        valueField: 'id'
      }
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
          authId: 'operation-category-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'operation-category-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'operation-category-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/notice/category/getList',
    delete: {
      url: '/v1/manage/common/admin/notice/category/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    status: {
      url: '/v1/manage/common/admin/notice/category/updateStatus',
      method: 'get',
      params(id, status) {
        return {
          id,
          status
        };
      }
    },
    checkbox: true,
    columns: [
      {
        label: '中文分类名称',
        width: 200,
        prop: 'categoryNameCN'
      },
      {
        label: '繁体分类名称',
        width: 200,
        prop: 'categoryNameHK'
      },
      {
        label: '英文分类名称',
        width: 200,
        prop: 'categoryNameEN'
      },
      {
        label: '网址',
        prop: 'id',
        width: 500,
        render(h, itme, model) {
          return h('div', config.USER_DOMAIN + '/notice?id=' + model.id);
        }
      },
      {
        label: '简介',
        width: 350,
        prop: 'categoryDescCN'
      },
      {
        label: '排序',
        prop: 'sort'
      },
      {
        label: '创建时间',
        prop: 'created',
        width: 300
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        width: 150,
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
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'operation-category-edit'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus',
                    authId: 'operation-category-status'
                  }
                  : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'operation-category-status'
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
    title: '新建分类',
    saveURL: '/v1/manage/common/admin/notice/category/create',
    saveParams(model) {
      const isFirstCategory = model.isFirstCategory;
      const current = this.remote.categorys.filter(item => item.id === model.pid);
      const finallyType = current && current[0] && current[0].type;
      delete model.isFirstCategory;
      delete model['type,pid'];
      if (isFirstCategory === 1) {
        return {
          ...model,
          pidStr: '',
          pid: 0
        };
      } else {
        return {
          ...model,
          type: finallyType,
          pidStr: ',' + model.pid + ','
        };
      }
    },
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(dialog) {
      dialog.options.items[dialog.options.items.length - 1].activeTab = '0';
      dialog.form.type = '';
      dialog.form.pid = '';
    },
    items: [{
      label: '级别',
      prop: 'isFirstCategory',
      type: 'switch',
      default: 1,
      options: {
        'active-text': '二级分类',
        'inactive-text': '一级分类',
        'inactive-value': 1,
        'active-value': 2
      },
      listeners: {
        change (value) {
          const item = this.dialog.add.options.items.filter((item) => item.prop === 'type,pid')[0];
          if (!item) return;
          this.dialog.add.form.type = '';
          this.dialog.add.form.pid = '';
          this.dialog.add.form['type,pid'] = '';
          switch (value) {
            case 1: {
              item.label = '所属模块';
              break;
            }
            case 2: {
              item.label = '所属一级分类';
              break;
            }
          }
        }
      }
    }, {
      label: '所属模块',
      prop: 'type,pid',
      value: 1,
      rules: [{required: true, message: '请选择所属分类', trigger: 'blur'}],
      render (h, item, model) {
        switch (model.isFirstCategory) {
          case 1:
            return createSelect.call(this, h, {
              prop: 'type',
              options: {
                options: categoryTypeOption
              },
              listeners: {
                input(value) {
                  if (value) {
                    this.dialog.add.form['type,pid'] = 1;
                  } else {
                    this.dialog.add.form['type,pid'] = '';
                  }
                }
              }
            }, model);
          case 2:
            return createSelect.call(this, h, {
              prop: 'pid',
              remote: {
                key: 'categorys',
                labelField: 'categoryNameCN',
                valueField: 'id'
              },
              listeners: {
                input(value) {
                  if (value) {
                    this.dialog.add.form['type,pid'] = 1;
                  } else {
                    this.dialog.add.form['type,pid'] = '';
                  }
                }
              }
            }, model);
        }
      }
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      required: true
    }, {
      prop: 'categoryNameCN,categoryNameHK,categoryNameEN,categoryDescCN,categoryDescHK,categoryDescEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  },
  editDialog: {
    title: '编辑分类',
    saveURL: '/v1/manage/common/admin/notice/category/update',
    saveParams(model) {
      const isFirstCategory = model.isFirstCategory;
      const current = this.remote.categorys.filter(item => item.id === model.pid);
      const finallyType = current && current[0] && current[0].type;
      delete model.isFirstCategory;
      delete model.typeName;
      delete model['type,pid'];
      if (isFirstCategory === 1) {
        return {
          ...model,
          pidStr: '',
          pid: 0
        };
      } else {
        return {
          ...model,
          type: finallyType,
          pidStr: ',' + model.pid + ','
        };
      }
    },
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(form) {
      this.dialog.edit.options.items[this.dialog.edit.options.items.length - 1].activeTab = '0';
      this.dialog.edit.form.isFirstCategory = this.dialog.edit.form.pid === '0' ? 1 : 2;
      this.dialog.edit.form['type,pid'] = '1';
    },
    items: [{
      label: '级别',
      prop: 'isFirstCategory',
      type: 'switch',
      default: 1,
      options: {
        'active-text': '二级分类',
        'inactive-text': '一级分类',
        'inactive-value': 1,
        'active-value': 2
      },
      listeners: {
        change (value) {
          const item = this.dialog.edit.options.items.filter((item) => item.prop === 'type,pid')[0];
          if (!item) return;
          this.dialog.edit.form.type = '';
          this.dialog.edit.form.pid = '';
          this.dialog.edit.form['type,pid'] = '';
          switch (value) {
            case 1: {
              item.label = '所属模块';
              break;
            }
            case 2: {
              item.label = '所属一级分类';
              break;
            }
          }
        }
      }
    }, {
      label: '所属模块',
      prop: 'type,pid',
      rules: [{required: true, message: '请选择所属分类', trigger: 'blur'}],
      render (h, item, model) {
        switch (model.isFirstCategory) {
          case 1:
            return createSelect.call(this, h, {
              prop: 'type',
              required: true,
              options: {
                options: categoryTypeOption
              },
              listeners: {
                input(value) {
                  if (value) {
                    this.dialog.edit.form['type,pid'] = 1;
                  } else {
                    this.dialog.edit.form['type,pid'] = '';
                  }
                }
              }
            }, model);
          case 2:
            return createSelect.call(this, h, {
              prop: 'pid',
              required: true,
              remote: {
                key: 'categorys',
                labelField: 'categoryNameCN',
                valueField: 'id'
              },
              listeners: {
                input(value) {
                  if (value) {
                    this.dialog.edit.form['type,pid'] = 1;
                  } else {
                    this.dialog.edit.form['type,pid'] = '';
                  }
                }
              }
            }, model);
        }
      }
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      required: true
    }, {
      prop: 'categoryNameCN,categoryNameHK,categoryNameEN,categoryDescCN,categoryDescHK,categoryDescEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  }
};
