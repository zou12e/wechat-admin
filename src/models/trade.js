import { model, action } from 'muse-model';

@model('trade')

export default class Trade {
  state = {
    loading: false,
    activeTab: 'base',
    coinId: '',
    coinStatus: 1,
    hiddenOther: true
  };
  @action
  changeTab(tabName) {
    return {
      activeTab: tabName
    };
  }
  @action
  setCoin(id) {
    return {
      coinId: id
    };
  }
  @action
  changeLoading(val) {
    return {
      loading: val
    };
  }
  @action
  changeHidden(val) {
    return {
      hiddenOther: val
    };
  }
  @action
  changeCoinStatus(val) {
    return {
      coinStatus: val
    };
  }
}
