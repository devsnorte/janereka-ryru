<template>
  <div id="AUDIO-CARD-DIV-1" class="full-height bg-accent">
    <div id="AUDIO-CARD-DIV-2" class="fit media-buttons-overlay">
      <div id="AUDIO-CARD-DIV-3" class="row absolute-center text-secondary">
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
