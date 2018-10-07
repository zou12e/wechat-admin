<template>
  <el-form :model="coinConfigForm" :rules="coinConfigFormRules" ref="coinConfigForm" label-width="100px" class="coin-wallet-form">
    <el-form-item label="归账值" prop="creditLimit">
      <el-input-number v-model="coinConfigForm.creditLimit" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="服务器IP" prop="rpcIp">
      <el-input v-model="coinConfigForm.rpcIp"></el-input>
    </el-form-item>
    <el-form-item label="端口" prop="rpcPort">
      <el-input v-model="coinConfigForm.rpcPort"></el-input>
    </el-form-item>
    <el-form-item label="RPC用户名" prop="rpcUser">
      <el-input v-model="coinConfigForm.rpcUser"></el-input>
    </el-form-item>
    <el-form-item label="RPC密码" prop="rpcPwd">
      <el-input v-model="coinConfigForm.rpcPwd"></el-input>
    </el-form-item>
    <el-form-item label="合约地址" prop="contractAddress">
      <el-input v-model="coinConfigForm.contractAddress"></el-input>
    </el-form-item>
    <el-form-item label="最新区块" prop="lastBlock">
      <el-input v-model="coinConfigForm.lastBlock"></el-input>
    </el-form-item>
    <el-form-item label="最低确认数" prop="minConfirm">
      <el-input-number v-model="coinConfigForm.minConfirm" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="定时任务" prop="task">
      <el-input v-model="coinConfigForm.task"></el-input>
    </el-form-item>
    <el-form-item label="主账户" prop="mainAccount">
      <el-input v-model="coinConfigForm.mainAccount"></el-input>
    </el-form-item>
    <el-form-item label="主账户地址" prop="mainAddr">
      <el-input v-model="coinConfigForm.mainAddr"></el-input>
    </el-form-item>
    <el-form-item label="钱包用户名" prop="walletUser">
      <el-input v-model="coinConfigForm.walletUser"></el-input>
    </el-form-item>
    <el-form-item label="钱包密码" prop="walletPass">
      <el-input v-model="coinConfigForm.walletPass"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="validateForm" authId="config_update">保存</el-button>
      <el-button type="danger" @click="backToList">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import TradeModel from '@common/models/trade';
import { getCoinConfig, editCoinConfig } from '@common/modules/trade/services';
export default {
  connect: TradeModel,
  data() {
    return {
      coinConfigForm: {
        creditLimit: 1,
        rpcIp: '',
        rpcPort: '',
        rpcUser: '',
        rpcPwd: '',
        contractAddress: '',
        lastBlock: '',
        minConfirm: '',
        task: '',
        mainAccount: '',
        mainAddr: '',
        walletUser: '',
        walletPass: ''
      },
      coinConfigFormRules: {
        creditLimit: [],
        rpcIp: [
          {required: true, message: '请输入服务器IP'}
        ],
        rpcPort: [
          {required: true, message: '请输入端口'}
        ],
        rpcUser: [],
        rpcPwd: [],
        contractAddress: [],
        lastBlock: [],
        minConfirm: [],
        task: [],
        mainAccount: [],
        mainAddr: [],
        walletUser: [],
        walletPass: []
      }
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    // 验证表单
    validateForm() {
      this.$refs.coinConfigForm.validate(async (valid) => {
        if (valid) {
          if (!this.coinId) {
            this.$message.error('请先新增币种信息');
            this.changeTab('base');
            return;
          }
          await editCoinConfig({id: this.coinId, status: this.coinStatus, ...this.coinConfigForm});
          this.$notify({
            type: 'success',
            title: '提示',
            message: '保存成功！'
          });
          this.changeTab('address');
        }
      });
    },
    backToList() {
      this.$router.push('/trade/coin-config');
    },
    getDetail() {
      if (this.coinId) {
        getCoinConfig(this.coinId)
          .then(res => {
            if (res) {
              this.coinConfigForm = {
                ...res
              };
            } else {
              this.$message.error('无此币种');
              this.backToList();
            }
          }).catch(() => {
            this.$message.error('无此币种');
            this.backToList();
          });
      }
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/import.less';
.coin-wallet-form {
  width: 600px;
}
</style>
