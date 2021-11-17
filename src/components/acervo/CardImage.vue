<template>
<div style="height: 300px;">
  <q-img
    :src="`${baseUrl}/acervo/thumbnail/${media.path}`"
    class="absolute-center"
  />
</div>
</template>

<script>
export default {
  name: 'CardImage',

  props: {
    media: {
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
