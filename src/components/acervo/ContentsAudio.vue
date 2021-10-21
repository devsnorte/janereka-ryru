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
      :source="`${baseUrl}/acervo/download/${media.path}`"
      radius='10px'
      color="green-2"
      class="q-ma-md"
      dark
    />

    <q-card-section class="q-pt-none q-mb-xl">
      <media-details
        v-show="!showEdit"
        :media="media"
      />
    </q-card-section>

    <q-card-section v-if="allowEdition" class="q-pt-none">
      <edit-media
        v-if="showEdit"
        :media="media"
        :triggerSubmit="triggerSubmit"
        @finished-submission="finishSubmit"
      />
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal fixed-bottom">
      <media-content-buttons
        :editMode="showEdit"
        :allowEdition="allowEdition"
        @toggleEditMode="showEdit = !showEdit"
        @triggerSubmit="triggerSubmit = true"
        @triggerDelete="deleteMedia()"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

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
    },
    allowEdition: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data () {
    return {
      mediaManager: MediaManager.getManager(),
      baseUrl: this.$axios.defaults.baseURL,
      showEdit: false,
      triggerSubmit: false
    }
  },

  methods: {
    async deleteMedia () {
      this.mediaManager.makeMediaObject(
        this.media.titulo, this.media.descricao, this.media.tags, this.newAuthorname, this.newAldeia, '', this.media.tipo, this.media.path
      )
      const success = await this.mediaManager.performMediaDeletion()

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
      this.triggerSubmit = false
      this.showEdit = false
    }
  }
}
</script>
