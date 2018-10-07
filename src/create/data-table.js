import createTable from './element/table';
export default function createDataTable (options) {
  options = options.dataTable;
  if (!options) return {};
  const loadURL = options.loadURL;
  const isPage = options.page !== false;

  return {
    data: {
      columns: options.columns,
      selectedItems: [],
      table: {
        list: [],
        page: 1,
        total: 0,
        loading: false
      }
    },
    created () {
      const query = this.$route.query || {};
      this.searchForm = {
        ...this.searchForm,
        ...query
      };
      this.loadDataTable(Number(query.current) || 1);
    },
    methods: {
      loadDataTable (page) {
        if (this.table.loading || !loadURL) return;
        if (typeof page !== 'number') page = 1;
        this.table.page = page || 1;
        const paramsTemp = {
          ...this.searchForm
        };
        if (isPage) {
          paramsTemp.current = this.table.page;
          paramsTemp.size = options.pageSize || 15;
        }
        const {params = a => a} = options;
        this.table.loading = true;
        return this.$http.get(loadURL, params.call(this, paramsTemp))
          .then((result) => {
            this.$router.replace({ path: this.$route.path, query: paramsTemp });
            if (Array.isArray(result)) {
              this.table.list = result;
            } else {
              this.table.list = result.records;
              this.table.total = result.total;
              if (options.loadData) options.loadData.call(this, paramsTemp);
            }
            this.table.loading = false;
          })
          .catch(() => {
            this.table.loading = false;
          });
      },
      changeStatus (row) {
        if (!options.status) return this.$alert('请配置status');
        let { id, status } = row;
        status = status === 1 ? 0 : 1;
        const { method = 'post', url, params, transferURL = (url, row) => url } = options.status;

        return this.$http[method](transferURL(url, row), params.call(this, id, status, row))
          .then(() => {
            this.$message.success('更新成功');
            return this.loadDataTable(this.table.page);
          });
      },
      deleteSelection () {
        if (!options.delete) {
          return this.$alert('请配置delete项', '提示');
        }
        if (this.selectedItems.length === 0) {
          return this.$alert('请选择需要删除的列表项!', '提示', {
            confirmButtonText: '确定',
            type: 'warning'
          });
        }
        return this.$confirm('确定要删除吗？', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          const arr = this.selectedItems.map(item => item[options.delete.deleteByKey || 'id']);
          return this.$http[options.delete.method || 'delete'](options.delete.url, options.delete.isArray ? arr : {
            [options.delete.key || 'ids']: arr
          });
        }).then(() => {
          this.$message.success('删除成功！');
          return this.loadDataTable(this.table.page);
        });
      },
      exportExcel () {
        if (!options.exportURL) {
          return this.$alert('请配置exportURL', '提示');
        }
        const search = this.searchForm;
        let url = options.exportURL;
        if (this.searchForm) {
          url = '/api' + url + (url.indexOf('?') !== -1 ? '&' : '?');
          for (const i in search) {
            if (typeof search[i] !== 'undefined') {
              url += i + '=' + search[i] + '&';
            }
          }
          url = url.substr(0, url.length - 1);
        }
        window.open(url);
      }
    },
    render (h) {
      return createTable.call(this, h, {
        ...options,
        listeners: {
          ...options.listeners,
          pageChange: this.loadDataTable
        }
      }, this);
    }
  };
};
