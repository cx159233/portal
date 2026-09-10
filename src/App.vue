<template>
  <DoctorScreen v-if="isDoctorScreen" />
  <JcxxcxPlatform v-else-if="isJcxxcxPlatform" />
  <CzPlatform v-else />
</template>

<script>
import CzPlatform from './cz-platform.vue'
import DoctorScreen from './components/DoctorScreen/index.vue'
import JcxxcxPlatform from './jcxxcx-platform.vue'

// dev/部署环境按 pathname 路由；单文件本地打开(file://)时 pathname 不可用，改读 hash(#/jg)
const getRoute = () => location.hash.replace(/^#/, '') || location.pathname

export default {
  components: { CzPlatform, DoctorScreen, JcxxcxPlatform },
  data() {
    return {
      route: getRoute()
    }
  },
  computed: {
    isDoctorScreen() {
      return this.route.indexOf('/jg') === 0
    },
    isJcxxcxPlatform() {
      return this.route.indexOf('/jcxxcx') === 0
    }
  },
  mounted() {
    // 单文件模式下 hash 变化不触发页面重载，需监听后动态切换
    window.addEventListener('hashchange', this.onHashChange)
  },
  beforeDestroy() {
    window.removeEventListener('hashchange', this.onHashChange)
  },
  methods: {
    onHashChange() {
      this.route = getRoute()
    }
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
</style>
