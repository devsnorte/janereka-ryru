<template>
<q-page padding>
  <div class="row q-col-gutter-md">
    <div class="col-3" v-for="midia in midias" :key="midia.smid">
      <q-card class="my-card">
        <img src="https://cdn.quasar.dev/img/mountains.jpg">

        <q-card-section>
          <div class="text-h6"> {{ midia.data.titulo }}</div>
          <div class="text-subtitle2">{{ midia.creator.username }}</div>
          <div class="text-subtitle2">{{  midia.data.tipo }}</div>
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
      midias: []
    }
  },
  mounted () {
    this.getMidia()
  },
  methods: {
    async getMidia () {
      try {
        const { data } = await this.$axios.get('/acervo/midia')
        this.midias = data
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
