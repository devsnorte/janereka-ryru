<template>
<div style="height: 300px;">
  <q-img
    :src="imgSrc"
    class="absolute-center"
  />
</div>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

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
      mediaManager: MediaManager.getManager(),
      imgSrc: ''
    }
  },

  async mounted () {
    this.imgSrc = await this.mediaManager.performMediaDownload(this.$props.media.path)
  },

  watch: {
    async media (newMedia) {
      this.imgSrc = await this.mediaManager.performMediaDownload(newMedia.path)
    }
  }
}
</script>
