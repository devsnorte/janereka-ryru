<template>
  <q-page padding>
    <div class="row">
      <div class="col-12">
        <q-table
          grid
          :loading="loading"
          title="Acervo de Áudios"
          :data="audios"
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
          <card-audio-table
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
    CardAudioTable: () => import('components/CardAudioTable')
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
      audios: [],
      loading: false
    }
  },
  mounted () {
    this.getAudios()
  },
  methods: {
    async getAudios () {
      this.loading = true
      try {
        const response = await this.$axios.get('/audio/limit/20/20')
        this.audios = response.data
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
