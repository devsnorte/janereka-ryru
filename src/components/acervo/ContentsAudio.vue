<template>
  <q-card class="full-width z-max">
    <q-card-section class="row items-center text-primary">
      <div class="text-h6">{{ midia.data.titulo }}</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-separator />

    <q-media-player
      type="audio"
      :sources="[{
        src: `${baseUrl}/acervo/download/${midia.path}`,
        type: `${midia.type}/${midia.format}`
      }]"
      radius='10px'
      color="green-2"
      class="q-ma-md"
      dark
    />

    <q-card-section class="q-pt-none q-mb-xl">
      <midia-details
        :description="midia.data.descricao"
        :created="midia.created"
        :username="midia.creator.username"
        :authorName="midia.creator.name"
        :authorEmail="midia.creator.email"
      />
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal fixed-bottom">
      <q-btn :label="$t('gallery.buttonLabelClose')" v-close-popup color="dark"/>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ContentsAudio',

  components: {
    MidiaDetails: () => import('components/acervo/MidiaDetails')
  },

  props: {
    midia: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      baseUrl: this.$axios.defaults.baseURL
    }
  }
}
</script>
