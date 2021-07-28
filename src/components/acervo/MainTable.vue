<template>
  <q-table
    grid
    title="Acervo"
    row-key="id"
    :loading="loading"
    :columns="columns"
    :data="$props.midias"
    :pagination.sync="pagination"
    card-container-class="q-col-gutter-md"
  >

    <template v-slot:top>

      <q-tabs
        inline-label
        outside-arrows
        align="left"
        active-color="primary"
        class="col-grow q-mb-xs"
        v-model="activeTab"
        @input="$emit('filterContent', activeTab)"
      >
        <q-tab name="all" icon="perm_media" label="Todos" />
        <q-tab name="arquivo" icon="folder" label="Arquivos" />
        <q-tab name="imagem" icon="image" label="Imagens" />
        <q-tab name="video" icon="theaters" label="Vídeos" />
        <q-tab name="audio" icon="volume_up" label="Áudios" />
      </q-tabs>

      <div>
        <q-btn unelevated label="Enviar" icon="cloud_upload" color="primary" align="between" />
        <q-btn unelevated icon="search" color="primary" padding="6px" class="q-ml-xs"
          @click="$emit('toggleFilter')"
        />
      </div>

    </template>

    <template v-slot:item="props">
      <div class="col-xs-12 col-sm-6 col-md-4">
        <card-wrapper
          class="column col content-card"
          :card="props.row"
        />
      </div>
    </template>

    <template v-slot:pagination="scope">
      <q-btn
        icon="first_page"
        dense
        flat
        :disable="scope.isFirstPage"
        @click="scope.firstPage"
      />

      <q-btn
        icon="chevron_left"
        dense
        flat
        :disable="scope.isFirstPage"
        @click="scope.prevPage"
      />

      <span>{{ firstIndexInPage }}-{{ lastIndexInPage }} de {{ midias.length }}</span>

      <q-btn
        icon="chevron_right"
        dense
        flat
        :disable="scope.isLastPage"
        @click="scope.nextPage"
      />

      <q-btn
        icon="last_page"
        dense
        flat
        :disable="scope.isLastPage"
        @click="scope.lastPage"
      />
    </template>

    <!-- <template v-slot:pagination>
      <q-pagination
        :current="pagination.page"
        :max="5"
        direction-links
        boundary-links
      />
    </template> -->

  </q-table>
</template>

<script>
export default {
  name: 'MainTable',

  components: {
    CardWrapper: () => import('components/acervo/CardWrapper')
  },

  props: {
    loading: {
      type: Boolean,
      required: true,
      default: true
    },
    midias: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      columns: [
        {
          name: 'title',
          label: 'Título',
          field: midia => midia.data.titulo
        },
        {
          name: 'author',
          label: 'Autor',
          field: midia => midia.creator.username
        },
        {
          name: 'id',
          label: 'id',
          field: midia => midia.smid
        }
      ],
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 12
      },
      activeTab: 'all'
    }
  },

  computed: {
    lastIndexInPage: function () {
      // Determine how many pages are available
      const maxPages = Math.ceil(this.midias.length / this.pagination.rowsPerPage)
      // If viewing the last page, simply return the array length
      if (maxPages === this.pagination.page) {
        return this.midias.length
      }
      return this.pagination.page * this.pagination.rowsPerPage
    },

    firstIndexInPage: function () {
      const maxInPage = this.pagination.page * this.pagination.rowsPerPage
      return maxInPage - this.pagination.rowsPerPage + 1
    }
  }

}
</script>

<style scoped>
.content-card {
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  overflow: hidden;
  /* min-width: 300px; */
}
</style>
