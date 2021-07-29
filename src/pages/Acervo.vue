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
      class="side-frame column no-wrap absolute-right col-xs-10 col-sm-8 col-md-3 q-px-md q-pa-md bg-white"
      style="overflow-y: scroll;"
    >

      <q-input filled dense debounce="300" placeholder="Pesquisar"
        standout="bg-grey-2" class="q-my-lg"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <strong>Classificação</strong>
      <div class="column q-my-md">
        <q-radio v-model="radioPlaceholder" val="alph" label="Ordem alfabética" />
        <q-radio v-model="radioPlaceholder" val="new" label="Mais recentes" />
        <q-radio v-model="radioPlaceholder" val="old" label="Mais antigos" />
      </div>

      <strong>Hashtags</strong>
      <div class="q-gutter-sm q-mt-xs">
        <span
          v-for="hashtag in hashtagPlaceholder" :key="hashtag.name"
          class="inline-block bg-grey-3 text-caption">
          {{ `# ${hashtag.name} (${hashtag.amount})` }}
        </span>
      </div>

      <q-btn label="Fechar" color="primary" class="self-start q-mt-xl"
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
    MainTable: () => import('components/acervo/MainTable')
  },

  data () {
    return {
      midiaItems: [],
      loading: false,
      showFilter: true,
      radioPlaceholder: '',
      hashtagPlaceholder: [
        { name: 'janereka', amount: 150 },
        { name: 'artesanato', amount: 86 },
        { name: 'cerâmica', amount: 74 },
        { name: 'canto', amount: 20 },
        { name: 'gavião', amount: 20 },
        { name: 'itaaka', amount: 20 },
        { name: 'história', amount: 20 },
        { name: 'família', amount: 20 },
        { name: 'kwatinema', amount: 20 },
        { name: 'medicina', amount: 20 },
        { name: 'construção', amount: 20 },
        { name: 'culinária', amount: 2 }
      ],
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
        const { data } = await this.$axios.get(
          `/acervo/find?tipos=imagem&pag_tamanho=${this.queryParameters.pag_tamanho}&pag_atual=${this.queryParameters.pag_atual}`
        )
        // const { data } = await this.$axios.get(
        //   '/acervo/find?tipos=imagem'
        // )
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
