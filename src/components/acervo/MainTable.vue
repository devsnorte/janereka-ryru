<template>
  <q-table
    grid
    row-key="id"
    :title="$t('gallery.mainTableTitle')"
    :loading="loading"
    :columns="columns"
    :data="$props.midias"
    :pagination.sync="pagination"
    :rows-per-page-label="$t('gallery.paginationRowsPerPageLabel')"
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
        <q-tab name="all" icon="perm_media" :label="$t('gallery.categoryLabelAll')" />
        <q-tab name="arquivo" icon="folder" :label="$t('gallery.categoryLabelFiles')" />
        <q-tab name="imagem" icon="image" :label="$t('gallery.categoryLabelImages')" />
        <q-tab name="video" icon="theaters" :label="$t('gallery.categoryLabelVideos')" />
        <q-tab name="audio" icon="volume_up" :label="$t('gallery.categoryLabelAudio')" />
      </q-tabs>

      <div class="top-side-buttons-wrapper">
        <q-btn unelevated icon="cloud_upload" color="primary" align="between"
          @click="sendMidia()" :label="$t('gallery.buttonLabelSend')"
        />
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

      <span>
        {{ firstIndexInPage }}-{{ lastIndexInPage }} {{ $t('gallery.paginationOfPage') }} {{ midias.length }}
      </span>

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
      activeTab: 'all',
      user: this.$axios.defaults.headers.common.token
      // isLogged: false
    }
  },

  computed: {
    /**
     * Returns 'true' or 'false' whether the user is
     * logged in, based on the presence of a token.
     *
     * @return {boolean}
     */
    isLogged: function () {
      console.log(this.$axios.defaults.headers.common.token)
      console.log(!!this.$axios.defaults.headers.common.token)
      return !!this.$axios.defaults.headers.common.token
    },

    /**
     * Represents the count of the last item in the current page.
     * @return {number}
     */
    lastIndexInPage: function () {
      // Determine how many pages are available
      const maxPages = Math.ceil(this.midias.length / this.pagination.rowsPerPage)
      // If viewing the last page, simply return the array length
      if (maxPages === this.pagination.page) {
        return this.midias.length
      }
      return this.pagination.page * this.pagination.rowsPerPage
    },

    /**
     * Represents the count of the first item in the current page.
     * @return {number}
     */
    firstIndexInPage: function () {
      const maxInPage = this.pagination.page * this.pagination.rowsPerPage
      return maxInPage - this.pagination.rowsPerPage + 1
    }
  },

  methods: {
    sendMidia () {
      this.$router.push('/submissao')
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
/* top-side-buttons-wrapper */
@media only screen and (max-width: 1153px) {
  .top-side-buttons-wrapper {
    margin-left: auto !important;
    margin-right: auto !important;
  }
}
</style>
