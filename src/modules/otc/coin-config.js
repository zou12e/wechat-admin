import createActionList from '@common/create/element/action-list';
const statusDict = [
  {
    label: '显示',
    type: 'success',
    value: 1
  },
  {
    label: '隐藏',
    type: 'danger',
    value: 2
  }
];
export default {
  remote: [
    {
      url: '/v1/manage/common/coin/external/getCoinAll',
      method: 'post',
      key: 'coinAll',
      default: []
    }
  ],
  search: [
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '新建',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'otc-coin-config-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcCoinCoinfig/sys/query',
    status: {
      url: '/v1/manage/otc/otcCoinCoinfig/sys/updateStatus',
      method: 'post',
      params(id, status) {
        if (status === 0) {
          status = 2;
        }
        return {
          id,
          status
        };
      }
    },
    columns: [
      {
        label: '币种',
        prop: 'name',
        minWidth: 150
      },
      {
        label: '排序',
        prop: 'sort',
        minWidth: 150
      },
      {
        label: '买入手续费',
        prop: 'buyFee',
        minWidth: 150,
        formatter(value) {
          return value * 100 + '%';
        }
      },
      {
        label: '卖出手续费',
        prop: 'sellFee',
        minWidth: 150,
        formatter(value) {
          return value * 100 + '%';
        }
      },
      {
        label: '创建时间',
        prop: 'created',
        minWidth: 200
      },
      {
        label: '解除时间',
        prop: 'lastUpdateTime',
        minWidth: 200
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        dict: statusDict
      },
      {
        label: '操作',
        fixed: 'right',
        minWidth: 180,
        render(h, item, model) {
          if (model.status === 1 || model.status === 2) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  model.status === 2
                    ? {
                      label: '显示',
                      size: 'small',
                      type: 'danger',
                      action: 'changeStatus',
                      authId: 'otc-coin-config-status'
                    } : {
                      label: '隐藏',
                      size: 'small',
                      action: 'changeStatus',
                      authId: 'otc-coin-config-status'
                    },
                  {
                    label: '编辑',
                    type: 'primary',
                    size: 'small',
                    icon: 'el-icon-edit',
                    action: 'openEditDialog',
                    authId: 'otc-coin-config-edit'
                  }
                ]
              },
              model
            );
          }
        }
      }
    ]
  },
  addDialog: {
    title: '新增币种',
    saveURL: '/v1/manage/otc/otcCoinCoinfig/sys/add',
    width: '500px',
    saveParams(model) {
      return {
        ...model,
        name: this.coinLabel
      };
    },
    items: [
      {
        label: '选择币种',
        type: 'select',
        prop: 'id',
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        },
        listeners: {
          input(value, options) {
            const res = options.filter(res => {
              if (res.id === value) return res;
            });
            this.coinLabel = res[0].label;
          }
        },
        rules: [{ required: true, message: '请选择币种', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        options: {
          min: 0
        },
        default: 1,
        rules: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      {
        label: '买入手续费',
        type: 'number',
        prop: 'buyFee',
        default: 1,
        options: {
          min: 0,
          max: 1,
          step: 0.001
        },
        rules: [
          { required: true, message: '请输入买入手续费', trigger: 'blur' }
        ]
      },
      {
        label: '卖出手续费',
        type: 'number',
        prop: 'sellFee',
        default: 1,
        options: {
          min: 0,
          max: 1,
          step: 0.001
        },
        rules: [
          { required: true, message: '请输入卖出手续费', trigger: 'blur' }
        ]
      },
      {
        label: '广告最小量',
        type: 'number',
        prop: 'volumeMin',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入广告最小量', trigger: 'blur' }
        ]
      },
      {
        label: '广告最大量',
        type: 'number',
        prop: 'volumeMax',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入广告最大量', trigger: 'blur' }
        ]
      },
      {
        label: '单日总发布量',
        type: 'number',
        prop: 'volumeDaySum',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入单日总发布量', trigger: 'blur' }
        ]
      },
      {
        label: '数量小数位数',
        type: 'number',
        prop: 'volumeScale',
        default: 2,
        options: {
          min: 0,
          max: 8
        },
        rules: [
          { required: true, message: '请输入数量小数位数', trigger: 'blur' }
        ]
      },
      {
        label: '划转至币币',
        prop: 'isCoinStatus',
        type: 'switch',
        default: 1,
        options: {
          'active-value': 1,
          'inactive-value': 0,
          'active-text': '开启',
          'inactive-text': '关闭'
        }
      }
    ]
  },
  editDialog: {
    title: '编辑币种',
    saveURL: '/v1/manage/otc/otcCoinCoinfig/sys/update',
    width: '500px',
    saveParams(model) {
      return {
        ...model
      };
    },
    items: [
      {
        label: '选择币种',
        type: 'select',
        prop: 'id',
        options: {
          disabled: true
        },
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        },
        rules: [{ required: true, message: '请选择币种', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        options: {
          min: 0
        },
        default: 1,
        rules: [{ required: true, message: '请输入排序', trigger: 'blur' }]
      },
      {
        label: '买入手续费',
        type: 'number',
        prop: 'buyFee',
        default: 1,
        options: {
          min: 0,
          max: 1,
          step: 0.001
        },
        rules: [
          { required: true, message: '请输入买入手续费', trigger: 'blur' }
        ]
      },
      {
        label: '卖出手续费',
        type: 'number',
        prop: 'sellFee',
        default: 1,
        options: {
          min: 0,
          max: 1,
          step: 0.001
        },
        rules: [
          { required: true, message: '请输入卖出手续费', trigger: 'blur' }
        ]
      },
      {
        label: '广告最小量',
        type: 'number',
        prop: 'volumeMin',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入广告最小量', trigger: 'blur' }
        ]
      },
      {
        label: '广告最大量',
        type: 'number',
        prop: 'volumeMax',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入广告最大量', trigger: 'blur' }
        ]
      },
      {
        label: '单日总发布量',
        type: 'number',
        prop: 'volumeDaySum',
        options: {
          min: 1
        },
        rules: [
          { required: true, message: '请输入单日总发布量', trigger: 'blur' }
        ]
      },
      {
        label: '数量小数位数',
        type: 'number',
        prop: 'volumeScale',
        default: 2,
        options: {
          min: 0,
          max: 8
        },
        rules: [
          { required: true, message: '请输入数量小数位数', trigger: 'blur' }
        ]
      },
      {
        label: '划转至币币',
        prop: 'isCoinStatus',
        type: 'switch',
        default: 1,
        options: {
          'active-value': 1,
          'inactive-value': 0,
          'active-text': '开启',
          'inactive-text': '关闭'
        }
      }
    ]
  }
};
