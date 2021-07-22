<template>
  <q-img
    :src="`${baseUrl}/acervo/download/${midia.path}`"
    :ratio="16/9"
  />
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
