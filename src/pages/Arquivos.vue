<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-table
          grid
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
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
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
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'author', label: 'Autor', field: 'author' }
      ],
      arquivos: []
    }
  },
  mounted () {
    this.getArquivos()
  },
  methods: {
    getArquivos () {
      this.$q.loading.show()
      this.$axios.get('https://cors-anywhere.herokuapp.com/https://baobaxia.mocambos.net/api/mocambos/rede/bbx/search/arquivo/limit/100/100')
        .then((suc) => {
          this.arquivos = suc.data
          this.$q.loading.hide()
          console.log(suc)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }
}
</script>
