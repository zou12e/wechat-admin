import createActionList from '@common/create/element/action-list';
import { date } from '@common/utils/filters';
import UserModel from '@common/models/user';
// 待审核商家
const statusDict = [{
  label: '待审核',
  type: 'danger',
  value: 0
}, {
  label: '已拒绝',
  type: 'info',
  value: 2
}];
export default {
  search: [
    {
      label: '商家名称',
      prop: 'merchantName'
    },
    {
      label: '商家状态',
      type: 'select',
      prop: 'status',
      options: {
        options: statusDict
      }
    },
    {
      label: '创建时间',
      prop: 'createStartTime,createEndTime',
      type: 'date-range',
      default: [date(new Date(new Date().getTime() - 7 * 24 * 3600000)), date(new Date())],
      options: {
        valueFormat: 'yyyy-MM-dd'
      }
    },
    {
      label: '更新时间',
      prop: 'updateStartTime,updateEndTime',
      type: 'date-range',
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
          authId: 'otc-merchant-audit-search'
        }
      ]
    }
  ],
  dataTable: {
    loadURL: '/v1/manage/otc/otcMerchantApply/sys/query',
    exportURL: '/v1/manage/user/manager/exportList',
    exportFileName: '待审核商家列表',
    columns: [
      {
        label: '商家名称',
        minWidth: 180,
        prop: 'merchantName'
      }, {
        label: '会员昵称',
        minWidth: 180,
        prop: 'vipNickName'
      }, {
        label: '商家保证金',
        minWidth: 150,
        prop: 'bailDesc'
      }, {
        label: '图片资料',
        minWidth: 150,
        type: 'img',
        prop: 'imageUrl',
        options: {
          width: '50',
          height: '50'
        }
      }, {
        label: '视频资料',
        minWidth: 150,
        prop: 'videoUrl',
        render(h, item, model) {
          return h('a', {
            style: 'height: 50px',
            attrs: {
              target: 'new',
              href: model['videoUrl']
            }
          }, model['videoUrl']);
        }
      }, {
        label: '申请时间',
        width: 200,
        prop: 'created'
      }, {
        label: '创建时间',
        width: 200,
        prop: 'created'
      }, {
        label: '更新时间',
        width: 200,
        prop: 'lastUpdateTime'
      }, {
        label: '审核状态',
        prop: 'status',
        type: 'tag',
        width: 150,
        dict: statusDict
      }, {
        label: '备注',
        minWidth: 200,
        prop: 'remark'
      }, {
        label: '操作',
        width: 100,
        fixed: 'right',
        render(h, item, model) {
          if (model.status === 0) {
            return createActionList.call(
              this,
              h,
              {
                actionList: [{
                  label: '审核',
                  type: 'primary',
                  size: 'small',
                  icon: 'el-icon-edit',
                  action(model) {
                    const id = model.id;
                    this.openDialog('check', { remark: '', id, status });
                  },
                  authId: ''
                }]
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
    title: '商家审核',
    items: [{
      label: '审核备注',
      prop: 'remark'
    }],
    actionList: [{
      label: '拒绝',
      action(model) {
        if (model.remark && model.remark !== '') {
          const { username } = UserModel.state.info;
          const paramet = {
            remark: model.remark,
            id: parseInt(model.id),
            auditUserName: username,
            status: 2
          };
          this.$http.get('/v1/manage/otc/otcMerchantApply/sys/update', paramet).then((val) => {
            this.closeDialog('check');
            if (this.loadDataTable) this.loadDataTable(this.table.page);
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
        const { username } = UserModel.state.info;
        const paramet = {
          remark: model.remark,
          id: parseInt(model.id),
          auditUserName: username,
          status: 1
        };
        this.$http.get('/v1/manage/otc/otcMerchantApply/sys/update', paramet).then((val) => {
          this.closeDialog('check');
          if (this.loadDataTable) this.loadDataTable(this.table.page);
          this.$message.success('操作成功');
        });
      }
    }]
  }]
};
