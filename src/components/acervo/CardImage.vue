<template>
<div style="height: 300px;">
  <q-img
    :src="imgSrc"
    class="absolute-center"
  />
</div>
</template>

<script>
import { SubmissionManager } from 'src/api/MediaSubmissionManager'

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
      submission: SubmissionManager.getManager(),
      imgSrc: ''
    }
  },

  async mounted () {
    this.imgSrc = await this.submission.performMediaDownload(this.$props.media.path)
  }
}
</script>
