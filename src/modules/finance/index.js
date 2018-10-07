import create from '@common/create';
import CoinWithdrawExamine from './coin-withdraw-examine';
import AssetsTrade from './assets/trade';
import AssetsOtc from './assets/otc';
import FundsRechargeRecord from './funds/recharge-record';
import FundsWithdrawRecord from './funds/withdraw-record';
import FundsFundsflow from './funds/flow';
import FundsFreezeFlow from './funds/freeze-flow';
import Wallet from './wallet';
import LockCoin from './lock-coin';
import LockCoinReleaseRecord from './lock-coin-release-record';

export default {
  routes: [{
    path: '/finance/coin-withdraw-examine',
    name: 'coin-withdraw-examine',
    component: create(CoinWithdrawExamine),
    meta: {
      name: '数字货币提现审核'
    }
  }, {
    path: '/finance/assets/trade',
    name: 'finance-assets-trade',
    component: create(AssetsTrade),
    meta: {
      name: '币币账户资产'
    }
  }, {
    path: '/finance/assets/otc',
    name: 'finance-assets-otc',
    component: create(AssetsOtc),
    meta: {
      name: '法币账户资产'
    }
  }, {
    path: '/finance/funds/recharge-record',
    name: 'finance-funds-recharge-record',
    component: create(FundsRechargeRecord),
    meta: {
      name: '充币记录'
    }
  }, {
    path: '/finance/funds/withdraw-record',
    name: 'finance-funds-withdraw-record',
    component: create(FundsWithdrawRecord),
    meta: {
      name: '提币记录'
    }
  }, {
    path: '/finance/funds/flow',
    name: 'finance-funds-flow',
    component: create(FundsFundsflow),
    meta: {
      name: '资金流水'
    }
  }, {
    path: '/finance/funds/freeze-flow',
    name: 'finance-funds-freeze-flow',
    component: create(FundsFreezeFlow),
    meta: {
      name: '冻结流水'
    }
  }, {
    path: '/finance/wallet',
    name: 'finance-wallet',
    component: create(Wallet),
    meta: {
      name: '系统钱包资产'
    }
  }, {
    path: '/finance/lock-coin',
    name: 'finance-lock-coin',
    component: create(LockCoin),
    meta: {
      name: '锁仓币种'
    }
  }, {
    path: '/finance/lock-coin-release-record',
    name: 'lock-coin-release-record',
    component: create(LockCoinReleaseRecord),
    meta: {
      name: '锁仓币释放记录'
    }
  }]
};
