<template>
  <div class="bg-accent" style="height: 300px;">

    <div class="fit media-buttons-overlay">
      <div class="row absolute-center text-secondary">
        <q-icon name="description" style="font-size: 4rem;" />
      </div>
    </div>
    <!-- <q-pdfviewer
      :src="fileSrc"
      type="pdfjs"
      style="height: 500px"
    />

    <q-pdfviewer
      :src="fileSrc"
      type="pdfjs"
      style="height: 500px"
    /> -->

  </div>
</template>

<script>
// import { SubmissionManager } from 'src/api/MediaSubmissionManager'

export default {
  name: 'CardFile',

  props: {
    media: {
      type: Object,
      required: true
    }
  }

  // data () {
  //   return {
  //     submission: SubmissionManager.getManager(),
  //     fileSrc: ''
  //   }
  // }

  // async mounted () {
  //   this.fileSrc = await this.submission.performMediaDownload(this.$props.media.path)
  // }
}
</script>
