<template>
  <div>
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户信息" name="userInfo">
        <el-row type="flex">
          <el-col :span="3">
            <div class="label">ID</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.id}}</div>
          </el-col>
          <el-col :span="3">
            <div class="label">用户名</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.username}}</div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            <div class="label">手机号码</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.mobile}}</div>
          </el-col>
          <el-col :span="3">
            <div class="label">真实姓名</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.realName}}</div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            <div class="label">证件类型</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.getIdCardType(this.user.idCardType)}}</div>
          </el-col>
          <el-col :span="3">
            <div class="label">证件号码</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.idCard}}</div>
          </el-col>
        </el-row>
        <el-row type="flex">
          <el-col :span="3">
            <div class="label">邮箱</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.email}}</div>
          </el-col>
          <el-col :span="3">
            <div class="label">注册时间</div>
          </el-col>
          <el-col :span="9">
            <div class="label-content">{{this.user.created}}</div>
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="银行卡管理" name="userBank"><user-bank :userId='this.userId'></user-bank></el-tab-pane>
      <el-tab-pane label="钱包地址" name="userWallet"><user-wallet></user-wallet></el-tab-pane>
      <el-tab-pane label="提币地址" name="userAddress"><user-address></user-address></el-tab-pane> -->
      <el-tab-pane label="用户邀请列表" name="userInviter"><user-inviter></user-inviter></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import UserBank from './user-bank';
import UserWallet from './user-wallet';
import UserAddress from './user-address';
import userInviter from './user-inviter.js';
import create from '@common/create';
export default {
  data() {
    return {
      activeName: 'userInfo',
      userId: this.$route.query.id,
      user: {}
    };
  },
  mounted() {
    this.getUserInfo(this.userId);
  },
  methods: {
    async getUserInfo(id) {
      return this.$http.get(`/v1/manage/user/manager/getOneObj?id=` + id).then((res) => {
        this.user = res;
      });
    },
    getIdCardType(type) {
      switch (type) {
        case 1:
          return '身份证';
        case 2:
          return '军官证';
        case 3:
          return '护照';
        case 4:
          return '台湾居民通行证';
        case 5:
          return '港澳居民通行证';
        case 9:
          return '其他';
      }
    }
  },
  components: {
    'user-bank': create(UserBank),
    'user-wallet': create(UserWallet),
    'user-address': create(UserAddress),
    'user-inviter': create(userInviter)
  }
};
</script>

<style lang="less">
.el-col{
  margin: 10px 0;
}
</style>
