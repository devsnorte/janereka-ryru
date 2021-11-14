<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      version_platform: process.env.VERSION_PLATFORM
    }
  },
  mounted () {
    this.verificaVersaoNoCache()
  },
  methods: {
    verificaVersaoNoCache () {
      if (localStorage.getItem('version_platform') !== this.version_platform) {
        localStorage.setItem('version_platform', this.version_platform)
        setTimeout(() => {
          window.location.reload(true)
        }, 200)
      }
    }
  }
}
</script>
