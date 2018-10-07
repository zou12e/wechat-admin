import UserModel from '@common/models/user';

export default {
  name: 'app-breadcrumb',
  connect (use) {
    const { user } = use(UserModel);
    return {
      computed: {
        menus: user.state.menus
      }
    };
  },
  computed: {
    items () {
      const { name } = this.$route.meta;
      if (name) {
        return this.getItems(name);
      }
      return [];
    }
  },
  methods: {
    getItems (name, items = []) {
      if (!name) return items;
      for (let i = 0; i < this.menus.length; i++) {
        if (this.menus[i].name === name || this.menus[i].id === name) {
          items.push(this.menus[i].desc);
          return this.getItems(this.menus[i].parentId, items);
        }
      }
      return items;
    },
    createItems (h) {
      return this.items.slice(0).reverse().map((menu) => {
        return h('el-breadcrumb-item', {}, menu);
      });
    }
  },
  render (h) {
    return this.items.length > 0 ? h('div', {
      staticClass: 'app-breadcrumb'
    }, [
      h('el-breadcrumb', {}, this.createItems(h))
    ]) : null;
  }
};
