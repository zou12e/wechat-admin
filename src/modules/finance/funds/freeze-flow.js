import dayjs from 'dayjs';
import { scienceNumber } from '@common/utils/filters';

const directionDict = {
  1: '入账',
  2: '出账'
};

const StatementType = {
  1: '充值完成',
  2: '提现申请',
  3: '提现取消/拒绝',
  4: '提现完成',
  5: 'OTC 划转',
  6: '新增订单',
  7: '取消订单',
  8: '成交',
  9: '管理员收取手续费',
  10: '手续费挖矿',
  11: '手续费分红',
  12: '后台充值',
  13: '机器人购买'
};
export default {
  remote: [
    {
      url: '/v1/manage/trade/coin/select',
      key: 'coinAll',
      default: []
    }
  ],
  search: [
    {
      label: '会员ID',
      prop: 'inviteCode',
      options: {
        placeholder: '会员ID',
        clearable: true
      }
    },
    {
      label: '用户名',
      prop: 'userName',
      options: {
        placeholder: '用户名',
        clearable: true
      }
    },
    {
      label: '手机号码',
      prop: 'mobile',
      options: {
        placeholder: '手机号码',
        clearable: true
      }
    },
    {
      label: '邮箱',
      prop: 'email'
    },
    {
      label: '币种',
      prop: 'coinId',
      type: 'select',
      remote: {
        key: 'coinAll',
        labelField: 'name',
        valueField: 'id'
      },
      options: {
        clearable: true
      }
    },
    {
      label: '金额',
      prop: 'startBalance,endBalance',
      render(h, item, model) {
        return [
          <el-input
            style="width: 150px"
            value={model.startBalance}
            on-input={value =>
              (model.startBalance = value ? Number(value) : '')
            }
            placeholder="最小金额"
            clearable
          />,
          <span style="margin-left: 10px; margin-right: 10px;">-</span>,
          <el-input
            style="width: 150px"
            value={model.endBalance}
            onInput={value => (model.endBalance = value ? Number(value) : '')}
            placeholder="最大金额"
            clearable
          />
        ];
      }
    },
    {
      label: '时间',
      type: 'date-range',
      prop: 'startTime,endTime',
      default: [
        dayjs()
          .subtract(7, 'day')
          .format('YYYY-MM-DD'),
        dayjs().format('YYYY-MM-DD')
      ],
      options: {
        valueFormat: 'yyyy-MM-dd',
        'start-placeholder': '开始日期',
        'end-placeholder': '结束日期',
        clearable: true
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
          authId: 'finance-funds-freeze-flow-search'
        }
        // {
        //   label: '导出',
        //   icon: 'el-icon-edit',
        //   type: 'primary',
        //   action: 'exportExcel'
        // }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/assets/frozen/list',
    // exportURL: '/account/detail/exportList',
    // exportFileName: '资金流水',
    columns: [
      {
        label: 'ID',
        prop: 'id',
        minWidth: 180
      },
      {
        label: '会员ID',
        prop: 'inviteCode',
        minWidth: 150
      },
      {
        label: '用户名',
        prop: 'userName',
        minWidth: 120
      },
      {
        label: '手机号码',
        prop: 'mobile',
        minWidth: 150
      },
      {
        label: '币种名称',
        prop: 'coinName',
        minWidth: 100
      },
      {
        label: '金额',
        prop: 'balance',
        minWidth: 150,
        formatter(value) {
          return scienceNumber(Math.abs(value));
        }
      },
      {
        label: '收付类型',
        prop: 'balance',
        minWidth: 100,
        formatter(value) {
          return directionDict[value > 0 ? 1 : 2];
        }
      },
      {
        label: '业务类型',
        prop: 'type',
        minWidth: 200,
        'class-name': 'wrap-normal',
        formatter(value) {
          return StatementType[value];
        }
      },
      {
        label: '关联订单号',
        prop: 'refId',
        minWidth: 200,
        'class-name': 'wrap-normal'
      },
      {
        label: '发生时间',
        prop: 'createTimeStr',
        minWidth: 180
      }
      // {
      //   label: '备注',
      //   prop: 'adminComment',
      //   width: 180,
      //   'class-name': 'wrap-normal'
      // }
    ]
  }
};
