import '@babel/polyfill';
import common from '@common';
import app from '@common/modules/app';
import operation from '@common/modules/operation';
import user from '@common/modules/user';
import finance from '@common/modules/finance';
import trade from '@common/modules/trade';
import otc from '@common/modules/otc';
import system from '@common/modules/system';

common.use(app);
common.use(operation);
common.use(finance);
common.use(trade);
common.use(otc);
common.use(system);
common.use(user);

// if (typeof window !== 'undefined' && window.__CONFIG__) {
//   common.config(window.__CONFIG__);
// }

common.start();
