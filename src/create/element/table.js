import createElement from './index';
import { createListeners } from './utils';
export default function createDataTable (h, options, model) {
  if (!options) return;
  const isPage = options.page !== false;
  return h('div', {
    staticClass: 'data-table',
    style: 'position: relative;',
    directives: [{
      name: 'loading',
      value: model.table.loading
    }]
  }, [
    h('el-table', {
      ref: options.ref || 'dataTable',
      props: {
        data: model.table.list,
        ...options
      },
      on: {
        ...createListeners(options.listeners, this),
        'selection-change': (val) => {
          model.selectedItems = val;
        }
      }
    }, [
      options.checkbox ? h('el-table-column', {
        props: {
          type: 'selection',
          width: 55
        }
      }) : null,
      model.columns.map(column => {
        column.type = column.type || 'text';
        return h('el-table-column', {
          props: {
            ...column,
            type: '',
            formatter: undefined
          },
          scopedSlots: {
            default: (scope) => createElement.call(this, h, column, { ...scope.row, $index: scope.$index })
          }
        });
      })
    ]),
    options.renderFooter ? options.renderFooter.call(this, model.table.list) : null,
    isPage ? h('el-pagination', {
      staticClass: 'data-table-pagination',
      props: {
        background: true,
        layout: 'total, prev, pager, next',
        currentPage: model.table.page,
        pageSize: options.pageSize || 15,
        total: model.table.total
      },
      on: {
        'current-change': (page) => {
          options.listeners && options.listeners.pageChange.call(this, page);
        }
      }
    }) : null
  ]);
}
