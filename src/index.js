import Vue from 'vue';
import Components from './components';
import './assets/index.less';
import { plugin as Http } from './http';
import Router from './router';
import store from './models';
import { sync } from 'vuex-router-sync';
import App from './App';
import config from './config';
import { merge } from './utils';
import * as filters from './utils/filters';

Vue.use(Components);
Vue.use(Http);

Object.keys(filters).forEach(key => Vue.filter(key, filters[key]));

const modules = [];
function callHook (name, ...args) {
  modules.forEach((item) => item[name] && item[name].apply(item, args));
}

export default {
  config (options) {
    return merge(config, options);
  },
  use (option) {
    modules.push(option);
    if (option.config) {
      merge(config, option.config);
    }
    callHook('installed', Vue);
    return this;
  },
  start (selector = '#app') {
    const router = Router.init(modules);
    sync(store, router);
    callHook('routeInit', router, Vue);
    const app = new Vue({
      router,
      store,
      ...App
    }).$mount(selector);
    callHook('started', app, router, Vue);
    return app;
  }
};
