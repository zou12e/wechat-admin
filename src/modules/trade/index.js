import create from '@common/create';
import RecordDeal from './record/deal';
import RecordEntrust from './record/entrust';
import MarketConfig from './market-config';
import SymbolConfig from './symbol-config';
import CoinConfig from './coin-config';
// import CoinDetail from './coin-detail/coin-detail';
import RobotOrder from './robot/order';

export default {
  routes: [
    {
      path: '/trade/record/deal',
      name: 'trade-record-deal',
      component: create(RecordDeal),
      meta: {
        name: '币币交易记录'
      }
    },
    {
      path: '/trade/record/entrust',
      name: 'trade-record-entrust',
      component: create(RecordEntrust),
      meta: {
        name: '币币委托记录'
      }
    },
    {
      path: '/trade/market-config',
      name: 'trade-market-config',
      component: create(MarketConfig),
      meta: {
        name: '交易市场配置'
      }
    },
    {
      path: '/trade/symbol-config',
      name: 'trade-symbol-config',
      component: create(SymbolConfig),
      meta: {
        name: '交易对配置'
      }
    },
    {
      path: '/trade/coin-config',
      name: 'trade-coin-config',
      component: create(CoinConfig),
      meta: {
        name: '币种配置'
      }
    },
    {
      path: '/trade/robot/order',
      name: 'trade-robot-order',
      component: create(RobotOrder),
      meta: {
        name: '订单管理'
      }
    }
    // {
    //   path: '/trade/coin-detail',
    //   name: 'trade-coin-detail',
    //   component: CoinDetail,
    //   meta: {
    //     name: '币种配置',
    //     path: '/trade/coin-config'
    //   }
    // }
  ]
};
