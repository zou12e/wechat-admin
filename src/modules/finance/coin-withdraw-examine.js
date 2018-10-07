import createActionList from '@common/create/element/action-list';
import dayjs from 'dayjs';
const statusDict = [{
  label: '审核中',
  type: 'danger',
  value: 1
}, {
  label: '撤销',
  type: 'info',
  value: 2
}, {
  label: '打币中',
  type: 'success',
  value: 3
}, {
  label: '拒绝',
  type: 'info',
  value: 4
}, {
  label: '打币失败',
  type: 'warning',
  value: 5
}, {
  label: '提币成功',
  type: 'primary',
  value: 6
}];
export default {
  remote: [{
    url: '/v1/manage/trade/coin/select',
    key: 'coin',
    default: []
  }],
  search: [
    {
      label: '会员ID',
      prop: 'inviteCode'
    }, {
      label: '用户名',
      prop: 'userName'
    }, {
      label: '手机号码',
      prop: 'mobile'
    }, {
      label: '币种',
      prop: 'coinId',
      type: 'select',
      remote: {
        key: 'coin',
        labelField: 'name',
        valueField: 'id'
      }
    }, {
      label: '状态',
      prop: 'status',
      type: 'select',
      default: 1,
      options: {
        options: statusDict
      }
    }, {
      label: '提现金额',
      prop: 'startBalance,endBalance',
      render(h, item, model) {
        return (
          <el-row>
            <el-col style='margin:0' span={11}>
              <el-input style="width:100%;" value={this.startBalance} onInput={(e) => this.handlderInput('startBalance', e)} clearable></el-input>
            </el-col>
            <el-col style="margin:0;textAlign:center" span={2}>-</el-col>
            <el-col style='margin:0' span={11}>
              <el-input min="0" style="width:100%;" value={this.endBalance} onInput={(e) => this.handlderInput('endBalance', e)} clearable></el-input>
            </el-col>
          </el-row>
        );
      }
    }, {
      label: '时间',
      prop: 'startTime,endTime',
      type: 'date-range',
      default: [dayjs().subtract(7, 'day').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD')],
      options: {
        'value-format': 'yyyy-MM-dd'
      }
    }, {
      type: 'action-list',
      calss: 'operation-action-list',
      actionList: [
        {
          label: '搜索',
          icon: 'el-icon-search',
          action: 'loadDataTable',
          authId: 'finance-coin-withdraw-examine-search'
        }
      // , {
      //   label: '导出',
      //   icon: 'el-icon-download',
      //   type: 'primary',
      //   action: 'exportExcel'
      // }
      ]
    }
  ],
  actions: {
    handlderInput(prop, value) {
      this.searchForm[prop] = value;
    }
  },
  dataTable: {
    loadURL: '/v1/manage/assets/record/list?type=4',
    exportURL: '/coin_withdraw/exportList',
    exportFileName: '数字货币提现审核',
    columns: [
      {
        label: 'ID',
        width: 200,
        prop: 'id'
      }, {
        label: '会员ID',
        width: 150,
        prop: 'inviteCode'
      }, {
        label: '用户名',
        width: 150,
        prop: 'userName'
      }, {
        label: '手机号码',
        width: 120,
        prop: 'mobile'
      }, {
        label: '邮箱',
        prop: 'email'
      }, {
        label: '币种名称',
        width: 150,
        prop: 'coinName'
      }, {
        label: '提现量',
        width: 150,
        prop: 'balance'
      }, {
        label: '手续费',
        width: 150,
        prop: 'fee'
      }, {
        label: '实际提现',
        width: 150,
        prop: 'realBalance'
      }, {
        label: '钱包地址',
        width: 250,
        prop: 'receiverAddress'
      }, {
        label: '交易ID',
        width: 180,
        prop: 'txId'
      }, {
        label: '申请时间',
        width: 180,
        prop: 'createTimeStr'
      }, {
        label: '审核时间',
        width: 180,
        prop: 'updateTimeStr'
      }, {
        label: '状态',
        prop: 'status',
        width: 100,
        type: 'tag',
        dict: statusDict
      }, {
        label: '审核备注',
        width: 200,
        prop: 'adminComment'
      }, {
        label: '操作',
        width: 120,
        fixed: 'right',
        render (h, item, model) {
          if (model.status === 1) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [
                  {
                    label: '审核',
                    type: 'primary',
                    size: 'small',
                    icon: 'el-icon-edit',
                    action (model) {
                      const id = model.id;
                      this.openDialog('check', {adminComment: '', id, status});
                    },
                    authId: 'finance-coin-withdraw-examine-edit'
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
  dialogs: [{
    key: 'check',
    title: '审核提示',
    items: [{
      label: '审核备注',
      rules: [{
        required: true,
        message: '请输入备注原因'
      }],
      prop: 'adminComment'
    }],
    actionList: [{
      label: '拒绝',
      action(model) {
        if (model.adminComment && model.adminComment !== '') {
          model.status = 4;
          this.$http.post('/v1/manage/assets/withdraw/examine', model).then(res => {
            this.closeDialog('check');
            this.loadDataTable(this.table.page);
            this.$message.success('操作成功');
          });
        } else {
          this.$message.error('请输入备注原因');
        }
      }
    }, {
      label: '通过',
      type: 'primary',
      action(model) {
        model.status = 3;
        this.$http.post('/v1/manage/assets/withdraw/examine', model).then(res => {
          this.closeDialog('check');
          this.loadDataTable(this.table.page);
          this.$message.success('操作成功');
        });
      }
    }]
  }]
};
