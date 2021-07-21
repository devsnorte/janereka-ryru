<template>
  <div class="col-xs-12 col-sm-4 col-md-4">
    <q-card class="cursor-pointer fit" @click="modal = !modal">

      <!-- File card -->
      <div v-if="card.data.tipo == 'arquivo'">
        <q-icon
          name="description"
          class="text-primary"
          style="font-size: 4rem; height: 300px"
        />
      </div>

      <!-- Image card -->
      <q-img
        v-if="card.data.tipo == 'imagem'"
        :src="`${baseUrlImg}/acervo/download/${card.path}`"
        :ratio="16/9"
      >
        <!-- <div class="absolute-bottom text-h6">
          {{ card.data.titulo }}
        </div> -->
      </q-img>

      <!-- Video card -->
      <q-media-player
        v-if="card.data.tipo == 'video'"
        type="video"
        :sources="[{
          src: `${baseUrlImg}/acervo/download/${card.path}`
        }]"
        content-style="height: 275px;"
        radius='10px'
        color="green-2"
        show-big-play-button
      >

        <template v-slot:bigPlayButton>
          <div class="row absolute-center z-top text-white media-buttons">
            <q-icon name="theaters" style="font-size: 4rem;" />
            <q-icon name="play_arrow" style="font-size: 4rem;" />
          </div>
        </template>

        <!-- Omit controls through a hidden v-slot -->
          <template v-slot:controls>
            <p hidden></p>
          </template>
      </q-media-player>

      <!-- Audio card -->
      <div v-if="card.data.tipo == 'audio'">
        <q-media-player
          class="full-height"
          type="audio"
          :sources="[{
            src: `${baseUrlImg}/acervo/download/${card.path}`,
            type: `${card.type}/${card.format}`
          }]"
          content-style="height: 275px;"
          radius='10px'
          color="green-2"
          background-color="primary"
        >

          <template v-slot:overlay>
            <div class="row absolute-center z-top text-white media-buttons">
              <q-icon name="volume_up" style="font-size: 4rem;" />
              <q-icon name="play_arrow" style="font-size: 4rem;" />
            </div>
          </template>

          <!-- Omit controls through a hidden v-slot -->
          <template v-slot:controls>
            <p hidden></p>
          </template>
        </q-media-player>

        <!-- <q-card-section>
          <p class="text-body1 text-weight-bold">
            {{ card.data.titulo }}
          </p>
        </q-card-section> -->
      </div>

      <!-- <div class="absolute-bottom dimmed"> -->
      <q-card-section class="absolute-bottom text-white bottom-overlay">
        <p class="text-h6">{{ card.data.titulo }}</p>
        <strong>Autor:</strong> {{ card.creator.username }}
      </q-card-section>
      <!-- </div> -->

    </q-card>

    <!-- Contents zoom -->
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
            :src="`${baseUrlImg}/acervo/download/${card.path}`"
            basic
            :ratio="16/9"
            spinner-color="primary"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ card.data.descricao }}
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
  name: 'CardWrapper',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseUrlImg: this.$axios.defaults.baseURL,
      modal: false
    }
  }
}
</script>

<style>
.bottom-overlay {
  overflow: hidden;
  background-color: rgba(0,0,0,0.4) !important;
}
.media-buttons {
  opacity: 0.6;
}
.media-buttons:hover {
  opacity: 1;
}
</style>
