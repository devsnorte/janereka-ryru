<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-table
          grid
          :loading="loading"
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
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Pesquisar">
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
export default {
  name: 'PageImagens',
  components: {
    CardItemTable: () => import('components/CardItemTable')
  },
  data () {
    return {
      filter: '',
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 6
      },
      columns: [
        { name: 'name', label: 'Name', field: 'name' },
        { name: 'author', label: 'Autor', field: 'author' }
      ],
      imagens: [],
      loading: false
    }
  },
  mounted () {
    this.getImages()
  },
  methods: {
    async getImages () {
      this.loading = true
      try {
        const response = await this.$axios.get('/imagens/limit/20/20')
        this.imagens = response.data
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
