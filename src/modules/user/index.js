import create from '@common/create';
import UserList from './user-list';
import Authentication from './authentication';
import AuthenticationDetail from './user-detail/authentication-detail';
import UserDetail from './user-detail/user-detail';
import BindGoogle from './bind-google';

export default {
  routes: [{
    path: '/usercenter/user-list',
    name: 'user-list',
    component: create(UserList),
    meta: {
      name: '用户列表'
    }
  }, {
    path: '/user/user-detail',
    name: 'user-detail',
    component: UserDetail,
    meta: {
      name: '用户列表',
      path: '/usercenter/user-list'
    }
  }, {
    path: '/usercenter/authentication',
    name: 'authentication',
    component: create(Authentication),
    meta: {
      name: '实名认证审核'
    }
  }, {
    path: '/user/authentication-detail',
    name: 'user-authentication-detail',
    component: AuthenticationDetail,
    meta: {
      name: '实名认证审核',
      path: '/usercenter/authentication'
    }
  }, {
    path: '/usercenter/bind-google',
    name: 'bind-google',
    component: create(BindGoogle),
    meta: {
      name: '绑定谷歌用户'
    }
  }]
};
