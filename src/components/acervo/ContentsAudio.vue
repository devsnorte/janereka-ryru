<template>
  <q-card class="full-width z-max">
    <q-card-section class="row items-center text-primary">
      <div class="text-h6">{{ media.titulo }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-media-player
      type="audio"
      :source="audioSrc"
      radius='10px'
      color="green-2"
      class="q-ma-md"
      dark
    />

    <q-card-section class="q-pt-none">
      <edit-media
        v-if="editMode"
        :title="media.titulo"
        :description="media.descricao"
        :rawTags="media.tags"
        :mediaFileName="media.arquivo"
        :mediaType="media.tipo"
        :mediaPath="media.path"
        :triggerSubmit="triggerSubmit"
        @finished-submission="finishSubmit"
      />
    </q-card-section>

    <q-card-section class="q-pt-none q-mb-xl">
      <media-details
        v-show="!editMode"
        :description="media.descricao"
        :created="media.created"
        :authorName="media.creator"
      />
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal fixed-bottom">
      <media-content-buttons
        :editMode="editMode"
        @toggleEditMode="editMode = !editMode"
        @triggerSubmit="triggerSubmit = true"
        @triggerDelete="deleteMedia()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { SubmissionManager } from 'src/api/MediaSubmissionManager'

export default {
  name: 'ContentsAudio',

  components: {
    MediaContentButtons: () => import('components/acervo/MediaContentButtons'),
    MediaDetails: () => import('components/acervo/MediaDetails'),
    EditMedia: () => import('components/acervo/EditMedia')
  },

  props: {
    media: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      submission: SubmissionManager.getManager(),
      audioSrc: '',
      baseUrl: this.$axios.defaults.baseURL,
      editMode: false,
      triggerSubmit: false
    }
  },

  async mounted () {
    this.audioSrc = await this.submission.performMediaDownload(this.$props.media.path)
  },

  methods: {
    async deleteMedia () {
      this.submission.makeMediaObject(
        this.media.titule, this.media.descricao, this.media.tags, '', this.media.tipo, this.media.path
      )
      const success = await this.submission.performMediaDeletion()

      if (success) {
        this.$q.notify({
          type: 'positive',
          multiLine: true,
          message: this.$t('gallery.alertDeleteSuccess')
        })
      } else {
        this.$q.notify({
          type: 'negative',
          multiLine: true,
          message: this.$t('gallery.alertDeletFailed')
        })
      }
    },

    finishSubmit () {
      console.info('Submission finished.')
      this.triggerSubmit = false
      this.editMode = false
    }
  }
}
</script>
