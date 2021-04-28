<template>
<q-page padding>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-table
        grid
        :loading="loading"
        title="Acervo"
        :data="midiaInfos"
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
      baseUrl: 'http://mucuas.taina.net.br:8067/acervo/download/',
      midiaInfos: [],
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
      imagens: [],
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
        this.midiaInfos = data
        this.loading = false
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
