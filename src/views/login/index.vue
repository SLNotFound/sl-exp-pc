<template>
  <div class="login-page">
    <el-card class="login-card">
      <template #header>管理后台</template>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名：" prop="username">
          <el-input placeholder="请输入用户名" v-model="form.username"/>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input type="password" placeholder="请输入密码：" v-model="form.password"/>
        </el-form-item>
        <el-form-item class="tc">
          <el-button @click="login" type="primary">登录</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: ['blur', 'change'] },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: ['blur', 'change'] }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: ['blur', 'change'] },
          { min: 5, max: 16, message: '长度在 5 到 16 个字符', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {
    async login () {
      try {
        await this.$refs.form.validate()
        this.$store.dispatch('user/loginAction', this.form)
      } catch (e) {
        console.log(e)
      }
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header{
      height: 80px;
      background: rgba(114,124,245,1);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
