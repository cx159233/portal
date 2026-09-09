<template>
  <DoctorScreen v-if="isDoctorScreen" />
  <JcxxcxPlatform v-else-if="isJcxxcxPlatform" />
  <CzPlatform v-else />
</template>

<script>
import CzPlatform from './cz-platform.vue'
import DoctorScreen from './components/DoctorScreen/index.vue'
import JcxxcxPlatform from './jcxxcx-platform.vue'

export default {
  components: { CzPlatform, DoctorScreen, JcxxcxPlatform },
  data() {
    return {
      isDoctorScreen: location.pathname.indexOf('/jg') === 0,
      isJcxxcxPlatform: location.pathname.indexOf('/jcxxcx') === 0
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
