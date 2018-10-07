<template>
  <div class="coin-detail-wrap" v-loading="loading">
    <el-tabs type="border-card" :value="activeTab" @tab-click="changeActiveTab">
    <el-tab-pane label="币种信息" name="base">
      <base-form></base-form>
    </el-tab-pane>
    <el-tab-pane label="钱包配置" name="wallet" v-if="!hiddenOther">
      <wallet-form></wallet-form>
    </el-tab-pane>
    <el-tab-pane label="钱包归集提币地址" name="address"  v-if="!hiddenOther">
      <address-form></address-form>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import BaseForm from './base-form';
import WalletForm from './wallet-form';
import AddressFormJs from './address-form';
import TradeModel from '@common/models/trade';
import create from '@common/create';
export default {
  connect: TradeModel,
  data() {
    return {
    };
  },
  created() {
    if (this.$route.query.id) {
      this.setCoin(this.$route.query.id);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.changeTab('base');
    this.setCoin('');
    this.changeCoinStatus(1);
    this.changeHidden(true);
    next();
  },
  methods: {
    changeActiveTab(tab) {
      this.changeTab(tab.name);
    }
  },
  components: {
    BaseForm,
    WalletForm,
    'addressForm': create(AddressFormJs)
  }
};
</script>

<style lang="less">
</style>
