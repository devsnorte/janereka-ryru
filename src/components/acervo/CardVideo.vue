<template>
  <div class="full-height bg-black">

    <div transparent class="fit absolute-center media-buttons-overlay" style="z-index: 1;">
      <div class="row absolute-center text-primary media-buttons">
        <q-icon name="theaters" style="font-size: 4rem;" />
        <q-icon name="play_arrow" style="font-size: 4rem;" />
      </div>
    </div>

    <q-media-player
      type="video"
      :sources="[{
        src: `${baseUrl}/acervo/download/${midia.path}`
      }]"
      :show-big-play-button="false"
      radius='10px'
      color="green-2"
      class="no-pointer-events absolute-center"
      style="z-index: 0;"
    >
      <!-- Omit media player controls through a hidden v-slot -->
      <template v-slot:controls>
        <p hidden></p>
      </template>
    </q-media-player>

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
