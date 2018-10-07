import createActionList from '@common/create/element/action-list';
import config from '@common/config';
import {createTabs, valideTabs} from './createTabs';
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
    label: '文章标题',
    prop: 'titleCN',
    required: true,
    rules: [{required: true, message: '请输入文章标题', trigger: 'blur'}]
  }, {
    label: '文章简介',
    prop: 'descriptionCN',
    required: true,
    rules: [{required: true, message: '请输入文章简介', trigger: 'blur'}]
  }, {
    label: '文章作者',
    prop: 'authorCN',
    required: true,
    rules: [{required: true, message: '请输入文章作者', trigger: 'blur'}]
  }, {
    label: '文章内容',
    prop: 'contentCN',
    type: 'tinymce',
    required: true,
    rules: [{required: true, message: '请输入文章内容', trigger: 'blur'}]
  }]
}, {
  title: '繁體中文',
  items: [{
    label: '文章標題',
    prop: 'titleHK',
    required: true,
    rules: [{required: true, message: '请输入文章标题', trigger: 'blur'}]
  }, {
    label: '文章簡介',
    prop: 'descriptionHK',
    required: true,
    rules: [{required: true, message: '请输入文章简介', trigger: 'blur'}]
  }, {
    label: '文章作者',
    prop: 'authorHK',
    required: true,
    rules: [{required: true, message: '请输入文章作者', trigger: 'blur'}]
  }, {
    label: '文章內容',
    prop: 'contentHK',
    type: 'tinymce',
    required: true,
    rules: [{required: true, message: '请输入文章内容', trigger: 'blur'}]
  }]
}, {
  title: 'English',
  items: [{
    label: 'Title',
    prop: 'titleEN',
    required: true,
    rules: [{required: true, message: '请输入文章标题', trigger: 'blur'}]
  }, {
    label: 'Description',
    prop: 'descriptionEN',
    required: true,
    rules: [{required: true, message: '请输入文章简介', trigger: 'blur'}]
  }, {
    label: 'Author',
    prop: 'authorEN',
    required: true,
    rules: [{required: true, message: '请输入文章作者', trigger: 'blur'}]
  }, {
    label: 'Content',
    prop: 'contentEN',
    type: 'tinymce',
    required: true,
    rules: [{required: true, message: '请输入文章内容', trigger: 'blur'}]
  }]
}];

