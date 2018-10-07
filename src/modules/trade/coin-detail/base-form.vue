<template>
  <el-form :model="coinForm" :rules="coinFormRules" ref="coinForm" label-width="150px" class="coin-base-form">
    <el-form-item label="标题" prop="title">
      <el-input v-model="coinForm.title" :disabled="!isAdd"></el-input>
    </el-form-item>
    <el-form-item label="币种名称" prop="name">
      <el-input v-model="coinForm.name" :disabled="!isAdd"></el-input>
    </el-form-item>
    <el-form-item label="图片">
      <el-upload class="avatar-uploader" action="/admin/image/AliYunImgUpload" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="coinForm.img" :src="coinForm.img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="币种类型" prop="type">
      <el-select v-model="coinForm.type" class="form-input">
        <el-option v-for="(item,index) in coinTypeOptions" :key="index" :label="item.code" :value="item.code"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="钱包类型" prop="wallet">
      <el-select v-model="coinForm.wallet" class="form-input" @change="handleWalletChange" :disabled="!isAdd">
        <el-option v-for="item in walletTypeDict" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="coinForm.status" active-text="启用" @change="changeCoinStatus" inactive-text="禁用" :active-value="1" :inactive-value="0">
      </el-switch>
    </el-form-item>
    <el-form-item label="最小提现单位" prop="baseAmount">
      <el-input-number v-model="coinForm.baseAmount" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="单笔最小提现额度" prop="minAmount">
      <el-input-number v-model="coinForm.minAmount" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="单笔最大提现额度" prop="maxAmount">
      <el-input-number v-model="coinForm.maxAmount" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="单日最大提现额度" prop="dayMaxAmount">
      <el-input-number v-model="coinForm.dayMaxAmount" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="最低提现手续费" prop="minFeeNum">
      <el-input-number v-model="coinForm.minFeeNum" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="提现手续费费率" prop="rate">
      <el-input-number v-model="coinForm.rate" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="小数位数" prop="round">
      <el-input-number v-model="coinForm.round" :precision="0" :min="0">
      </el-input-number>
    </el-form-item>
    <el-form-item label="充值状态" prop="rechargeFlag">
      <el-switch v-model="coinForm.rechargeFlag" active-text="启用" inactive-text="关闭" :active-value="1" :inactive-value="0">
      </el-switch>
    </el-form-item>
    <el-form-item label="提币状态" prop="withdrawFlag">
      <el-switch v-model="coinForm.withdrawFlag" active-text="启用" inactive-text="关闭" :active-value="1" :inactive-value="0">
      </el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="validateForm" v-loading="loading" :disabled="loading" authId="config_update">保存</el-button>
      <el-button type="danger" @click="backToList" v-loading="loading" :disabled="submiting">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import TradeModel from '@common/models/trade';
import { createCoin, editCoin, getCoin, getCoinAll as getCoinAllAPI } from '@common/modules/trade/services';

const walletTypeDict = [ {
  label: '认购币',
  value: 'rgb'
}, {
  label: '钱包币',
  value: 'qbb'
}];
export default {
  connect: TradeModel,
  data() {
    return {
      submiting: false,
      walletTypeDict,
      coinForm: {
        title: '',
        name: '',
        img: '',
        type: '',
        wallet: '',
        status: 1,
        baseAmount: 1,
        minAmount: 1,
        maxAmount: 1,
        dayMaxAmount: 1,
        minFeeNum: 1,
        rate: 1,
        round: 2,
        rechargeFlag: 1,
        withdrawFlag: 1
      },
      coinFormRules: {
        title: [{required: true, message: '请输入标题'}],
        name: [{required: true, message: '请输入名称'}],
        img: [{required: true, message: '请上传图片'}],
        type: [{required: true, message: '请选择类型'}],
        wallet: [{required: true, message: '请选择钱包类型'}],
        status: [{required: true, message: '请选择状态'}],
        baseAmount: [{required: true, message: '请输入最小提现单位'}],
        minAmount: [{required: true, message: '请输入最小提现额度'}],
        maxAmount: [{required: true, message: '请输入单笔最大提现额度'}],
        dayMaxAmount: [{required: true, message: '请输入单日最大提现额度'}],
        minFeeNum: [{required: true, message: '请输入最低提现手续费'}],
        rechargeFlag: [{required: true, message: '请选择充值状态'}],
        withdrawFlag: [{required: true, message: '请选择提币状态'}]
      },
      coinTypeOptions: []
    };
  },
  computed: {
    isAdd() {
      return !this.coinId;
    }
  },
  created() {
    this.getCoinAll();
    this.getDetail();
  },
  methods: {
    // 钱包类型change事件
    handleWalletChange(val) {
      this.changeHidden(val === 'rgb');
    },
    // 上传成功
    handleAvatarSuccess(response) {
      const {data} = response;
      this.coinForm.img = data;
    },
    // 验证表单
    validateForm() {
      this.$refs.coinForm.validate(async (valid) => {
        if (valid) {
          const {minAmount, maxAmount, dayMaxAmount} = this.coinForm;
          if (minAmount >= maxAmount) {
            this.$message.error('单笔最小提现额度必须小于单笔最大提现额度');
            return false;
          }
          if (maxAmount >= dayMaxAmount) {
            this.$message.error('单笔最大提现额度必须小于单日最大提现额度');
            return false;
          }
          this.changeLoading(true);
          let res;
          if (this.isAdd) {
            res = await createCoin(this.coinForm);
          } else {
            res = await editCoin({...this.coinForm, id: this.coinId});
          }
          this.changeLoading(false);
          this.$notify({
            type: 'success',
            title: '提示',
            message: '保存成功！'
          });
          if (this.isAdd && this.coinForm.wallet !== 'rgb') {
            this.setCoin(res.coinId);
            this.changeTab('wallet');
          } else {
            this.backToList();
          }
        }
      });
    },
    getDetail() {
      if (this.coinId) {
        getCoin(this.coinId)
          .then(res => {
            if (res) {
              this.coinForm = {
                ...res
              };
              this.changeHidden(res.wallet === 'rgb');
              this.changeCoinStatus(res.status);
            } else {
              this.$message.error('无此币种');
              this.backToList();
            }
          }).catch(() => {
            this.$message.error('无此币种');
            this.backToList();
          });
      }
    },
    getCoinAll() {
      getCoinAllAPI()
        .then(res => {
          this.coinTypeOptions = res;
        });
    },
    backToList() {
      this.$router.push('/trade/coin-config');
    }
  }
};
</script>

<style lang="less">
@import '../../../assets/import.less';
.coin-base-form {
  width: 600px;
  .avatar-uploader {
    .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      display: flex;
      width: 178px;
      height: 178px;
      align-items: center;
      justify-content: center;
      &:hover {
        border-color: @primaryColor;
      }
      i {
        font-size: 28px;
      }
      img {
        max-width: 100%;
      }
    }
  }
}
</style>
