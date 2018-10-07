const Signin = () => import(/* webpackChunkName "signin" */ './signin');
const Dashboard = () => import(/* webpackChunkName "dashboard" */ './dashboard');

export default {
  routes: [{
    name: 'dashboard',
    path: '/',
    component: Dashboard,
    meta: {
    }
  }, {
    name: 'signin',
    path: '/signin',
    component: Signin,
    meta: {
      title: '登录'
    }
  }]
};
