<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="250px">
      <el-form-item label="保证金币种" prop="sellCoinid">
        <el-select v-model="ruleForm.bailCoinId" class="form-input">
          <el-option v-for="item in coinidSelect"
             :key="item.id"
             :label="item.name"
             :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="保证金数量" prop="bail">
        <el-input-number v-model="ruleForm.bail" :min="min" :max="max">
        </el-input-number>
      </el-form-item>

      <el-form-item label="未实名用户买入交易限额" prop="noCertificationTradeLimit">
        <el-input-number v-model="ruleForm.noCertificationTradeLimit" :min="min" :max="max">
        </el-input-number>
      </el-form-item>

      <el-form-item label="下单时间长" prop="createOrderTime">
        <el-input-number v-model="ruleForm.createOrderTime" :min="min" :max="max">
        </el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm" v-if="authorities.indexOf('otc-system-config-save') > 0">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import User from '@common/models/user';
export default {
  data() {
    return {
      ruleForm: {
        bail: '',
        noCertificationTradeLimit: '',
        createOrderTime: '',
        bailCoinId: '',
        bailCoinType: '',
        orderPayTime: ''
      },
      coinidSelect: {},
      min: 1,
      max: 999999,
      authorities: (User.state.authorities || []).map(item => (item.authority || ''))
    };
  },
  mounted() {
    this.getSysConfig();
    this.getCoin();
  },
  methods: {
    async getSysConfig() {
      return this.$http.get(`/v1/manage/otc/otcConfig/sys/query`).then((res) => {
        this.ruleForm = res;
      });
    },
    async getCoin() {
      return this.$http.get(`/v1/manage/otc/otcCoinCoinfig/sys/query`).then((res) => {
        this.coinidSelect = res.records;
      });
    },
    async submitForm() {
      this.coinidSelect.map((res) => {
        if (res.id === this.ruleForm.bailCoinId) this.ruleForm.bailCoinType = res.name;
      });
      // console.log(this.ruleForm);
      return this.$http.post(`/v1/manage/otc/otcConfig/sys/update`, this.ruleForm).then((res) => {
        this.$message.success('保存成功');
      });
    }
  }
};
</script>
