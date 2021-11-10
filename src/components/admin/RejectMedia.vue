<template>
  <q-card>
    <q-card-section>
      <span>{{ $t('admin.pageTextSureToReject') }}</span>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        unelevated
        color="primary"
        :label="$t('menus.buttonLabelYes')"
        @click="rejectMedia()"
      />
      <q-btn
        unelevated
        color="grey-8"
        :label="$t('menus.buttonLabelNo')"
        @click="$emit('closeRejectModal')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'RejectMedia',

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
    async rejectMedia () {
      this.loading = true

      this.mediaManager.makeMediaObject(
        this.media.titulo, this.media.descricao, Array.from(this.media.tags), this.media.autor, this.media.mocambo, '', this.media.tipo, this.media.path
      )

      const success = await this.mediaManager.performMediaDeletion()

      if (success) {
        this.$q.notify({
          type: 'positive',
          message: this.$t('admin.alertRejectionSuccess'),
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.$emit('closeRejectModal')
      } else {
        this.$q.notify({
          type: 'negative',
          message: this.$t('admin.alertRejectionError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
        this.$emit('closeRejectModal')
      }
    }
  }
}
</script>
