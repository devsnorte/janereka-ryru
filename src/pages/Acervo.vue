<template>
<q-page padding>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="info in midiaInfos" :key="info.smid">
      <q-card>
        <img v-if="info.data.tipo == 'imagem'" :src="`${baseUrl}${info.path}`">

        <q-media-player
          v-if="info.data.tipo == 'video'"
          type="video"
          :sources="[{
            src: `${baseUrl}${info.path}`,
          }]"
          content-style="height: 200px;"
        />

        <q-card-section>
          <div class="text-h6"> {{ info.data.titulo }}</div>
          <div class="text-subtitle2">{{ info.creator.username }}</div>
          <div class="text-subtitle2">{{  info.data.tipo }}</div>
        </q-card-section>

        <!-- <q-card-section class="q-pt-none">
          TEXTO
        </q-card-section> -->
      </q-card>
    </div>
  </div>
</q-page>
</template>

<script>

export default {
  name: 'Acervo',
  data () {
    return {
      baseUrl: 'http://mucuas.taina.net.br:8067/acervo/download/',
      midiaInfos: []
    }
  },
  mounted () {
    this.getMidia()
  },
  methods: {
    async getMidia () {
      try {
        const { data } = await this.$axios.get('/acervo/midia')
        this.midiaInfos = data
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
