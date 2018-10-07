import UserModel from '@common/models/user';
import config from '@common/config';
// import Router from '@common/router';

export default {
  connect (use) {
    const { user } = use(UserModel);
    return {
      computed: {
        menusTree: user.getters.menuTree
      },
      methods: {
        getActiveMenuName: user.getActiveMenuName
      }
    };
  },
  data () {
    return {
      collapse: false
    };
  },
  computed: {
    defaultActive () {
      let { path } = this.$route || {};
      path = this.$route.meta.path || path;
      if (path) return path;
      if (this.menus && this.menus.length > 0) {
        return this.menus[0].targetUrl;
      }
      return '';
    },
    menus () {
      if (!this.menusTree || this.menusTree.length === 0) return [];
      let { path } = this.$route || {};
      path = this.$route.meta.path || path;
      if (!path) {
        return this.menusTree[0].children || [];
      }
      const activeName = this.getActiveMenuName(path);
      for (let i = 0; i < this.menusTree.length; i++) {
        if (this.menusTree[i].name === activeName) return this.menusTree[i].children;
      }
      return [];
    }
  },
  methods: {
    createMenus (h, menus) {
      return menus.map((menu) => {
        return menu.children && menu.children.length > 0
          ? h('el-submenu', {
            props: {
              index: menu.name
            }
          }, [
            h('span', {
              slot: 'title'
            }, menu.name),
            ...this.createMenus(h, menu.children)
          ])
          : h('el-menu-item', {
            key: menu.menuKey,
            props: {
              index: menu.targetUrl,
              route: {path: menu.targetUrl}
            }
          }, [
            h('span', {
              slot: 'title'
            }, menu.name)
          ]);
      });
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'app-aside'
    }, [
      h('h1', {
        staticClass: 'app-title'
      }, [
        config.title.toUpperCase()
      ]),
      h('el-scrollbar', {
        staticClass: 'app-side-scroll'
      }, [
        h('el-menu', {
          props: {
            defaultActive: this.defaultActive,
            backgroundColor: config.theme.menuBackgroundColor,
            textColor: config.theme.alernate,
            activeTextColor: config.theme.menuActiveColor,
            router: true
          }
        }, [
          ...this.createMenus(h, this.menus)
        ])
      ])
    ]);
  }
};
