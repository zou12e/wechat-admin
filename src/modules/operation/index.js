import create from '@common/create';
import Article from './article';
import Footer from './footer';
import ArticeleCategory from './article-category';
import Resource from './resource';
import Service from './service';

export default {
  routes: [{
    path: '/operation/article',
    name: 'operation-article',
    component: create(Article),
    meta: {
      name: '文章管理'
    }
  }, {
    path: '/operation/footer',
    name: 'operation-footer',
    component: create(Footer),
    meta: {
      name: '底部栏配置'
    }
  }, {
    path: '/operation/category',
    name: 'operation-article-category',
    component: create(ArticeleCategory),
    meta: {
      name: '文章分类管理'
    }
  }, {
    path: '/operation/resource',
    name: 'operation-resource',
    component: create(Resource),
    meta: {
      name: '资源配置'
    }
  }, {
    path: '/operation/service',
    name: 'operation-service',
    component: create(Service),
    meta: {
      name: '客服工单'
    }
  }]
};
