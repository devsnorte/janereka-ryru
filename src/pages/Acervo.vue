<template>
<q-page padding>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-table
        grid
        :loading="loading"
        title="Acervo"
        :data="allMidias"
        :columns="columns"
        row-key="id"
        :filter="filter"
        hide-header
        card-container-class="q-col-gutter-sm"
        :pagination="initialPagination"
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <card-items-table
            class="col-xs-12 col-sm-4 col-md-4"
            :card="props.row"
          />
        </template>
      </q-table>
    </div>

  </div>
</q-page>
</template>

<script>

export default {
  name: 'Acervo',
  components: {
    CardItemsTable: () => import('components/CardItemsTable')
  },
  data () {
    return {
      allMidias: [],
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 6
      },
      columns: [
        { name: 'titulo', label: 'titulo', field: 'titulo' },
        { name: 'descricao', label: 'descricao', field: 'descricao' }
      ],
      loading: false,
      arquivos: [],
      imagens: [],
      videos: [],
      audios: []
    }
  },
  mounted () {
    this.getMidia()
  },
  methods: {
    async getMidia () {
      this.loading = true
      console.log(this.$axios.defaults)
      console.log(this.$axios.defaults.baseURL)
      try {
        const { data } = await this.$axios.get('/acervo/midia')
        this.loading = false
        this.allMidias = data
        console.log(this.allMidias)

        this.allMidias.forEach(midia => {
          switch (midia.data.tipo) {
            case 'imagem':
              this.imagens.push(midia)
              break
            case 'arquivo':
              this.arquivos.push(midia)
              break
            case 'video':
              this.videos.push(midia)
              break
            case 'audio':
              this.audios.push(midia)
              break
          }
        })

        console.log(this.imagens)
      } catch (error) {
        console.error(error)
        this.loading = false
        this.displayError = true
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro'
        })
      }
    }
  }
}
</script>
