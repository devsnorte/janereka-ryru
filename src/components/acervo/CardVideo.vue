<template>
  <div class="bg-secondary" style="height: 300px;">

    <div transparent class="fit absolute-center media-buttons-overlay" style="z-index: 1;">
      <div class="row absolute-center text-primary media-buttons">
        <q-icon name="theaters" style="font-size: 4rem;" />
        <q-icon name="play_arrow" style="font-size: 4rem;" />
      </div>
    </div>

    <div class="q-pa-xs fit">
      <q-media-player
        type="video"
        :source="videoSrc"
        :show-big-play-button="false"
        radius='15px'
        background-color="black"
        color="primary"
        class="fit no-pointer-events absolute-center"
        style="z-index: 0;"
      >
        <!-- Omit media player controls through a hidden v-slot -->
        <template v-slot:controls>
          <p hidden></p>
        </template>
      </q-media-player>
    </div>

  </div>
</template>

<script>
import { SubmissionManager } from 'src/api/MediaSubmissionManager'

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
      submission: SubmissionManager.getManager(),
      videoSrc: ''
    }
  },

  async mounted () {
    this.videoSrc = await this.submission.performMediaDownload(this.$props.media.path)
  }
}
</script>
