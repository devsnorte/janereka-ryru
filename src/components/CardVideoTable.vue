<template>
  <div class="col-xs-12 col-sm-4 col-md-4">
    <q-card>
      <q-media-player
        type="video"
        :sources="[{
          src: `${baseUrl}${card.url}`,
          type: `${card.type}/${card.format}`
        }]"
        content-style="height: 200px;"
        color="green-2"
        dark
      />
      <q-card-section>
        <strong>Autor:</strong> {{ card.author }}
      </q-card-section>
      <q-card-actions vertical>
        <q-btn flat color="primary" @click="modal = !modal">
          Mais detalhes
        </q-btn>
      </q-card-actions>
    </q-card>
    <q-dialog
      v-model="modal"
      persistent
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="row items-center text-primary">
          <div class="text-h6">{{ card.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-media-player
            type="video"
            :sources="[{
              src: `${baseUrl}${card.url}`,
              type: `${card.type}/${card.format}`
            }]"
            color="green-2"
            dark
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ card.note }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn label="Fechar" v-close-popup color="dark"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'CardVideoTable',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseUrl: this.$axios.defaults.baseURL,
      modal: false
    }
  }
}
</script>
