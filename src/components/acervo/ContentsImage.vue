<template>
  <q-card class="full-width z-max">
    <q-card-section class="row items-center text-primary">
      <div class="text-h6">{{ media.data.titulo }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section>
      <q-img
        :src="`${baseUrl}/acervo/download/${media.path}`"
        spinner-color="primary"
        basic
      >
        <!-- <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Não foi possível carregar a imagem
          </div>
        </template> -->
      </q-img>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <edit-media
        v-if="editMode"
        :title="media.data.titulo"
        :description="media.data.descricao"
        :rawTags="media.data.tags"
        :mediaFileName="media.data.arquivo"
        :mediaType="media.data.tipo"
        :mediaPath="media.path"
        :triggerSubmit="triggerSubmit"
        @finished-submission="finishSubmit"
      />
    </q-card-section>

    <q-card-section class="q-pt-none q-mb-xl">
      <media-details
        v-show="!editMode"
        :description="media.data.descricao"
        :created="media.created"
        :username="media.creator.username"
        :authorName="media.creator.name"
        :authorEmail="media.creator.email"
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
  name: 'ContentsImage',

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
      baseUrl: this.$axios.defaults.baseURL,
      editMode: false,
      triggerSubmit: false
    }
  },

  methods: {
    async deleteMedia () {
      this.submission.makeMediaObject(
        this.media.data.titule, this.media.data.descricao, this.media.data.tags, '', this.media.data.tipo, this.media.path
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
          message: this.$t('gallery.alertDeleteFailed')
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
