<template>
<div class="signin-wrapper">
  <div class="signin-img"></div>
  <el-form ref="form" class="signin-form" :model="userForm" :rules="rules">
    <div class="signin-form-title">
      {{title.toUpperCase()}}后台登录
    </div>
    <el-form-item prop="username">
      <el-input name="username" type="text" v-model="userForm.username" autoComplete="on" placeholder="请输入用户名">
        <i class="fa fa-user" slot="prepend"></i>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input name="password" type="password" v-model="userForm.password" autoComplete="on" placeholder="请输入登录密码">
        <i class="fa fa-lock" slot="prepend"></i>
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSignin" :loading="signining" class="signin-submit" type="primary">登录</el-button>
    </el-form-item>
  </el-form>
</div>
</template>
<script>
import config from '@common/config';
import UserModel from '@common/models/user';

export default {
  name: 'signin',
  connect: UserModel,
  data () {
    return {
      title: config.title,
      rules: {
        username: [{
          required: true,
          message: '请输入用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      },
      userForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    handleSignin () {
      this.$refs.form.validate(valid => {
        if (!valid) return;
        return this.signin(this.userForm.username, this.userForm.password)
          .then((res) => {
            this.$router.push({path: '/'});
          }).catch(() => {
          });
      });
    }
  }
};
</script>
<style lang='less'>
@import '~@common/assets/import.less';
.signin-img {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background:url('../../assets/image/lgoinBg.jpg') center center;
  background-size:cover;
}
.signin-form {
  position: fixed;
  width: 600px;
  height:350px;
  background-color: #fff;
  top: 50%;
  left: 50%;
  padding: 35px 50px 35px;
  margin: -200px 0 0 -300px;
  .el-input {
    border: 1px solid @borderColor;
    background: #fff;
    color: #000;
    border-radius: 4px;
    height: 48px;
    input {
      height: inherit;
      color: inherit;
      border: none;
      background-color: transparent;
      font-size: 16px;
    }
  }
  .el-input-group__prepend {
    color: #b2b2b2;;
    font-size: 20px;
    border: none;
    background-color: transparent;
  }
  .el-input-group__append {
    color: inherit;
    background-color: transparent;
    border: none;
    padding-right: 20px;
    .el-button {
      border: none;
      background-color: @primaryColor;
      height: 30px;
      font-size: 14px;
      color:#fff;
      margin-right: 1px;
      padding: 0 5px;
    }
  }
  .signin-submit {
    display: block;
    width: 100%;
    height: 50px;
    font-size: 16px;
  }
}
.signin-form-title {
  font-size: 26px;
  font-weight: 400;
  color: #000;
  margin: 0 auto 30px;
  text-align: center;
  font-weight: 700;
}
</style>
