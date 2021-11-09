<template>
<q-page class="q-py-xl q-px-md">
  <div class="q-mx-md q-pa-md">
    <div class="text-h4 text-weight-bold text-capitalize">{{ username }}</div>
    <div class="text-caption text-weight-bold text-primary">{{ $t('admin.pageTextAdminLabel') }}</div>
    <q-btn
      outline
      color="white"
      text-color="black"
      class="q-mt-lg"
      type="submit"
      :label="$t('menus.buttonLabelLogout')"
      @click="logout"
    />
  </div>

  <div ref="adminMediasWrapper">

    <div v-if="loading">
      Loading...
    </div>

    <div class="bg-grey-2 row full-width" v-else>
      <div class="full-width bg-white row wrap">
        <div
          class="custom-tab q-px-lg q-py-sm col-shrink full-height row justify-center bg-grey-2 text-primary text-weight-bold"
        >
          <q-icon
            name="cloud_upload"
            size="sm"
            class="q-mr-sm"
          />
          <span>
            {{ $t('admin.pageTextSubmissionsLabel') }}
          </span>
        </div>
      </div>

      <div
        ref="adminMediaItemWrapper"
        v-for="media in mediaItems"
        :key="media.smid"
        class="q-mb-xl q-pa-md"
      >

        <card-wrapper
          :card="media"
          :allowMediaEdition="false"
          class="col-12"
        />

        <div
          class="column justify-between"
        >
          <div
            :class="$q.screen.lt.sm ? 'q-my-sm' : ''"
            class="q-pa-md bg-grey-4"
            style="border-radius: 10px;"
          >
            <span class="text-body2 text-weight-medium">
              {{ media.descricao }}
            </span>
          </div>
          <div class="row justify-center">
            <q-btn
              unelevated
              :label="$t('admin.buttonLabelAccept')"
              @click="selectedMedia = media; showPublish = true"
              icon="done"
              color="green"
              class="q-ma-xs"
            />
            <q-btn
              unelevated
              :label="$t('admin.buttonLabelReject')"
              @click="selectedMedia = media; showReject = true"
              icon="close"
              color="negative"
              class="q-ma-xs"
            />
          </div>
        </div>
      </div>

      <q-dialog v-model="showPublish" persistent>
        <publish-media
          :media="selectedMedia"
          @closePublishModal="showPublish = false"
        />
      </q-dialog>

      <q-dialog v-model="showReject" persistent>
        <reject-media
          :media="selectedMedia"
          @closeRejectModal="showReject = false"
        />
      </q-dialog>
    </div>
  </div>
</q-page>
</template>

<script>
import { Session } from 'src/api/SessionManager'
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'Admin',

  components: {
    CardWrapper: () => import('components/acervo/CardWrapper'),
    PublishMedia: () => import('components/admin/PublishMedia.vue'),
    RejectMedia: () => import('components/admin/RejectMedia.vue')
  },

  data () {
    return {
      session: Session.getSessionManager(),
      mediaManager: MediaManager.getManager(),
      mediaItems: [],
      username: '',
      loading: false,
      selectedMedia: null,
      showPublish: false,
      showReject: false
    }
  },

  async mounted () {
    await this.getUserData()
    this.getAllUnpublishedMedias()
  },

  methods: {
    async getUserData () {
      const { success, userData } = await this.session.getAuthenticatedUser()
      if (success) {
        const { username } = userData
        this.username = username
      }
    },

    async getAllUnpublishedMedias () {
      this.loading = true

      const mediaItems = await this.mediaManager.getAllUnpublishedMedias()

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.mediaItems = []
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    },

    logout () {
      this.session.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style scoped>
.content-card {
  border: 1px solid #e6e6e6;
  border-radius: 15px;
  overflow: hidden;
}
.custom-tab {
  border-radius: 10px 10px 0 0;
}
</style>
