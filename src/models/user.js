import { model, loading, action, getter } from 'muse-model';
import Store from 'si-store';
import * as userService from '@common/modules/app/services';

@model('user')
export default class User {
  state = {
    token: '',
    signining: false,
    menus: [],
    authorities: [],
    info: {}
  };
  constructor () {
    this.store = Store.create({
      id: 'app',
      storage: 'session'
    });
    this.state.token = this.store.get('token') || '';
    this.state.menus = this.store.get('menus') || [];
    this.state.authorities = this.store.get('authorities') || [];
    this.state.info = this.store.get('info') || {};
  }

  convertMenuTrees (menuTree, menus, parentId) {
    for (let i = 0; i < menus.length; i++) {
      const item = menus[i];
      if ((!parentId && !item.parentId) || (item.parentId === parentId)) {
        item.children = [];
        menuTree.push(item);
        menus.splice(i, 1);
        i--;
      }
    }

    if (menuTree.length > 0) {
      menuTree.sort((a, b) => a.sort - b.sort).forEach((item) => this.convertMenuTrees(item.children, menus, item.id));
    }
  }

  filerMenu (list) {
    return list.filter(item => {
      if (item.parentKey) {
        const keys = item.parentKey.split(',');
        return this.state.filterMenuList.indexOf(keys[0]) !== -1;
      } else {
        return this.state.filterMenuList.indexOf(item.id) !== -1;
      }
    });
  }

  @getter
  menuTree () {
    const menus = [...this.state.menus];
    const menuTrees = [];
    this.convertMenuTrees(menuTrees, menus);
    return menuTrees;
  }

  @loading('signining')
  @action
  signin (username, password, code) {
    return userService.signin(username, password, code).then(res => {
      const info = {
        username: res.username || username,
        created: res.created,
        fullname: res.fullname || username,
        email: res.email,
        mobile: res.mobile,
        status: res.status
      };
      this.store.set('token', res['access_token']);
      this.store.set('menus', res.menus);
      this.store.set('authorities', res.authorities);
      this.store.set('info', info);
      return {
        token: res['access_token'],
        menus: res.menus,
        authorities: res.authorities,
        info
      };
    });
  }

  @action
  sendSMSCode (username) {
    if (!username) return;
    return userService.sendCode(username);
  }

  @action
  hasMenu (path) {
    const menus = this.state.menus;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].targetUrl === path) return true;
    }
    return false;
  }

  @action
  getActiveMenuName (path) {
    const menus = this.state.menus;
    for (let i = 0; i < menus.length; i++) {
      if (menus[i].targetUrl === path || menus[i].id === path) {
        if (!menus[i].parentId) return menus[i].name;
        return this.getActiveMenuName(menus[i].parentId);
      }
    }
    return '';
  }

  @action
  async logout () {
    this.store.clear();
    return {
      token: ''
    };
  }
};
