<template>
<q-page padding class="row">

  <main-table
    :loading="loading"
    :midias="mediaItems"
    @filterContent="filterContent($event)"
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

      <q-input filled dense debounce="300" :placeholder="$t('gallery.searchBarPlaceholder')"
        standout="bg-grey-2" class="q-my-lg"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <strong>{{ $t('gallery.menuSortBy') }}</strong>
      <div class="column q-my-md">
        <q-radio v-model="radioPlaceholder" val="alph" :label="$t('gallery.menuSortAlphabetical')" />
        <q-radio v-model="radioPlaceholder" val="new" :label="$t('gallery.menuSortNewer')" />
        <q-radio v-model="radioPlaceholder" val="old" :label="$t('gallery.menuSortOlder')" />
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
import { SubmissionManager } from 'src/api/MediaSubmissionManager'

export default {
  name: 'Acervo',

  components: {
    MainTable: () => import('components/acervo/MainTable'),
    TagCloud: () => import('components/acervo/TagCloud')
  },

  data () {
    return {
      submission: SubmissionManager.getManager(),
      mediaItems: [],
      hashtags: [],
      loading: false,
      showFilter: false,
      radioPlaceholder: '',
      queryParameters: {
        keywords: '',
        hashtags: [],
        tipos: [],
        ordem_campo: '',
        ordem_decrescente: false,
        pag_tamanho: 12,
        pag_atual: 1
      }
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

      const mediaItems = await this.submission.getMediasByHashtag(hashtag)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError')
        })
      }
    },

    // Todo: Implement functional server-side pagination when backend is ready.
    // Pagination is currently calculated on the frontend by requesting many
    // media items at a time.
    async filterContent (contentType) {
      this.loading = true

      const mediaItems = await this.submission.getMediasByContentType(contentType)

      if (mediaItems) {
        this.mediaItems = mediaItems
        this.loading = false
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('gallery.alertGenericError')
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
