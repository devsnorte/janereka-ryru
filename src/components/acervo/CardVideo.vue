<template>
  <div style="height: 300px;">
    <div class="fit absolute-center media-buttons-overlay" style="z-index: 1;">
      <div class="row absolute-center text-primary media-buttons">
        <q-icon name="theaters" style="font-size: 4rem;" />
        <q-icon name="play_arrow" style="font-size: 4rem;" />
      </div>
    </div>

    <div class="q-pa-xs fit">
      <q-img
        :src="`${baseUrl}/acervo/thumbnail/${media.path}`"
        class="fit no-pointer-events absolute-center"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardVideo',

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
