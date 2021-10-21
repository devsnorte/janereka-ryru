<template>
  <q-card>
    <q-card-section>
      <span>{{ $t('admin.pageTextSureToPublish') }}</span>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        unelevated
        color="primary"
        :label="$t('menus.buttonLabelYes')"
        @click="publishMedia()"
      />
      <q-btn
        unelevated
        color="grey-8"
        :label="$t('menus.buttonLabelNo')"
        @click="$emit('closePublishModal')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'PublishMedia',

  props: {
    media: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      mediaManager: MediaManager.getManager(),
      loading: false
    }
  },

  methods: {
    async publishMedia () {
      this.loading = true

      this.mediaManager.makeMediaObject(
        this.media.titulo, this.media.descricao, Array.from(this.media.tags), this.media.autor, this.media.mocambo, '', this.media.tipo, this.media.path
      )

      const success = await this.mediaManager.performMediaPublication()

      if (success) {
        this.$q.notify({
          type: 'positive',
          message: this.$t('admin.alertPublicationSuccess')
        })
        this.loading = false
        this.$emit('closePublishModal')
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.$t('admin.alertPublicationError')
        })
        this.loading = false
        this.$emit('closePublishModal')
      }
    }
  }
}
</script>
