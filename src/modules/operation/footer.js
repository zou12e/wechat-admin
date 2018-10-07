import createActionList from '@common/create/element/action-list';
import createInput from '@common/create/element/input';
import createUploadImg from '@common/create/element/upload';
import config from '@common/config';
import {createTabs, valideTabs} from './createTabs';
import {CATEGORYTYPE} from './common';
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
    label: '底部栏名称',
    prop: 'titleCN',
    required: true,
    rules: [{required: true, message: '请输入底部栏名称', trigger: 'blur'}]
  }]
}, {
  title: '繁體中文',
  items: [{
    label: '底部欄名稱',
    prop: 'titleHK',
    required: true,
    rules: [{required: true, message: '请输入底部栏名称', trigger: 'blur'}]
  }]
}, {
  title: 'English',
  items: [{
    label: 'Name',
    prop: 'titleEN',
    required: true,
    rules: [{required: true, message: '请输入底部栏名称', trigger: 'blur'}]
  }]
}];

const categoryType = CATEGORYTYPE.bottom.value;

let validateContent = function (rule, value, callback) {
  if (value && !(value.indexOf('http://') === 0 || value.indexOf('https://') === 0)) {
    callback(new Error('链接必须带上协议号(http://或https://)'));
  } else {
    callback();
  }
};

export default {
  remote: [{
    url: '/v1/manage/common/admin/notice/category/getTypeList?type=' + categoryType,
    method: 'get',
    key: 'categorys',
    transfer(list) {
      return list.filter(item => item.pid !== '0');
    },
    default: []
  }],
  search: [
    {
      label: '底部栏名称',
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
          authId: 'operation-footer-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'operation-footer-search'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/notice/getBottomList',
    delete: {
      url: '/v1/manage/common/admin/notice/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    status: {
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
        label: '中文底部栏名称',
        width: 300,
        prop: 'titleCN'
      },
      {
        label: '繁体底部栏名称',
        width: 300,
        prop: 'titleHK'
      },
      {
        label: '英文底部栏名称',
        width: 300,
        prop: 'titleEN'
      },
      {
        label: '内容',
        prop: 'contentCN',
        width: 550,
        render(h, item, model) {
          const content = model.contentCN;
          return model.contentType === 2 ? h('img', {
            attrs: {
              'src': content,
              'style': 'width: 50px;height: auto;'
            }
          }) : h('div', content);
        }
      },
      {
        label: '所属分类',
        width: 150,
        prop: 'categoryNameCN'
      },
      {
        label: '排序',
        prop: 'sort'
      },
      {
        label: '创建时间',
        prop: 'created',
        width: 250
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
                  action: 'openEditDialog'
                },
                model.status === 1
                  ? {
                    label: '禁用',
                    size: 'small',
                    type: 'danger',
                    action: 'changeStatus'
                  }
                  : {
                    label: '启用',
                    size: 'small',
                    action: 'changeStatus'
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
    title: '新建底部栏配置',
    saveURL: '/v1/manage/common/admin/notice/create',
    saveParams(model) {
      return {
        ...model,
        authorCN: model.titleCN,
        authorEN: model.titleEN,
        authorHK: model.titleHK,
        contentEN: model.contentCN,
        contentHK: model.contentCN,
        descriptionCN: model.titleCN,
        descriptionHK: model.titleHK,
        descriptionEN: model.titleEN,
        pidStr: ',1,' + model.categoryId + ','
      };
    },
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(dialog) {
      dialog.options.items[dialog.options.items.length - 1].activeTab = '0';
    },
    items: [{
      label: '所属分类',
      prop: 'categoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属分类', trigger: 'blur'}],
      remote: {
        key: 'categorys',
        labelField: 'categoryNameCN',
        valueField: 'id'
      }
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{required: true, message: '请排序', trigger: 'blur'}]
    }, {
      label: '内容类型',
      prop: 'contentType',
      type: 'select',
      default: 1,
      rules: [{required: true, message: '请选择内容类型', trigger: 'blur'}],
      options: {
        options: [{
          label: '链接',
          value: 1
        }, {
          label: '图片',
          value: 2
        }]
      },
      listeners: {
        input (value) {
          const item = this.dialog.add.options.items.filter((item) => item.prop === 'contentCN')[0];
          if (!item) return;
          this.dialog.add.form.contentCN = '';
          switch (value) {
            case 1: {
              item.label = '链接';
              break;
            }
            case 2: {
              item.label = '图片';
              break;
            }
          }
        }
      }
    }, {
      label: '链接',
      prop: 'contentCN',
      rules: [{
        required: true, message: '请填写资源', trigger: 'blur'
      }, {validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'
      }],
      render (h, item, model) {
        switch (model.contentType) {
          case 1:
            return createInput.call(this, h, {
              prop: 'contentCN',
              rules: [{
                required: true, message: '请输入链接', trigger: 'blur'
              }]
            }, model);
          case 2:
            return createUploadImg.call(this, h, {
              prop: 'contentCN',
              rules: [{required: true, message: '请上传图片', trigger: 'blur'}],
              options: {
                action: config.IMG_UPLOAD_URL
              }
            }, model);
        }
      }
    }, {
      prop: 'titleCN,titleHK,titleEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  },
  editDialog: {
    title: '编辑底部栏配置',
    saveURL: '/v1/manage/common/admin/notice/update',
    saveParams(model) {
      return {
        ...model,
        authorCN: model.titleCN,
        authorEN: model.titleEN,
        authorHK: model.titleHK,
        contentEN: model.contentCN,
        contentHK: model.contentCN,
        descriptionCN: model.titleCN,
        descriptionHK: model.titleHK,
        descriptionEN: model.titleEN,
        pidStr: ',1,' + model.categoryId + ','
      };
    },
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(form) {
      this.dialog.edit.options.items[this.dialog.edit.options.items.length - 1].activeTab = '0';
    },
    items: [{
      label: '所属分类',
      prop: 'categoryId',
      type: 'select',
      rules: [{required: true, message: '请选择所属分类', trigger: 'blur'}],
      remote: {
        key: 'categorys',
        labelField: 'categoryNameCN',
        valueField: 'id'
      }
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      rules: [{required: true, message: '请排序', trigger: 'blur'}]
    }, {
      label: '内容类型',
      prop: 'contentType',
      type: 'select',
      rules: [{required: true, message: '请选择内容类型', trigger: 'blur'}],
      options: {
        options: [{
          label: '链接',
          value: 1
        }, {
          label: '图片',
          value: 2
        }]
      },
      listeners: {
        input (value) {
          const item = this.dialog.edit.options.items.filter((item) => item.prop === 'contentCN')[0];
          if (!item) return;
          this.dialog.edit.form.contentCN = '';
          switch (value) {
            case 1: {
              item.label = '链接';
              break;
            }
            case 2: {
              item.label = '图片';
              break;
            }
          }
        }
      }
    }, {
      label: '链接',
      prop: 'contentCN',
      rules: [{
        required: true, message: '请填写资源', trigger: 'blur'
      }, {validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'
      }],
      render (h, item, model) {
        switch (model.contentType) {
          case 1:
            return createInput.call(this, h, {
              prop: 'contentCN',
              rules: [{
                required: true, message: '请输入链接', trigger: 'blur'
              }, {
                validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'
              }]
            }, model);
          case 2:
            return createUploadImg.call(this, h, {
              prop: 'contentCN',
              rules: [{required: true, message: '请上传图片', trigger: 'blur'}],

              options: {
                action: config.IMG_UPLOAD_URL
              }
            }, model);
        }
      }
    }, {
      prop: 'titleCN,titleHK,titleEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  }
};
