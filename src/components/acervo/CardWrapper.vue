<template>
  <div>
    <q-card class="cursor-pointer fit" style="overflow: hidden;" @click="modal = !modal">

      <!-- File card -->
      <card-file v-if="card.data.tipo == 'arquivo'" :media="card" />

      <!-- Image card -->
      <card-image v-if="card.data.tipo == 'imagem'" :media="card" />

      <!-- Video card -->
      <card-video v-if="card.data.tipo == 'video'" :media="card" />

      <!-- Audio card -->
      <card-audio v-if="card.data.tipo == 'audio'" :media="card" />

      <!-- Title/Author overlay -->
      <q-card-section class="absolute-bottom text-white bottom-overlay">
        <p class="text-h6">{{ card.data.titulo }}</p>
        <strong>{{ $t('gallery.mediaDetailsAuthor') }}</strong> {{ card.creator.username }}
      </q-card-section>

    </q-card>

    <!-- Contents view -->
    <q-dialog
      v-model="modal"
      persistent
      maximized
    >
      <contents-file v-if="card.data.tipo == 'arquivo'" :media="card" />
      <contents-image v-if="card.data.tipo == 'imagem'" :media="card" />
      <contents-video v-if="card.data.tipo == 'video'" :media="card" />
      <contents-audio v-if="card.data.tipo == 'audio'" :media="card" />
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'CardWrapper',

  components: {
    CardFile: () => import('components/acervo/CardFile'),
    CardImage: () => import('components/acervo/CardImage'),
    CardVideo: () => import('components/acervo/CardVideo'),
    CardAudio: () => import('components/acervo/CardAudio'),
    ContentsFile: () => import('components/acervo/ContentsFile'),
    ContentsImage: () => import('components/acervo/ContentsImage'),
    ContentsVideo: () => import('components/acervo/ContentsVideo'),
    ContentsAudio: () => import('components/acervo/ContentsAudio')
  },

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
  border-radius: 0 0 10px 10px;
  background-color: rgba(0,0,0,0.4) !important;
}
.media-buttons-wrapper {
  border-radius: 15px;
}
.media-buttons-overlay {
  overflow: hidden;
  border-radius: 15px;
  opacity: 0.6;
}
.media-buttons-overlay:hover {
  opacity: 1;
}
</style>
