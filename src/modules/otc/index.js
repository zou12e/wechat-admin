import create from '@common/create';
import MerchantAudit from './merchant/audit';
import MerchantList from './merchant/list';
import MerchantRemove from './merchant/remove';
import CoinConfig from './coin-config';
import BuyRecord from './order/buy';
import SellRecord from './order/sell';
import Advertisement from './advertisement';
import SystemConfig from './system-config';
import Appeal from './appeal';
export default {
  routes: [
    {
      path: '/otc/order/buy',
      name: 'otc-order-buy',
      component: create(BuyRecord),
      meta: {
        name: '法币买入订单'
      }
    },
    {
      path: '/otc/order/sell',
      name: 'otc-order-sell',
      component: create(SellRecord),
      meta: {
        name: '法币卖出订单'
      }
    },
    {
      path: '/otc/merchant/audit',
      name: 'otc-merchant-audit',
      component: create(MerchantAudit),
      meta: {
        name: '待审核商家'
      }
    },
    {
      path: '/otc/merchant/list',
      name: 'otc-merchant-list',
      component: create(MerchantList),
      meta: {
        name: '商家列表'
      }
    },
    {
      path: '/otc/merchant/remove',
      name: 'otc-merchant-remove',
      component: create(MerchantRemove),
      meta: {
        name: '已解除商家'
      }
    },
    {
      path: '/otc/advertisement',
      name: 'otc-advertising',
      component: create(Advertisement),
      meta: {
        name: '商家广告'
      }
    },
    {
      path: '/otc/coin-config',
      name: 'otc-coin-config',
      component: create(CoinConfig),
      meta: {
        name: '币种配置'
      }
    },
    {
      path: '/otc/appeal',
      name: 'otc-appeal',
      component: create(Appeal),
      meta: {
        name: '申诉列表'
      }
    },
    {
      path: '/otc/system-config',
      name: 'otc-system-config',
      component: SystemConfig,
      meta: {
        name: '系统配置'
      }
    }
  ]
};
