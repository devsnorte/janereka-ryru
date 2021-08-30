<template>
  <div class="bg-accent" style="height: 300px;">
    <div class="fit media-buttons-overlay">
      <div class="row absolute-center text-secondary">
        <q-icon name="volume_up" style="font-size: 4rem;" />
        <q-icon name="play_arrow" style="font-size: 4rem;" />
      </div>
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
