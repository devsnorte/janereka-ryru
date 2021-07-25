<template>
<q-page padding>
  <main-table
    :loading="loading"
    :midias="midiaItems"
    @filterContent="filterContent($event)"
    @changePage="requestPage($event)"
   />
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
