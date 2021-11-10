<template>
  <q-card class="full-width z-max">
    <q-card-section class="row items-center no-wrap text-primary">
      <div class="text-h6">{{ media.titulo }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-card-section class="image-wrapper">
      <q-img
        basic
        spinner-color="primary"
        :src="`${baseUrl}/acervo/download/${media.path}`"
      >
        <!-- <template v-slot:error>
          <div class="absolute-full flex flex-center bg-negative text-white">
            Não foi possível carregar a imagem
          </div>
        </template> -->
      </q-img>
    </q-card-section>

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
          message: this.$t('gallery.alertDeleteSuccess'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertDeleteFailed'),
          actions: [{ icon: 'close', color: 'white' }]
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

<style scoped>
.image-wrapper {
  max-width: 50vw;
  margin-left: auto;
  margin-right: auto;
}

@media only screen and (min-width: 599px) {
  .image-wrapper {
    width: 70vw;
  }
}

@media only screen and (min-width: 1023px) {
  .image-wrapper {
    width: 60vw;
  }
}
</style>
