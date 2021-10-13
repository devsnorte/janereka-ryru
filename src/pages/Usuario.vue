<template>
<q-page padding class="row">
  <span>{{ username }}</span>
  <main-table
    :loading="loading"
    :midias="mediaItems"
    :viewingFrom="'userArea'"
    @filterContent="filterContent"
    style="transition: 0.3s ease;"
   />
</q-page>
</template>

<script>
import { Session } from 'src/api/SessionManager'
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'Usuario',

  components: {
    MainTable: () => import('components/acervo/MainTable')
  },

  data () {
    return {
      session: Session.getSessionManager(),
      mediaManager: MediaManager.getManager(),
      loading: false,
      username: '',
      mediaItems: []
    }
  },

  async mounted () {
    this.loading = true

    await this.getUserData()
    this.getUserMedias()
  },

  methods: {
    async getUserData () {
      const { success, userData } = await this.session.getAuthenticatedUser()
      if (success) {
        const { username } = userData
        this.username = username
      }
    },

    async getUserMedias () {
      this.loading = true

      const mediaItems = await this.mediaManager.getMediasFromUser(this.username)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.mediaItems = []
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError')
        })
      }
    },

    async getUserSubmissions () {
      this.loading = true

      const mediaItems = await this.mediaManager.getSubimissionsFromUser(this.username)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.mediaItems = []
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError')
        })
      }
    },

    async filterContent (contentType) {
      switch (contentType) {
        case 'personalMedias':
          this.getUserMedias()
          break
        case 'personalSubimissions':
          this.getUserSubmissions()
          break
        default:
          this.getUserMedias()
          break
      }
    }
  }
}
</script>
