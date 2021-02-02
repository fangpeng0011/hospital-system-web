<template>
  <el-container style="height: 100%;width: 100%;">
    <el-main>
      <div class="login-background">
        <img :src="imgSrc" width="100%" height="100%" style="margin-top: 35px"/>
      </div>
    </el-main>
    <el-main>
      <div class="login-container" style="margin-left: 20px">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
                 label-position="left">
          <h3 class="title">住院部管理系统</h3>
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user"/>
            </span>
            <el-input v-model="loginForm.username" name="username" type="text" auto-complete="on"
                      placeholder="请您输入用户名" clearable/>
          </el-form-item>
          <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
            <el-input
              :type="pwdType"
              v-model="loginForm.password"
              name="password"
              auto-complete="on"
              placeholder="请您输入密码"
              @keyup.enter.native="handleLogin"/>
            <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import {isvalidUsername} from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('请输入正确的用户名'))
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 5) {
          callback(new Error('密码不能小于5位'))
        } else {
          callback()
        }
      }
      return {
        imgSrc: require('../../../static/background.png'),
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{required: true, trigger: 'blur', validator: validateUsername}],
          password: [{required: true, trigger: 'blur', validator: validatePass}]
        },
        loading: false,
        pwdType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({path: this.redirect || '/'})
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg: #2d3a4b;
  $light_gray: #eee;

  .el-container {
    min-height: 100%;
  }

  .el-main:nth-child(1) {
    width: 65%;
    height: 100%;
    padding: 0 0 0 0;
    background: #51B7FF;
  }

  .el-main:nth-child(2) {
    width: 35%;
    height: 100%;
    background: #51B7FF;
  }

  .page-scrollbar {
    height: 100%;
    background-color: #ffffff;
  }

  .page-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }

  /* reset element-ui css */
  .login-container {
    margin-left: 10px;
    width: 75%;
    height: 100%; /**宽高100%是为了图片铺满屏幕 */
    z-index: 1;
    position: absolute;

    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input:-webkit-autofill, textarea:-webkit-autofill, select:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px white inset;
        border: 1px solid #CCC !important;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  $bg: #FFFFF;
  $dark_gray: #889aa4;
  $light_gray: #eee;
  .login-container {
    position: fixed;
    height: 100%;
    width: 25%;
    background-color: $bg;

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
