/**
 * 远程加载数据
 */
export default function (options) {
  const remotes = options.remote;
  if (!remotes) return {};
  const remote = {};

  remotes.forEach((item) => {
    remote[item.key] = item.default || '';
  });
  return {
    data: {
      remote
    },
    created () {
      remotes.forEach(({ key, lazy }) => {
        if (lazy) return;
        this.loadRemoteData(key);
      });
    },
    methods: {
      loadRemoteData (key, params = {}) {
        const remoteItem = remotes.filter(item => item.key === key)[0];
        const { transfer = a => a } = remoteItem;
        if (!remoteItem) return;
        return this.$http[remoteItem.method || 'get'](remoteItem.url, {
          ...remoteItem.params,
          ...params
        }).then((data) => {
          this.remote[key] = transfer(data) || [];
        });
      }
    }
  };
}
