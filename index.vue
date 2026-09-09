<template>
  <div>
    <div class="first-loading-wrp" v-if="code === 200">
      <div class="loading-wrp">
        <!--  dot-spin -->
        <span class="dot"><i></i><i></i><i></i><i></i></span>
      </div>
      <div style="display: flex; justify-content: center; align-items: center">登录中...</div>
    </div>
    <div class="main-center" v-else style="text-align: center">
      <a-empty :description="code" />
      <a-button type="primary" @click="goLogin()" style="margin-top: 20px" :loading="loading"> 刷新 </a-button>
    </div>
  </div>
</template>
<script>
// import { clearCookie } from '@/utils/util'
import { loginFromCZOA } from '@/api/index'
export default {
  data() {
    return {
      code: 200,
      loading: false
    }
  },
  created() {
    // this.$route.query?.oauth_source === 'gather' ? this.gatherLogin() : this.oalogin()
    this.toLogin()
  },
  methods: {
    getTokenValue(t, data) {
      const arr = data?.filter((v) => v.name === t)
      if (!arr || !arr.length) return ''
      return arr[0].value
    },
    toLogin() {
      const { token } = this.$route.query
      if (!token) {
        this.code = '您的请求有误，请联系管理员'
        return
      }
      loginFromCZOA({ token })
        .then((res) => {
          this.loading = false
          if (res.code === this.ENUM.code.success) {
            this.$router.replace({ path: '/user/czoaplatform' })
          } else this.code = res.message
        })
        .catch(() => {
          this.code = '网络出问题了，请重试'
        })
    },
    goLogin() {
      this.loading = true
      this.toLogin()
    }
  }
}
</script>
<style lang="less" scoped>
.title {
  font-size: 20px;
}
.main-center {
  position: absolute;
  top: 48%;
  width: 100%;
}
</style>
