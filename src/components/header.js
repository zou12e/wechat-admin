import UserModel from '@common/models/user';
import * as userService from '@common/modules/app/services';
import config from '@common/config';

export default {
  connect (use) {
    const { user } = use(UserModel);
    return {
      computed: {
        menus: user.getters.menuTree,
        user: user.state.info
      },
      methods: {
        getActiveMenuName: user.getActiveMenuName,
        logout: user.logout
      }
    };
  },
  computed: {
    defaultActive () {
      let { path } = this.$route || {};
      path = this.$route.meta.path || path;
      if (path) {
        return this.getActiveMenuName(path);
      };
      if (this.menus && this.menus.length > 0) {
        return this.menus[0].name;
      }
      return '';
    }
  },
  methods: {
    getMenuPath (menu) {
      if (!menu.children || menu.children.length === 0) {
        return menu.targetUrl;
      }
      const path = this.getMenuPath(menu.children[0]);
      if (path) return path;
      return false;
    },
    createMenu (h) {
      return h('el-menu', {
        props: {
          defaultActive: this.defaultActive,
          mode: 'horizontal',
          backgroundColor: config.theme.backgroundColor,
          textColor: config.theme.alernate,
          activeTextColor: config.theme.menuActiveColor
        }
      }, this.menus.map(menu => {
        return h('el-menu-item', {
          props: {
            index: menu.name
          },
          on: {
            click: () => {
              const path = this.getMenuPath(menu);
              if (!path) return;
              this.$router.push(path);
            }
          }
        }, menu.name);
      }));
    },
    createUserInfo (h) {
      return h('el-menu', {
        props: {
          defaultActive: '1',
          mode: 'horizontal',
          backgroundColor: config.theme.backgroundColor,
          textColor: config.theme.alernate,
          activeTextColor: config.theme.menuActiveColor
        }
      }, [
        h('el-submenu', {
          props: {
            index: '1'
          }
        }, [
          h('span', {
            staticClass: 'app-user-name',
            slot: 'title'
          }, this.user.fullname),
          h('el-menu-item', {
            props: {
              route: { path: '/' },
              index: '2'
            }
          }, [
            '首页'
          ]),
          h('el-menu-item', {
            props: {
              index: '3'
            },
            on: {
              click: async () => {
                await userService.logout();
                this.logout();
                this.$router.replace('/signin');
              }
            }
          }, '退出')
        ])
      ]);
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'app-header'
    }, [
      this.createMenu(h),
      this.createUserInfo(h)
    ]);
  }
};
