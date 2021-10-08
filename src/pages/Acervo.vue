<template>
<q-page padding class="row">

  <main-table
    :loading="loading"
    :midias="midiaItems"
    @filterContent="filterContent($event)"
    @changePage="requestPage($event)"
    @toggleFilter="showFilter = !showFilter"
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
        @findHashtag="getMediasByTag"
      />

      <q-btn :label="$t('gallery.buttonLabelClose')" color="primary" class="self-start q-mt-xl"
        @click="showFilter = false"
      />

    </div>
  </transition>

</q-page>
</template>

<script>

export default {
  name: 'Acervo',

  components: {
    MainTable: () => import('components/acervo/MainTable'),
    TagCloud: () => import('components/acervo/TagCloud')
  },

  data () {
    return {
      midiaItems: [],
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
    this.getAllMidias()
    this.getTopHashtags()
  },

  methods: {
    async getAllMidias () {
      this.loading = true
      try {
        // const { data } = await this.$axios.get(
        //   `/acervo/find?pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        // )
        const { data } = await this.$axios.get(
          '/acervo/midia'
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getFileMidias () {
      this.loading = true
      try {
        // const { data } = await this.$axios.get(
        //   `/acervo/find?tipos=arquivo&pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        // )
        const { data } = await this.$axios.get(
          '/acervo/find?tipos=arquivo'
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getImageMidias () {
      this.loading = true
      try {
        // const { data } = await this.$axios.get(
        //   `/acervo/find?tipos=imagem&pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        // )
        const { data } = await this.$axios.get(
          '/acervo/find?tipos=imagem'
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getVideoMidias () {
      this.loading = true
      try {
        // const { data } = await this.$axios.get(
        //   `/acervo/find?tipos=video&pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        // )
        const { data } = await this.$axios.get(
          '/acervo/find?tipos=video'
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getAudioMidias () {
      this.loading = true
      try {
        // const { data } = await this.$axios.get(
        //   `/acervo/find?tipos=audio&pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        // )
        const { data } = await this.$axios.get(
          '/acervo/find?tipos=audio'
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.error(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getMediasByTag (hashtag) {
      this.loading = true
      try {
        const { data } = await this.$axios.get(
          `/acervo/find?hashtags=${hashtag}`
        )
        this.midiaItems = data
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    },

    async getTopHashtags () {
      const { data } = await this.$axios.get(
        '/acervo/top_tags?size=20'
      )
      this.hashtags = data
    },

    // Todo: API forces a default pagination if their query parameters
    // are not sent (12 items at page one)
    filterContent (contentType) {
      switch (contentType) {
        case 'arquivo':
          this.getFileMidias()
          break
        case 'imagem':
          this.getImageMidias()
          break
        case 'video':
          this.getVideoMidias()
          break
        case 'audio':
          this.getAudioMidias()
          break
        default:
          this.getAllMidias()
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
