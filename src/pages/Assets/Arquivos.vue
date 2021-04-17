<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-table
          grid
          :loading="loading"
          title="Acervo de Arquivos"
          :data="arquivos"
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
          <card-arquivo-table
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
// eslint-disable-next-line
export default {
  name: 'PageArquivos',
  components: {
    CardArquivoTable: () => import('components/CardArquivoTable')
  },
  data () {
    return {
      baseUrl: 'https://baobaxia.mocambos.net/',
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 9
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'author', label: 'Autor', field: 'author' }
      ],
      arquivos: [],
      loading: false
    }
  },
  mounted () {
    this.getArquivos()
  },
  methods: {
    async getArquivos () {
      this.loading = true
      try {
        const response = await this.$axios.get('/arquivo/limit/20/20')
        this.arquivos = response.data
      } catch (err) {
        this.$q.notify('Erro ao recuperar informações')
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
