<template>
  <div class="row q-col-gutter-md">
    <div class="col-12">
      <q-table
        grid
        title="Acervo"
        row-key="id"
        :loading="loading"
        :columns="columns"
        :data="$props.midias"
        :pagination="initialPagination"
        card-container-class="q-col-gutter-md"
        color="primary"
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
            v-model="activeTab"
            @input="$emit('filterContent', activeTab)"
          >
            <q-tab class="row" name="all" icon="perm_media" label="Todos" />
            <q-tab class="row" name="arquivo" icon="folder" label="Arquivos" />
            <q-tab class="row" name="imagem" icon="image" label="Imagens" />
            <q-tab class="row" name="video" icon="theaters" label="Vídeos" />
            <q-tab class="row" name="audio" icon="volume_up" label="Áudios" />
          </q-tabs>

        </template>

        <template v-slot:item="props">
          <card-wrapper
            class="col-xs-12 col-sm-4 col-md-4"
            :card="props.row"
          />
        </template>

      </q-table>
    </div>
  </div>
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
