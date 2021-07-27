<template>
  <div class="login-container">
    <el-row style="height: 100%">
      <el-col :xs="0" :sm="0" :md="12" :lg="16" :xl="16" style="display: block">
        <el-carousel height="100vh" arrow="never">
          <el-carousel-item v-for="(item, index) in banerImg" :key="index">
            <img :src="item" alt="" style="width: 100%; height: 100%" />
          </el-carousel-item>
          <div class="caption">
            <h4>BIM智慧工地云平台</h4>
            <p>
              上海方联技术服务有限公司，是一家立足于BIM，围绕建设工程项目的全生命周期，提供BIM标准编制、
              BIM顾问服务、BIM管理平台开发、BIM运维平台开发、CIM生态体系开发的综合解决方案服务商。
            </p>
          </div>
        </el-carousel>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
        <el-form
          ref="form"
          v-loading="fromloading"
          :model="form"
          :rules="rules"
          class="login-form"
          label-position="left"
        >
          <div class="title"></div>
          <div class="title-tips">上海方联BIM, 为智慧建造赋能！</div>
          <el-form-item
            style="margin-top: 1.5em"
            prop="usertype"
            :rules="{
              required: true,
              trigger: 'blur',
              validator: validateusertype(),
              nextname: tenantNames,
            }"
          >
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user-cog']" />
            </span>
            <el-input
              v-model.trim="form.usertype"
              type="text"
              tabindex="1"
              placeholder="请输入租户名称"
              :oldname="tenantNames"
            />
            <span
              class="show-password"
              style="color: inherit"
              @click="handleType"
            >
              <vab-icon :icon="['fas', 'cog']"></vab-icon>
            </span>
          </el-form-item>
          <el-form-item prop="username">
            <span class="svg-container svg-container-admin">
              <vab-icon :icon="['fas', 'user']" />
            </span>
            <el-input
              v-model.trim="form.username"
              placeholder="请输入用户名"
              tabindex="1"
              type="text"
            />
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container">
              <vab-icon :icon="['fas', 'lock']" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model.trim="form.password"
              :type="passwordType"
              tabindex="2"
              placeholder="请输入密码"
              @keyup.enter.native="handleLogin"
            />
            <span
              v-if="passwordType === 'password'"
              class="show-password"
              @click="handlePassword"
            >
              <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
            </span>
            <span v-else class="show-password" @click="handlePassword">
              <vab-icon :icon="['fas', 'eye']"></vab-icon>
            </span>
          </el-form-item>
          <el-button
            :loading="loading"
            class="login-btn"
            type="primary"
            round
            @click="handleLogin"
          >
            登录
          </el-button>
          <!-- <router-link to="/register">
            <div style="margin-top: 20px">注册</div>
          </router-link> -->
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isPassword } from '@/utils/validate'
  import { mapState } from 'vuex'
  export default {
    name: 'Login',
    directives: {
      focus: {
        inserted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    data() {
      // const validateusertype = (rule, value, callback) => {
      //   debugger
      //   if ('' == value) {
      //     callback(new Error('租户名称不能为空'))
      //   } else if (value != rule.nextname) {
      //     debugger
      //     callback(new Error('该租户未验证'))
      //   } else {
      //     callback()
      //   }
      // }
      const validateusername = (rule, value, callback) => {
        if ('' == value) {
          callback(new Error('用户名不能为空'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error('密码不能少于6位'))
        } else {
          callback()
        }
      }
      return {
        nodeEnv: process.env.NODE_ENV,
        title: this.$baseTitle,
        form: {
          username: 'admin',
          password: '1q2w3E*',
          usertype: '',
          client_id: 'BIMPlatform_App',
          client_secret: '1q2w3e*',
          grant_type: 'password',
          scope: 'BIMPlatform',
        },
        rules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: validateusername,
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        banerImg: [
          require('@/assets/login_images/login-bg-1.png'),
          require('@/assets/login_images/login-bg-2.png'),
        ],
        loading: false,
        fromloading: false,
        passwordType: 'password',
        redirect: undefined,
      }
    },
    computed: {
      ...mapState('user', {
        tenantNames: (state) => {
          return state.tenantName
        },
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.redirect = (route.query && route.query.redirect) || '/'
        },
        immediate: true,
      },
    },
    created() {
      document.body.style.overflow = 'hidden'
    },
    beforeDestroy() {
      document.body.style.overflow = 'auto'
    },
    mounted() {
      //alert('开发环境API地址' + process.env.VUE_APP_BASE_API)
    },
    methods: {
      handlePassword() {
        this.passwordType === 'password'
          ? (this.passwordType = '')
          : (this.passwordType = 'password')
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            debugger
            var newdata = this.form
            this.$delete(newdata, 'usertype')
            this.loading = true
            this.$store
              .dispatch('user/login', newdata)
              .then(() => {
                const routerPath =
                  this.redirect === '/404' || this.redirect === '/401'
                    ? '/'
                    : this.redirect
                this.$router.push(routerPath).catch(() => {})
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            return false
          }
        })
        /* setTimeout(() => {
          window.open('https://github.com/chuzhixin/vue-admin-beautiful')
        }, 100000) */
      },
      handleType() {
        this.$refs.form.validateField('usertype', (err) => {
          if (err == '该租户未验证') {
            this.fromloading = true
            this.$store
              .dispatch('user/switchTenant', this.form.usertype)
              .then(() => {
                this.fromloading = false
              })
              .catch(() => {
                this.fromloading = false
              })
          } else {
            return false
          }
        })
      },
      validateusertype() {
        return (rule, value, callback) => {
          if ('' == value) {
            callback(new Error('租户名称不能为空'))
          } else if (value != rule.nextname) {
            callback(new Error('该租户未验证'))
          } else {
            callback()
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: url('~@/assets/login_images/background.jpg') center center fixed
      no-repeat;
    background-size: cover;

    .title {
      width: 80%;
      height: 4em;
      margin-bottom: 10px;
      background: url('~@/assets/login_images/logo.png') no-repeat;
      background-size: 100% 100%;
    }

    .title-tips {
      font-size: 14px;
      font-weight: 400;
      color: #899297;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .login-btn {
      display: inherit;
      width: 220px;
      height: 60px;
      margin-top: 5px;
      border: 0;

      &:hover {
        opacity: 0.9;
      }
    }

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 425px) / 2) 10% 10%;
      overflow: hidden;

      .forget-password {
        width: 100%;
        margin-top: 40px;
        text-align: left;

        .forget-pass {
          width: 129px;
          height: 19px;
          font-size: 20px;
          font-weight: 400;
          color: rgba(92, 102, 240, 1);
        }
      }
    }

    .tips {
      margin-bottom: 10px;
      font-size: $base-font-size-default;
      color: $base-color-white;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .title-container {
      position: relative;

      .title {
        margin: 0 auto 40px auto;
        font-size: 34px;
        font-weight: bold;
        color: $base-color-blue;
        text-align: center;
      }
    }

    .svg-container {
      position: absolute;
      top: 14px;
      left: 15px;
      z-index: $base-z-index;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .show-password {
      position: absolute;
      top: 14px;
      right: 25px;
      font-size: 16px;
      color: #d7dee3;
      cursor: pointer;
      user-select: none;
    }

    .caption {
      position: absolute;
      bottom: 20px;
      z-index: 1000;
      padding: 0px 40px;
      color: #fff;

      h4 {
        margin: 0;
        font-size: 30px;
      }
      p {
        font-size: 16px;
      }
    }

    ::v-deep {
      .el-form-item {
        padding-right: 0;
        margin: 20px 0;
        color: #454545;
        background: transparent;
        border: 1px solid transparent;
        border-radius: 2px;

        &__content {
          min-height: $base-input-height;
          line-height: $base-input-height;
        }

        &__error {
          position: absolute;
          top: 100%;
          left: 18px;
          font-size: $base-font-size-small;
          line-height: 18px;
          color: $base-color-red;
        }
      }

      .el-input {
        box-sizing: border-box;

        input {
          height: 50px;
          padding-left: 45px;
          font-size: $base-font-size-default;
          line-height: 50px;
          color: $base-font-color;
          background: #f6f4fc;
          border: 0;
          caret-color: $base-font-color;
        }
      }

      .el-button {
        width: 100%;
        height: 50px;
      }
    }
  }
</style>
