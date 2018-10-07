import config from '@common/config';
import createActionList from '@common/create/element/action-list';
const statusDict = [
  {
    label: '启用',
    type: 'success',
    value: 2
  },
  {
    label: '禁用',
    type: 'danger',
    value: 1
  }
];

const mergeDepthData = [
  {
    label: '1',
    value: 0
  },
  {
    label: '0.1',
    value: 1
  },
  {
    label: '0.01',
    value: 2
  },
  {
    label: '0.001',
    value: 3
  },
  {
    label: '0.0001',
    value: 4
  },
  {
    label: '0.00001',
    value: 5
  },
  {
    label: '0.000001',
    value: 6
  },
  {
    label: '0.0000001',
    value: 7
  },
  {
    label: '0.00000001',
    value: 8
  }
];

const createOptions = (h) => {
  return mergeDepthData.map((item) => {
    return <el-option label={item.label} value={item.value}></el-option>;
  });
};

export default {
  remote: [
    {
      url: '/v1/manage/trade/coin/select',
      key: 'coinAll',
      default: []
    },
    {
      url: '/v1/manage/trade/area/select',
      key: 'tradeAreaAll',
      default: []
    }
  ],
  search: [
    // {
    //   label: '交易区域',
    //   prop: 'tradeAreaId',
    //   options: {
    //     placeholder: '交易区域',
    //     clearable: true
    //   },
    //   remote: {
    //     key: 'tradeAreaAll',
    //     labelField: 'name',
    //     valueField: 'id'
    //   }
    // },
    // {
    //   label: '状态',
    //   type: 'select',
    //   prop: 'status',
    //   options: {
    //     options: statusDict,
    //     clearable: true
    //   }
    // },
    {
      type: 'action-list',
      class: 'operation-action-list',
      actionList: [
        {
          label: '刷新',
          icon: 'el-icon-refresh',
          action: 'loadDataTable',
          authId: 'trade-symbol-config-search'
        },
        {
          label: '新增',
          icon: 'el-icon-edit',
          type: 'primary',
          action: 'openAddDialog',
          authId: 'trade-symbol-config-create'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/trade/symbol/list',
    status: {
      // change status 需要配置
      url: '/v1/manage/trade/symbol/edit',
      method: 'post',
      params(id, status) {
        return {
          id,
          status: status === 0 ? 2 : status
        };
      }
    },
    columns: [
      {
        label: '交易对ID',
        prop: 'id',
        width: 80,
        'class-name': 'wrap-normal'
      },
      {
        label: '交易对名称',
        prop: 'name',
        width: 150
      },
      {
        label: '交易对标识符',
        prop: 'symbol',
        width: 150
      },
      {
        label: '交易对标题',
        prop: 'title',
        minWidth: 200
      },
      {
        label: '交易对图标',
        prop: 'logo',
        width: 160,
        render(h, item, model) {
          return (
            <img src={model.logo} style="max-width:50px;max-height:50px;" />
          );
        }
      },
      {
        label: '开盘价',
        prop: 'initPrice',
        minWidth: 150
      },
      {
        label: '买入手续费',
        prop: 'buyFeeRate',
        minWidth: 150
      },
      {
        label: '卖出手续费',
        prop: 'sellFeeRate',
        minWidth: 150
      },
      {
        label: '排序',
        prop: 'sort',
        minWidth: 80
      },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 100,
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
                  authId: 'trade-symbol-config-edit'
                }
                // model.status === 2 ? {
                //   label: '禁用',
                //   size: 'small',
                //   type: 'danger',
                //   action: 'changeStatus'
                // } : {
                //   label: '启用',
                //   size: 'small',
                //   action: 'changeStatus'
                // }
              ]
            },
            model
          );
        },
        width: 180
      }
    ]
  },
  addDialog: {
    title: '新建配置',
    saveURL: '/v1/manage/trade/symbol/add',
    width: '800px',
    saveParams(model) {
      return {
        ...model,
        symbol: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join(''),
        name: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join('/'),
        title: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join('/')
      };
    },
    items: [
      {
        label: '交易区域',
        prop: 'areaId',
        type: 'select',
        rules: [{ required: true, message: '请选择交易区域', trigger: 'blur' }],
        remote: {
          key: 'tradeAreaAll',
          labelField: 'name',
          valueField: 'id'
        }
      },
      {
        label: '报价货币',
        prop: 'quoteCoinId',
        type: 'select',
        rules: [{ required: true, message: '请选择报价货币', trigger: 'blur' }],
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        }
      },
      {
        label: '基础货币',
        prop: 'baseCoinId',
        type: 'select',
        rules: [{ required: true, message: '请选择基础货币', trigger: 'blur' }],
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        }
      },
      {
        label: 'Logo',
        prop: 'logo',
        type: 'upload-image',
        options: {
          action: config.IMG_UPLOAD_URL
        }
      },
      {
        label: '开盘价',
        prop: 'initPrice',
        type: 'number',
        default: 1,
        rules: [{ required: true, message: '请输入开盘价', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        default: 1,
        rules: [{ required: true, message: '请选择排序', trigger: 'blur' }]
      },
      {
        label: '状态',
        prop: 'status',
        type: 'switch',
        default: 2,
        options: {
          'active-value': 2,
          'inactive-value': 1,
          'active-text': '启用',
          'inactive-text': '禁用'
        }
      },
      {
        label: '是否参与挖矿',
        prop: 'miningStatus',
        type: 'switch',
        default: 1,
        options: {
          'active-value': 2,
          'inactive-value': 1,
          'active-text': '参与',
          'inactive-text': '不参与'
        }
      },
      {
        label: '买入手续费',
        prop: 'buyFeeRate',
        type: 'number',
        default: 0.002,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择买入手续费', trigger: 'blur' }
        ]
      },
      {
        label: '卖出手续费',
        prop: 'sellFeeRate',
        type: 'number',
        default: 0.002,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择卖出手续费', trigger: 'blur' }
        ]
      },
      {
        label: '价格小数位数',
        prop: 'priceDigits',
        type: 'number',
        default: 2,
        rules: [{ required: true, message: '请选择排序', trigger: 'blur' }],
        options: {
          min: 2,
          max: 8
        }
      },
      {
        label: '合并深度',
        prop: 'step0Digits,step1Digits,step2Digits',
        default: 2,
        render (h, item, model) {
          return [
            <el-select style="width: 150px;margin-right: 20px;" value={model.step0Digits} on-input={(value) => (model.step0Digits = value)}>
              {createOptions(h)}
            </el-select>,
            <el-select style="width: 150px;margin-right: 20px;" value={model.step1Digits} on-input={(value) => (model.step1Digits = value)}>
              {createOptions(h)}
            </el-select>,
            <el-select style="width: 150px;margin-right: 20px;" value={model.step2Digits} on-input={(value) => (model.step2Digits = value)}>
              {createOptions(h)}
            </el-select>
          ];
        }
      },
      {
        label: '数量小数位数',
        prop: 'volumeDigits',
        type: 'number',
        default: 2,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择数量小数位数', trigger: 'blur' }
        ]
      },
      {
        label: '最小委托',
        prop: 'volumeMin',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [{ required: true, message: '请选择最小委托', trigger: 'blur' }]
      },
      {
        label: '最大委托',
        prop: 'volumeMax',
        type: 'number',
        options: {
          min: 0
        },
        default: 0,
        rules: [{ required: true, message: '请选择最大委托', trigger: 'blur' }]
      },
      {
        label: '最小成交额',
        prop: 'amountMin',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择最小成交额', trigger: 'blur' }
        ]
      },
      {
        label: '最大成交额',
        prop: 'amountMax',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择最大成交额', trigger: 'blur' }
        ]
      }
    ]
  },
  editDialog: {
    title: '编辑配置',
    saveURL: '/v1/manage/trade/symbol/edit',
    saveParams (model) {
      const params = {
        ...model
      };
      ['createTime', 'createTimeStr', 'updateTime', 'updateTimeStr', 'stepDigitses'].forEach((prop) => {
        delete params[prop];
      });
      return {
        ...params,
        symbol: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join(''),
        name: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join('/'),
        title: [this.getCoinName(model.baseCoinId), this.getCoinName(model.quoteCoinId)].join('/')
      };
    },
    width: '800px',
    items: [
      {
        label: '交易区域',
        prop: 'areaId',
        type: 'select',
        rules: [{ required: true, message: '请选择交易区域', trigger: 'blur' }],
        remote: {
          key: 'tradeAreaAll',
          labelField: 'name',
          valueField: 'id'
        },
        options: {
          disabled: true
        }
      },
      {
        label: '报价货币',
        prop: 'quoteCoinId',
        type: 'select',
        rules: [{ required: true, message: '请选择报价货币', trigger: 'blur' }],
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        },
        options: {
          disabled: true
        }
      },
      {
        label: '基础货币',
        prop: 'baseCoinId',
        type: 'select',
        rules: [{ required: true, message: '请选择基础货币', trigger: 'blur' }],
        remote: {
          key: 'coinAll',
          labelField: 'name',
          valueField: 'id'
        },
        options: {
          disabled: true
        }
      },
      {
        label: 'Logo',
        prop: 'logo',
        type: 'upload-image',
        options: {
          action: config.IMG_UPLOAD_URL
        }
      },
      {
        label: '开盘价',
        prop: 'initPrice',
        type: 'number',
        default: 1,
        rules: [{ required: true, message: '请输入开盘价', trigger: 'blur' }]
      },
      {
        label: '排序',
        prop: 'sort',
        type: 'number',
        default: 1,
        rules: [{ required: true, message: '请选择排序', trigger: 'blur' }]
      },
      {
        label: '状态',
        prop: 'status',
        type: 'switch',
        default: 2,
        options: {
          'active-value': 2,
          'inactive-value': 1,
          'active-text': '启用',
          'inactive-text': '禁用'
        }
      },
      {
        label: '是否参与挖矿',
        prop: 'miningStatus',
        type: 'switch',
        default: 1,
        options: {
          'active-value': 2,
          'inactive-value': 1,
          'active-text': '参与',
          'inactive-text': '不参与'
        }
      },
      {
        label: '买入手续费',
        prop: 'buyFeeRate',
        type: 'number',
        default: 1,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择买入手续费', trigger: 'blur' }
        ]
      },
      {
        label: '卖出手续费',
        prop: 'sellFeeRate',
        type: 'number',
        default: 1,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择卖出手续费', trigger: 'blur' }
        ]
      },
      {
        label: '价格小数位数',
        prop: 'priceDigits',
        type: 'number',
        default: 2,
        rules: [{ required: true, message: '请选择排序', trigger: 'blur' }],
        options: {
          min: 2,
          max: 8
        }
      },
      {
        label: '合并深度',
        prop: 'step0Digits,step1Digits,step2Digits',
        default: 2,
        render(h, item, model) {
          return [
            <el-select style="width: 150px; margin-right: 20px;" value={model.step0Digits} on-input={(value) => (model.step0Digits = value)}>
              {createOptions(h)}
            </el-select>,
            <el-select style="width: 150px; margin-right: 20px;" value={model.step1Digits} on-input={(value) => (model.step1Digits = value)}>
              {createOptions(h)}
            </el-select>,
            <el-select style="width: 150px; margin-right: 20px;" value={model.step2Digits} on-input={(value) => (model.step2Digits = value)}>
              {createOptions(h)}
            </el-select>
          ];
        }
      },
      {
        label: '数量小数位数',
        prop: 'volumeDigits',
        type: 'number',
        default: 2,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择数量小数位数', trigger: 'blur' }
        ]
      },
      {
        label: '最小委托',
        prop: 'volumeMin',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [{ required: true, message: '请选择最小委托', trigger: 'blur' }]
      },
      {
        label: '最大委托',
        prop: 'volumeMax',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [{ required: true, message: '请选择最大委托', trigger: 'blur' }]
      },
      {
        label: '最小成交额',
        prop: 'amountMin',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择最小成交额', trigger: 'blur' }
        ]
      },
      {
        label: '最大成交额',
        prop: 'amountMax',
        type: 'number',
        default: 0,
        options: {
          min: 0
        },
        rules: [
          { required: true, message: '请选择最大成交额', trigger: 'blur' }
        ]
      }
    ]
  },
  actions: {
    getCoinName (id) {
      const coinList = this.remote.coinAll;
      for (let i = 0; i < coinList.length; i++) {
        if (coinList[i].id === id) return coinList[i].name;
      }
      return '';
    }
  }
};
