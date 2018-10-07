import Vue from 'vue';
import Router from 'vue-router';
import config from '@common/config';
import Error from '@common/modules/app/error';
Vue.use(Router);

export const routes = [{
  path: '*',
  name: 'error',
  component: Error,
  meta: {
    title: '找不到页面啦！！！'
  }
}];
const interceptors = [];
let router;

function concat(arr) {
  arr.forEach(item => {
    routes.splice(routes.length - 1, 0, item);
  });
}

export function use (interceptor) {
  if (!router) {
    return interceptors.push(interceptor);
  }
  interceptor = typeof interceptor === 'function' ? interceptor(router, config) : interceptor;
  if (interceptor.afterEach) router.afterEach(interceptor.afterEach);
  if (interceptor.beforeEach) router.beforeEach(interceptor.beforeEach);
}

export function init (modules) {
  modules.forEach(option => {
    if (option.routes) {
      concat(typeof option.routes === 'function' ? option.routes(config) : option.routes);
    }
  });

  router = new Router({
    mode: 'history',
    fallback: true,
    routes
  });

  interceptors.forEach((interceptor) => use(interceptor));
  return router;
}
