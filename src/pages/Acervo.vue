<template>
<q-page padding>
  <main-table
    :loading="loading"
    :midias="filteredMidias"
    @filterContent="filterContent($event)"
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
      allMidias: [],
      filteredMidias: [],
      loading: false
    }
  },
  mounted () {
    this.getMidia()
  },
  methods: {
    async getMidia () {
      this.loading = true
      try {
        const { data } = await this.$axios.get('/acervo/midia')
        this.allMidias = data
        this.filteredMidias = data
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
      if (contentType === 'all') {
        this.filteredMidias = this.allMidias
      } else {
        this.filteredMidias = this.allMidias.filter(midia => {
          return midia.data.tipo === contentType
        })
      }
    }
  }
}
</script>
