<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-table
          grid
          title="Acervo de Imagens"
          :data="imagens"
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
          <card-item-table
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
  name: 'PageImagens',
  components: {
    CardItemTable: () => import('components/CardItemTable')
  },
  data () {
    return {
      baseUrl: 'https://baobaxia.mocambos.net/',
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 6
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'author', label: 'Autor', field: 'author' }
      ],
      imagens: []
    }
  },
  mounted () {
    this.getImages()
  },
  methods: {
    getImages () {
      this.$q.loading.show()
      this.$axios.get('https://cors-anywhere.herokuapp.com/https://baobaxia.mocambos.net/api/mocambos/rede/bbx/search/imagem/limit/20/20')
        .then((suc) => {
          this.imagens = suc.data
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
