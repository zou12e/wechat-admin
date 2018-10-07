import createActionList from '@common/create/element/action-list';
const statusDict = [{
  label: '启用',
  type: 'success',
  value: 2
}, {
  label: '禁用',
  type: 'danger',
  value: 1
}];
const rechargeFlagDict = [{
  label: '开启',
  type: 'success',
  value: 1
}, {
  label: '关闭',
  type: 'danger',
  value: 0
}];
const withdrawFlagDict = [{
  label: '开启',
  type: 'success',
  value: 1
}, {
  label: '关闭',
  type: 'danger',
  value: 0
}];

export default {
  // search: [
  //   {
  //     type: 'action-list',
  //     class: 'operation-action-list',
  //     actionList: [
  //       {
  //         label: '搜索',
  //         icon: 'el-icon-search',
  //         action: 'loadDataTable'
  //       }
  //     ]
  //   }
  // ],
  editDialog: {
    title: '编辑币种信息',
    top: '100px',
    saveURL: '/v1/manage/trade/coin/edit',
    saveParams (form) {
      delete form.updateTime;
      delete form.updateTimeStr;
      delete form.createTime;
      delete form.createTimeStr;
      return form;
    },
    items: [{
      label: 'ID',
      prop: 'id',
      options: {
        disabled: true
      }
    }, {
      label: '币种名称',
      prop: 'name',
      options: {
        disabled: true
      }
    }, {
      label: '标题',
      prop: 'title',
      options: {
        disabled: true
      }
    }, {
      label: '币种logo',
      prop: 'logo',
      type: 'img',
      options: {
        disabled: true
      }
    }, {
      label: '小数位',
      prop: 'digits',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '提现手续费率',
      prop: 'withdrawFeeRate',
      type: 'number',
      options: {
        min: 0,
        step: 0.001
      }
    }, {
      label: '最低提现手续费',
      prop: 'withdrawFeeMin',
      type: 'number',
      options: {
        min: 0,
        step: 0.001
      }
    }, {
      label: '当日最大提现额',
      prop: 'withdrawDayMax',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '单笔最大提现额',
      prop: 'withdrawSigleMax',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '单笔最小提现额',
      prop: 'withdrawSigleMin',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '提现最小单位',
      prop: 'withdrawUnit',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '最小分红额',
      prop: 'bonusMin',
      type: 'number',
      options: {
        min: 0
      }
    }, {
      label: '充值状态',
      prop: 'depositFlag',
      type: 'switch',
      options: {
        inactiveValue: 0,
        activeValue: 1
      }
    }, {
      label: '提币状态',
      prop: 'withdrawFlag',
      type: 'switch',
      options: {
        inactiveValue: 0,
        activeValue: 1
      }
    }, {
      label: '是否划转到 OTC',
      prop: 'transferOTCFlag',
      type: 'switch',
      options: {
        inactiveValue: 0,
        activeValue: 1
      }
    }, {
      label: '状态',
      prop: 'status',
      type: 'switch',
      options: {
        inactiveValue: 1,
        activeValue: 2
      }
    }]
  },
  dataTable: {
    loadURL: '/v1/manage/trade/coin/list',
    status: {
      // change status 需要配置
      url: '/v1/manage/trade/coin/edit',
      method: 'post',
      params(id, status) {
        return {
          id,
          status: status === 0 ? 2 : 1
        };
      }
    },
    columns: [
      {
        label: 'ID',
        prop: 'id',
        width: 100,
        'class-name': 'wrap-normal'
      },
      {
        label: '币种名称',
        prop: 'name',
        minWidth: 100
      },
      {
        label: '标题',
        prop: 'title',
        minWidth: 200
      },
      {
        label: '币种Logo',
        prop: 'logo',
        minWidth: 100,
        render(h, item, model) {
          return model.logo ? (
            <img src={model.logo} style="width:50px;max-height:100px" />
          ) : null;
        }
      },
      // {
      //   label: '类型',
      //   prop: 'type',
      //   width: 100
      // },
      // {
      //   label: '钱包类型',
      //   prop: 'wallet',
      //   width: 100,
      //   formatter(value) {
      //     const res = walletTypeDict.find(item => item.value === value);
      //     return res ? res.label : value;
      //   }
      // },
      {
        label: '状态',
        prop: 'status',
        type: 'tag',
        minWidth: 100,
        dict: statusDict
      },
      {
        label: '充值状态',
        prop: 'depositFlag',
        type: 'tag',
        minWidth: 100,
        dict: rechargeFlagDict
      },
      {
        label: '提币状态',
        prop: 'withdrawFlag',
        type: 'tag',
        minWidth: 100,
        dict: withdrawFlagDict
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
                  authId: 'trade-coin-config-edit'
                }
                // model.status === 1
                //   ? {
                //     label: '启用',
                //     size: 'small',
                //     type: 'danger',
                //     action: 'changeStatus'
                //   } : {
                //     label: '禁用',
                //     size: 'small',
                //     action: 'changeStatus'
                //   }
              ]
            },
            model
          );
        },
        width: 180
      }
    ]
  }
};
