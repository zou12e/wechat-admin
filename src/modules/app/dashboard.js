import UserModel from '@common/models/user';

export default {
  connect(use) {
    const { user } = use(UserModel);
    return {
      computed: {
        menus: user.getters.menuTree,
        user: user.state.info
      }
    };
  },
  created () {
    const path = this.getPath();
    this.$router.replace(path);
  },
  methods: {
    getPath (menu) {
      if (!this.menus || this.menus.length === 0) return '/signin';
      if (!menu) menu = this.menus[0];
      if (!menu.children || menu.children.length === 0) {
        return menu.targetUrl;
      }
      const menus = menu.children;
      for (let i = 0; i < menus.length; i++) {
        const path = this.getPath(menus[i]);
        if (path) return path;
      }
      return false;
    }
  },
  render () {
  }
};
