<template>
  <DoctorScreen v-if="isDoctorScreen" />
  <CzPlatform v-else />
</template>

<script>
import CzPlatform from './cz-platform.vue'
import DoctorScreen from './components/DoctorScreen/index.vue'

export default {
  components: { CzPlatform, DoctorScreen },
  data() {
    return {
      isDoctorScreen: location.pathname.indexOf('/jg') === 0
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