let validateAlias = function (rule, value, callback) {
  const res = /[A-Za-z]{3}/;
  if (value && !res.test(value)) {
    callback(new Error('请输入三位以上字母'));
  } else {
    callback();
  }
};
export default {
  remote: [{
    url: '/v1/manage/common/admin/notice/category/getMainList',
    key: 'firstCategory',
    transfer(list) {
      return list.filter(item => item.type !== 2);
    },
    default: []
  }, {
    url: '/v1/manage/common/admin/notice/category/getSubList',
    key: 'secondCategory',
    lazy: true,
    default: []
  }],
  search: [
    {
      label: '标题',
      prop: 'title'
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
          authId: 'operation-article-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'operation-article-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'operation-article-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/notice/getList',
    delete: {
      url: '/v1/manage/common/admin/notice/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    status: {
      // change status 需要配置
      url: '/v1/manage/common/admin/notice/updateStatus',
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
        label: '中文标题',
        prop: 'titleCN',
        width: 350
      },
      {
        label: '繁体标题',
        prop: 'titleHK',
        width: 350
      },
      {
        label: '英文文标题',
        width: 350,
        prop: 'titleEN'
      },
      {
        label: '所属分类',
        width: 150,
        prop: 'categoryNameCN'
      },
      {
        label: '别名',
        width: 150,
        prop: 'alias'
      },
      {
        label: '网址',
        prop: 'id',
        width: 450,
        render(h, itme, model) {
          return h('div', config.USER_DOMAIN + '/notice?id=' + model.id);
        }
      },
      {
        label: '排序',
        prop: 'sort'
      },
      {
        label: '创建时间',
        prop: 'created',
        width: 200
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
                  label: '编辑',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action: 'openEditDialog',
                  authId: 'operation-article-edit'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus',
                    authId: 'operation-article-status'
                  }
                  : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus',
                    authId: 'operation-article-status'
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
    title: '新建文章',
    saveURL: '/v1/manage/common/admin/notice/create',
    saveParams(model) {
      const firstCategoryId = model.firstCategoryId;
      const secondCategoryId = model.secondCategoryId;
      delete model.secondCategoryId;
      delete model.firstCategoryId;
      return {
        ...model,
        contentType: 1,
        categoryId: secondCategoryId,
        pidStr: `,${firstCategoryId},${secondCategoryId},`
      };
    },
    width: '1200px',
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(dialog) {
      dialog.options.items[dialog.options.items.length - 1].activeTab = '0';
    },
    items: [{
      label: '所属一级分类',
      prop: 'firstCategoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属一级分类', trigger: 'blur'}],
      remote: {
        key: 'firstCategory',
        labelField: 'categoryNameCN',
        valueField: 'id'
      },
      listeners: {
        input (value) {
          this.dialog.add.form.secondCategoryId = '';
          if (value === '') return;
          this.loadRemoteData('secondCategory', {
            categoryId: value
          });
        }
      }
    }, {
      label: '所属二级分类',
      prop: 'secondCategoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属二级分类', trigger: 'blur'}],
      remote: {
        key: 'secondCategory',
        labelField: 'categoryNameCN',
        valueField: 'id'
      }
    }, {
      label: '别名',
      prop: 'alias',
      rules: [{validator: validateAlias, message: '请输入三位以上字母', trigger: 'blur'}]
    }, {
      label: '文章排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{required: true, message: '请排序', trigger: 'blur'}]
    }, {
      prop: 'titleCN,titleHK,titleEN,descriptionCN,descriptionHK,descriptionEN,authorHK,authorHK,authorEN,contentCN,contentHK,contentEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  },
  editDialog: {
    title: '编辑文章',
    width: '1200px',
    saveURL: '/v1/manage/common/admin/notice/update',
    saveParams(model) {
      const firstCategoryId = model.firstCategoryId;
      const secondCategoryId = model.secondCategoryId;
      delete model.secondCategoryId;
      delete model.firstCategoryId;
      return {
        ...model,
        contentType: 1,
        categoryId: secondCategoryId,
        pidStr: `,${firstCategoryId},${secondCategoryId},`
      };
    },
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(form) {
      this.dialog.edit.options.items[this.dialog.edit.options.items.length - 1].activeTab = '0';
      const ids = form.pidStr.split(',');
      this.dialog.edit.form.firstCategoryId = ids[1];
      this.dialog.edit.form.secondCategoryId = ids[2];
      this.loadRemoteData('secondCategory', {
        categoryId: ids[1]
      });
    },
    items: [{
      label: '所属一级分类',
      prop: 'firstCategoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属一级分类', trigger: 'blur'}],
      remote: {
        key: 'firstCategory',
        labelField: 'categoryNameCN',
        valueField: 'id'
      },
      listeners: {
        input (value) {
          this.dialog.edit.form.secondCategoryId = '';
          if (value === '') return;
          this.loadRemoteData('secondCategory', {
            categoryId: value
          });
        }
      }
    }, {
      label: '所属二级分类',
      prop: 'secondCategoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属二级分类', trigger: 'blur'}],
      remote: {
        key: 'secondCategory',
        labelField: 'categoryNameCN',
        valueField: 'id'
      }
    }, {
      label: '别名',
      prop: 'alias',
      rules: [{validator: validateAlias, message: '请输入三位以上字母', trigger: 'blur'}]
    }, {
      label: '文章排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{required: true, message: '请排序', trigger: 'blur'}]
    }, {
      prop: 'titleCN,titleHK,titleEN,descriptionCN,descriptionHK,descriptionEN,authorHK,authorHK,authorEN,contentCN,contentHK,contentEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  }
};
