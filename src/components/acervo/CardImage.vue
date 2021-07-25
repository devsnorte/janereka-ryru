<template>
<div style="height: 300px;">
  <q-img
    :src="`${baseUrl}/acervo/download/${midia.path}`"
    class="absolute-center"
  />
</div>
</template>

<script>
export default {
  name: 'CardImage',

  props: {
    midia: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      baseUrl: this.$axios.defaults.baseURL
    }
  }
}
</script>
