<template>
<q-page padding>
  <main-table
    :loading="loading"
    :midias="filteredMidias"
    @filterContent="filterContent($event)"
   />
  <!-- <div class="row q-col-gutter-md">
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
  </div> -->
</q-page>
</template>

<script>

export default {
  name: 'Acervo',
  components: {
    // CardItemsTable: () => import('components/CardItemsTable'),
    MainTable: () => import('components/MainTable')
  },
  data () {
    return {
      allMidias: [],
      filteredMidias: [],
      // filter: '',
      // initialPagination: {
      //   sortBy: 'desc',
      //   descending: false,
      //   page: 1,
      //   rowsPerPage: 6
      // },
      // columns: [
      //   { name: 'titulo', label: 'titulo', field: 'titulo' },
      //   { name: 'descricao', label: 'descricao', field: 'descricao' }
      // ],
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
      console.log(`Filtering data by content type: ${contentType}.`)

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
