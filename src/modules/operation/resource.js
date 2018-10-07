import createActionList from '@common/create/element/action-list';
import createUploadImg from '@common/create/element/upload';
import {createTabs, valideTabs} from './createTabs';
import config from '@common/config';
const statusDict = [{
  label: '启用',
  type: 'success',
  value: 1
}, {
  label: '禁用',
  type: 'danger',
  value: 0
}];

let validateContent = function (rule, value, callback) {
  if (value && !(value.indexOf('http://') === 0 || value.indexOf('https://') === 0)) {
    callback(new Error('链接必须带上协议号(http://或https://)'));
  } else {
    callback();
  }
};

const tabs = [
  {
    title: '简体中文',
    items: [{
      label: '资源名称',
      prop: 'nameCN',
      required: true,
      rules: [{required: true, message: '请输入资源名称', trigger: 'blur'}]
    }, {
      label: '链接',
      prop: 'urlCN',
      rules: [{validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'}]
    }, {
      label: '图片',
      prop: 'valueCN',
      required: true,
      rules: [{required: true, message: '请上传图片', trigger: 'blur'}],
      render(h, item, model) {
        return createUploadImg.call(this, h, {
          prop: 'valueCN',
          options: {
            action: config.IMG_UPLOAD_URL
          }
        }, model);
      }
    }]
  },
  {
    title: '繁體中文',
    items: [{
      label: '資源名稱',
      prop: 'nameHK',
      required: true,
      rules: [{required: true, message: '请输入资源名称', trigger: 'blur'}]
    }, {
      label: '链接',
      prop: 'urlHK',
      rules: [{validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'}]
    }, {
      label: '圖片',
      prop: 'valueHK',
      required: true,
      rules: [{required: true, message: '请上传图片', trigger: 'blur'}],
      render(h, item, model) {
        return createUploadImg.call(this, h, {
          prop: 'valueHK',
          options: {
            action: config.IMG_UPLOAD_URL
          }
        }, model);
      }
    }]
  },
  {
    title: 'English',
    items: [{
      label: 'Name',
      prop: 'nameEN',
      required: true,
      rules: [{required: true, message: '请输入资源名称', trigger: 'blur'}]
    }, {
      label: 'URL',
      prop: 'urlEN',
      rules: [{validator: validateContent, message: '链接必须带上协议号(http://或https://)', trigger: 'blur'}]
    }, {
      label: 'Image',
      prop: 'valueEN',
      required: true,
      rules: [{required: true, message: '请上传图片', trigger: 'blur'}],
      render(h, item, model) {
        return createUploadImg.call(this, h, {
          prop: 'valueEN',
          options: {
            action: config.IMG_UPLOAD_URL
          }
        }, model);
      }
    }]
  }
];

export default {
  search: [
    {
      label: '资源名称',
      prop: 'name'
    },
    {
      label: '资源类型',
      prop: 'type',
      type: 'select',
      options: {
        options: [{
          label: '大banner图',
          value: 'WEB_BANNER'
        }, {
          label: '小banner图',
          value: 'LINK_BANNER'
        }]
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
          authId: 'operation-resource-search'
        },
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'operation-resource-create'
        },
        {
          label: '删除',
          icon: 'el-icon-delete',
          type: 'danger',
          action: 'deleteSelection',
          authId: 'operation-resource-delete'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/common/admin/web/config/getList',
    delete: {
      url: '/v1/manage/common/admin/web/config/delete',
      method: 'post',
      isArray: true,
      deleteByKey: 'id'
    },
    checkbox: true,
    columns: [
      {
        label: '中文资源名称',
        width: 250,
        prop: 'nameCN'
      },
      {
        label: '繁体资源名称',
        width: 250,
        prop: 'nameHK'
      },
      {
        label: '英文资源名称',
        width: 250,
        prop: 'nameEN'
      },
      {
        label: '中文图片',
        width: 150,
        prop: 'valueCN',
        render(h, itme, model) {
          return h('img', {
            attrs: {
              'src': model.valueCN,
              'style': 'width: 50px;height: auto;'
            }
          });
        }
      },
      {
        label: '繁体图片',
        width: 150,
        prop: 'valueHK',
        render(h, itme, model) {
          return h('img', {
            attrs: {
              'src': model.valueHK,
              'style': 'width: 50px;height: auto;'
            }
          });
        }
      },
      {
        label: '英文图片',
        width: 150,
        prop: 'valueEN',
        render(h, itme, model) {
          return h('img', {
            attrs: {
              'src': model.valueEN,
              'style': 'width: 50px;height: auto;'
            }
          });
        }
      },
      {
        label: '资源类型',
        width: 150,
        prop: 'type',
        render(h, itme, model) {
          return model.type === 'WEB_BANNER' ? h('div', '大banner') : h('div', '小banner');
        }
      },
      {
        label: '背景色',
        width: 150,
        prop: 'backGroundC'
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
        width: 200,
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
                  action(model) {
                    if (model.url) {
                      const temp = 'http://';
                      const lastindex = model.url.lastIndexOf(temp);
                      if (lastindex > -1) {
                        model.url = model.url.substring(lastindex + temp.length);
                      }
                    }
                    this.openEditDialog(model);
                  },
                  authId: 'operation-resource-edit'
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
    title: '新建资源配置',
    saveURL: '/v1/manage/common/admin/web/config/create',
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(dialog) {
      dialog.options.items[dialog.options.items.length - 1].activeTab = '0';
    },
    items: [{
      label: '资源类型',
      prop: 'type',
      type: 'select',
      rules: [{required: true, message: '请选择资源类型', trigger: 'blur'}],
      options: {
        options: [{
          label: '大banner图',
          value: 'WEB_BANNER'
        }, {
          label: '小banner图',
          value: 'LINK_BANNER'
        }]
      }
    }, {
      label: '背景色',
      prop: 'backGroundC',
      rules: [{required: true, message: '请输入背景色', trigger: 'blur'}]
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      rules: [{required: true, message: '请排序', trigger: 'blur'}]
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      rules: [{required: true, message: '请排序', trigger: 'blur'}],
      options: {
        'active-text': '开启',
        'inactive-text': '关闭',
        'active-value': 1,
        'inactive-value': 0
      }
    },
    {
      prop: 'nameCN,nameHK,nameEN,urlCN,urlHK,urlEN,valueCN,valueHK,valueEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  },
  editDialog: {
    title: '编辑资源配置',
    saveURL: '/v1/manage/common/admin/web/config/update',
    unValidCall() {
      valideTabs.call(this, tabs);
    },
    onOpen(form) {
      this.dialog.edit.options.items[this.dialog.edit.options.items.length - 1].activeTab = '0';
    },
    items: [{
      label: '资源类型',
      prop: 'type',
      type: 'select',
      required: true,
      options: {
        options: [{
          label: '大banner图',
          value: 'WEB_BANNER'
        }, {
          label: '小banner图',
          value: 'LINK_BANNER'
        }]
      }
    }, {
      label: '背景色',
      prop: 'backGroundC',
      required: true
    }, {
      label: '排序',
      prop: 'sort',
      type: 'number',
      default: 1,
      required: true
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      required: true,
      options: {
        'active-text': '开启',
        'inactive-text': '关闭',
        'active-value': 1,
        'inactive-value': 0
      }
    },
    {
      prop: 'nameCN,nameHK,nameEN,urlCN,urlHK,urlEN,valueCN,valueHK,valueEN',
      activeTab: '0',
      labelWidth: '0',
      render(h, item, model) {
        return createTabs.call(this, h, item, tabs, model);
      }
    }]
  }
};
