<template>
  <div class="authentication-detail-main">
    <el-row type="flex">
      <el-col :span="3">
        <div class="label">ID</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.id"></div>
      </el-col>
      <el-col :span="3">
        <div class="label">用户名</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.username"></div>
      </el-col>
    </el-row>

    <el-row type="flex">
      <el-col :span="3">
        <div class="label">手机号码</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.mobile"></div>
      </el-col>
      <el-col :span="3">
        <div class="label">真实姓名</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.realName"></div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="3">
        <div class="label">证件类型</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content">{{getIdCardType(user.idCardType)}}</div>
      </el-col>
      <el-col :span="3">
        <div class="label">证件号码</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.idCard"></div>
      </el-col>
    </el-row>
    <el-row type="flex">
      <el-col :span="3">
        <div class="label">邮箱</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.email"></div>
      </el-col>
      <el-col :span="3">
        <div class="label">注册时间</div>
      </el-col>
      <el-col :span="9">
        <div class="label-content" v-text="user.created"></div>
      </el-col>
    </el-row>
    <br/>
    <el-row type="flex">
      <el-col :span="3">
        <div class="label">证件照片</div>
      </el-col>
    </el-row>

    <el-row class="layout-img" type="flex" justify="space-around">
      <el-col :span="7" :key="item.index" v-for="item in authInfoList">
        <div class="img-container" @click="imageView(item.imageUrl)">
          <img :src="item.imageUrl" alt="">
        </div>
      </el-col>
    </el-row>
    <br/>
    <el-row type="flex" v-if="userAuthAuditRecord.length > 1">
      <el-col :span="2">
        <div class="label">审核历史</div>
      </el-col>
      <el-col class="audit-history" :span="21">
        <p v-for="item in userAuthAuditRecord" :key="item.id">
         <span v-if="item.remark">{{item.auditUserName}}:{{item.reviewsStatus === 1 ? '通过' : '拒绝'}}({{item.remark}})</span>
        </p>
      </el-col>
    </el-row>
    <el-row>
      <el-col>当前状态：{{authName}}</el-col>
    </el-row>
    <br/>
    <el-form :model="ruleForm"
             :rules="rules"
             ref="ruleForm"
             class="verify-form">
      <el-form-item label="审核状态" prop="status">
        <el-select
          v-model="ruleForm.status"
          class="form-input"
          placeholder="请选择">
          <el-option label="通过" value='1'></el-option>
          <el-option label="拒绝" value='2'></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="拒绝原因" prop="note" v-show="reject" class="red-require">
        <el-input v-model="ruleForm.note" placeholder="请输入拒绝原因" class="form-input"></el-input>
      </el-form-item>

      <el-row type="flex" class="operation-container" justify="flex-start">
        <el-col :span="3">
          <el-button type="primary" @click="submitForm">确定</el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="danger" @click="handleCancel">返回</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import imageView from '@common/components/image-view';
export default {
  data() {
    let that = this;
    let validateRemark = function (rule, value, callback) {
      if (that.reject && !value) {
        callback(new Error('请填写拒绝原因!'));
      } else {
        callback();
      }
    };
    return {
      reject: false,
      userId: this.$route.query.id,
      user: {},
      authInfoList: [],
      userAuthAuditRecord: {},
      authName: '',
      authStatusList: [{
        id: '0',
        label: '待审核'
      }, {
        id: '1',
        label: '通过'
      }, {
        id: '2',
        label: '拒绝'
      }],
      ruleForm: {
        status: '',
        note: '',
        authCode: ''
      },
      rules: {
        reviewsStatus: [
          {
            required: true,
            message: '请选择审核状态',
            trigger: 'change'
          }
        ],
        note: [
          {
            validator: validateRemark,
            trigger: 'change'
          }
        ]
      }
    };
  },
  mounted() {
    this.getUserInfo(this.userId);
    this.getUsegetUserAuthRecordListrInfo(this.userId);
  },
  //  监听审核状态是否为拒绝
  watch: {
    'ruleForm.status'(curVal) {
      if (curVal === '2') {
        this.reject = true;
      } else {
        this.reject = false;
      }
    }
  },
  methods: {
    imageView,
    //  获取用户信息
    async getUserInfo(id) {
      return this.$http.get(`/v1/manage/user/getUserAuthObj?id=` + id).then((res) => {
        this.user = res.user;
        this.authInfoList = res.userAuthInfoList;
        this.ruleForm.authCode = this.authInfoList[0].authCode;
        for (let i = 0; i < this.authStatusList.length; i++) {
          if (res.userAuthAuditRecord.status.toString() === this.authStatusList[i].id) {
            this.authName = this.authStatusList[i].label;
          }
        }
      });
    },
    //  获取历史审批记录
    async getUsegetUserAuthRecordListrInfo(id) {
      return this.$http.get(`/v1/manage/user/getUserAuthRecordList?userId=` + id).then((res) => {
        this.userAuthAuditRecord = res;
      });
    },
    //  提交表单
    submitForm() {
      const model = {
        id: this.userId,
        authStatus: this.ruleForm.status,
        note: this.ruleForm.note,
        authCode: this.ruleForm.authCode
      };
      if (!this.ruleForm.status) {
        this.$message.error('请选择审核状态');
        return false;
      }
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.handleVerify(model);
          this.$message.success('操作成功');
        } else {
          return false;
        }
      });
    },
    //  执行审核
    async handleVerify(model) {
      await this.$http.get('/v1/manage/user/userAuthReviewStatus', model);
      this.handleCancel();
    },
    //  返回用户审核
    handleCancel() {
      window.history.back();
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
  }
};
</script>

<style lang="less">
  .authentication-detail-main{
    padding: 0 60px;
    .audit-history{
      p{
        margin: 0;
      }
    }
  }
  .layout-img {
    max-width: 1500px;
    justify-content: space-between !important;
    .el-col {
      width: 350px;
      display: flex;
      justify-content: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px 0;
      img {
        width: 345px;
        height: 200px;
      }
    }
  }
</style>
