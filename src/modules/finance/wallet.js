// const typeDict = [
//   {
//     label: '全部',
//     type: 'info',
//     value: ''
//   },
//   {
//     label: '收款钱包',
//     type: 'success',
//     value: 1
//   },
//   {
//     label: '打款钱包',
//     type: 'danger',
//     value: 2
//   },
//   {
//     label: '手续费钱包',
//     type: 'warning',
//     value: 3
//   }
// ];
// const typeList = {
//   1: '收款钱包',
//   2: '打款钱包',
//   3: '手续费钱包'
// };
export default {
  // remote: [
  //   {
  //     url: '/coin/all?status=1',
  //     key: 'coinAll',
  //     default: []
  //   }
  // ],
  search: [
    // {
    //   label: '币种',
    //   prop: 'coinId',
    //   type: 'select',
    //   remote: {
    //     key: 'coinAll',
    //     labelField: 'name',
    //     valueField: 'id'
    //   },
    //   options: {
    //     clearable: true
    //   }
    // },
    // {
    //   label: '类型',
    //   prop: 'type',
    //   type: 'select',
    //   options: {
    //     clearable: true,
    //     options: typeDict
    //   }
    // },
    // {
    //   type: 'action-list',
    //   class: 'operation-action-list',
    //   actionList: [
    //     {
    //       label: '搜索',
    //       icon: 'el-icon-search',
    //       action: 'loadDataTable'
    //     }
    //   ]
    // }
  ],
  dataTable: {
    loadURL: '/v1/manage/assets/wallet/list',
    page: false,
    columns: [
      {
        label: '币种',
        prop: 'coinName',
        width: 100
      },
      {
        label: '类型',
        prop: 'coinType',
        width: 100
      },
      {
        label: '归账余额',
        prop: 'collectAccountBalance'
      },
      {
        label: '打款余额',
        prop: 'loanAccountBalance'
      },
      {
        label: '手续费',
        prop: 'feeAccountBalance'
      }
    ]
  }
};
