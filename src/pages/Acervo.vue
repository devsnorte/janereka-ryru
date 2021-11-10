<template>
<q-page padding class="row">

  <main-table
    ref="galleryTable"
    :loading="loading"
    :midias="mediaItems"
    :viewingFrom="'mainGallery'"
    :allowMediaEdition="false"
    @filterContent="filterContent"
    @changePage="requestPage($event)"
    @toggleFilter="showFilter = !showFilter"
    @closeMenus="showFilter = false"
    v-bind:class="[ {'col-xs-12 col-md-9' : showFilter}, {'fit': !showFilter} ]"
    style="transition: 0.3s ease;"
   />

  <transition
    appear
    enter-active-class="animated slideInRight"
    leave-active-class="animated fadeOutRight"
   >

    <div v-if="showFilter"
      class="side-frame column no-wrap absolute-right col-xs-10 col-sm-8 col-md-3 q-px-md q-pa-md bg-white z-top"
      style="overflow-y: scroll;"
    >

      <q-input
        filled dense
        v-model="keywords"
        :placeholder="$t('gallery.searchBarPlaceholder')"
        @keydown.enter.prevent="getMediasByKeywords(keywords)"
        debounce="300"
        standout="bg-grey-2"
        class="q-my-lg"
      >
        <template v-slot:append>
          <q-btn
            flat dense
            type="submit"
            @click="getMediasByKeywords(keywords)"
          >
            <q-icon name="search" />
          </q-btn>
        </template>
      </q-input>

      <strong>{{ $t('gallery.menuSortBy') }}</strong>
      <div class="column q-my-md">
        <q-radio
          v-model="sortingOption"
          val="alphabetical"
          :label="$t('gallery.menuSortAlphabetical')"
          @input="applySorting(sortingOption)"
        />
        <q-radio
          v-model="sortingOption"
          val="newer"
          :label="$t('gallery.menuSortNewer')"
          @input="applySorting(sortingOption)"
        />
        <q-radio
          v-model="sortingOption"
          val="older"
          :label="$t('gallery.menuSortOlder')"
          @input="applySorting(sortingOption)"
        />
      </div>

      <tag-cloud
        :hashtags="hashtags"
        @findHashtag="getMediasByHashtag"
      />

      <q-btn :label="$t('gallery.buttonLabelClose')" color="primary" class="self-start q-mt-xl"
        @click="showFilter = false"
      />

    </div>
  </transition>

</q-page>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'Acervo',

  components: {
    MainTable: () => import('components/acervo/MainTable'),
    TagCloud: () => import('components/acervo/TagCloud')
  },

  data () {
    return {
      mediaManager: MediaManager.getManager(),
      mediaItems: [],
      hashtags: [],
      loading: false,
      showFilter: false,
      sortingOption: '',
      keywords: ''
    }
  },

  mounted () {
    this.getTopHashtags()
    this.filterContent('todos')
  },

  methods: {
    async getTopHashtags () {
      const { data } = await this.$axios.get(
        '/acervo/top_tags?size=20'
      )
      this.hashtags = data
    },

    async getMediasByHashtag (hashtag) {
      this.loading = true
      this.showFilter = false
      this.sortingOption = ''
      this.$refs.galleryTable.defaultTab()

      const mediaItems = await this.mediaManager.getMediasByHashtag(hashtag)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    },

    async getMediasByKeywords (keywords) {
      this.loading = true
      this.showFilter = false
      this.sortingOption = ''

      const mediaItems = await this.mediaManager.getMediasByKeywords(keywords)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    },

    // Todo: Implement functional server-side pagination when backend is ready.
    // Pagination is currently calculated on the frontend by requesting many
    // media items at a time.
    async filterContent (contentType) {
      this.loading = true
      this.sortingOption = ''

      const mediaItems = await this.mediaManager.getMediasByContentType(contentType)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    },

    async applySorting (sortingOption) {
      this.loading = true

      const sortingResult = await this.mediaManager.applyMediaSorting(sortingOption)

      if (sortingResult.success) {
        this.mediaItems = sortingResult.data
        this.loading = false
      } else {
        this.loading = false
        this.sortingOption = ''
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }
    },

    requestPage (pageData) {
      const { pageNumber, midiaType } = pageData
      console.log(pageNumber, midiaType)
    }
  }
}
</script>

<style>
.side-frame::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.side-frame::-webkit-scrollbar-track {
  background: transparent;
}

/* Handle */
.side-frame::-webkit-scrollbar-thumb {
  background: #551000;
}

/* Handle on hover */
.side-frame::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
