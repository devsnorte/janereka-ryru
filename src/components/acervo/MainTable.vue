<template>
  <q-table
    grid
    title="Acervo"
    row-key="id"
    :loading="loading"
    :columns="columns"
    :data="$props.midias"
    :pagination="initialPagination"
    :rows-per-page-options="[6, 12, 18, 24, 30, 0]"
    card-container-class="q-col-gutter-md"
  >

    <template v-slot:top>

      <div class="row col-12">
        <h1 class="col-8 no-margin text-h5">Acervo</h1>
        <q-input class="col-4" borderless dense debounce="300" placeholder="Pesquisar">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>

      <q-tabs
        inline-label
        align="left"
        active-color="primary"
        v-model="activeTab"
        @input="$emit('filterContent', activeTab)"
      >
        <q-tab name="all" icon="perm_media" label="Todos" />
        <q-tab name="arquivo" icon="folder" label="Arquivos" />
        <q-tab name="imagem" icon="image" label="Imagens" />
        <q-tab name="video" icon="theaters" label="Vídeos" />
        <q-tab name="audio" icon="volume_up" label="Áudios" />
      </q-tabs>

    </template>

    <template v-slot:item="props">
      <card-wrapper
        :class="[
          'col-xs-12', 'col-sm-6', 'col-md-4',
          {'fixed-height-card': activeTab === 'arquivo' || activeTab === 'audio'}
        ]"
        :card="props.row"
      />
    </template>

  </q-table>
</template>

<script>
export default {
  name: 'MainTable',

  components: {
    CardWrapper: () => import('components/CardWrapper')
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
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 12
      },
      activeTab: 'all'
    }
  }
}
</script>

<style scoped>
.fixed-height-card {
  height: 250px;
}
</style>
