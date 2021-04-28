<template>
  <div class="col-xs-12 col-sm-4 col-md-4">
    <q-card class="cursor-pointer fit" @click="modal = !modal">
      <q-img
        v-if="card.data.tipo == 'imagem'"
        :src="`${baseUrlImg}${card.path}`"
        basic
        :ratio="16/9"
      >
        <div class="absolute-bottom text-h6">
          {{ card.data.titulo }}
        </div>
      </q-img>

      <q-media-player
        v-if="card.data.tipo == 'video'"
        type="video"
        :sources="[{
          src: `${baseUrlImg}${card.path}`
        }]"
        content-style="height: 300px;"
        color="green-2"
        dark
      />

      <q-card-section>
        <strong>Autor:</strong> {{ card.creator.username }}
      </q-card-section>
    </q-card>
    <q-dialog
      v-model="modal"
      persistent
      maximized
    >
      <q-card class="full-width">
        <q-card-section class="row items-center text-primary">
          <div class="text-h6">{{ card.name }}</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-img
            :src="`${baseUrlImg}${card.path}`"
            basic
            :ratio="16/9"
            spinner-color="primary"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ card.descricao }}
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal fixed-bottom">
          <q-btn label="Fechar" v-close-popup color="dark"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'CardItemTable',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseUrlImg: 'http://mucuas.taina.net.br:8067/acervo/download/',
      modal: false
    }
  }
}
</script>
