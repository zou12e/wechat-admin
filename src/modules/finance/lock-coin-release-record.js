const rechargeDict = [{
  label: '新增锁仓',
  type: 'success',
  value: '新增锁仓'
}, {
  label: '撤销锁仓',
  type: 'danger',
  value: '撤销锁仓'
}];
const selectRechargeDict = [{
  label: '已释放',
  type: 'success',
  value: 2
}, {
  label: '已销毁',
  type: 'danger',
  value: 3
}];
const coinTypeDict = [{
  label: 'WT',
  value: 'WT'
}];

export default {
  remote: [
    {
      url: '/v1/manage/user/wt/queryWtProductList',
      key: 'WtProductList',
      default: []
    },
    {
      url: '/v1/manage/user/wt/sys/queryDetail/sum',
      key: 'summaryVolume',
      lazy: true,
      default: []
    }
  ],
  search: [
    {
      label: '用户名',
      prop: 'username'
    }, {
      label: '币种',
      type: 'select',
      options: {
        options: coinTypeDict,
        clearable: true
      },
      prop: 'coinType'
    }, {
      label: '锁仓类型',
      type: 'select',
      remote: {
        key: 'WtProductList',
        labelField: 'name',
        valueField: 'id'
      },
      options: {
        clearable: true
      },
      prop: 'wtProductId'
    }, {
      label: '变动类型',
      type: 'select',
      options: {
        options: selectRechargeDict,
        clearable: true
      },
      prop: 'status'
    }, {
      label: '创建时间',
      type: 'date-range',
      prop: 'startCreateDate,endCreateDate',
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
          authId: 'finance-lock-coin-release-record-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/user/wt/sys/queryDetail?detailType=2',
    loadData(params) {
      this.loadRemoteData('summaryVolume', {
        detailType: 2,
        ...params
      });
    },
    renderFooter (data) {
      const volume = this.remote.summaryVolume;
      let pageTotal = 0;
      data.map((item) => {
        pageTotal += item.volume;
      });
      return <div style='margin-top: 10px;position: absolute;left: 0;width: 70%;bottom: 20px;'><span style='display: inline-block;margin-right:20px;'>汇总发放量：{volume}</span><span>当前页面发放量：{pageTotal}</span></div>;
    },
    columns: [
      {
        label: '用户名',
        prop: 'userName',
        minWidth: 180
      }, {
        label: '姓名',
        minWidth: 180,
        prop: 'realName'
      }, {
        label: '会员ID',
        minWidth: 200,
        prop: 'inviteCode'
      }, {
        label: '币种',
        prop: 'coinType',
        minWidth: 150
      }, {
        label: '锁仓类型',
        minWidth: 150,
        prop: 'wtProductName'
      }, {
        label: '变动类型',
        prop: 'changeTypeName',
        type: 'tag',
        dict: rechargeDict,
        minWidth: 140
      }, {
        label: '数量',
        minWidth: 140,
        prop: 'volume'
      }, {
        label: '创建时间',
        prop: 'createTime',
        minWidth: 200
      }, {
        label: '备注',
        minWidth: 150,
        prop: 'remark'
      }
    ]
  }
};
