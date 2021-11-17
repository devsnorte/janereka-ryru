<template>
  <div>
    <div @click="toggleModal()">
      <q-card class="cursor-pointer fit" style="overflow: hidden;">

        <!-- File card -->
        <card-file v-if="card.tipo == 'arquivo'" :media="card" />

        <!-- Image card -->
        <card-image v-if="card.tipo == 'imagem'" :media="card" />

        <!-- Video card -->
        <card-video v-if="card.tipo == 'video'" :media="card" />

        <!-- Audio card -->
        <card-audio v-if="card.tipo == 'audio'" :media="card" />

        <!-- Title/Author overlay -->
        <q-card-section class="text-white bottom-overlay">
          <p class="text-h6">{{ card.titulo }}</p>
          <strong>{{ $t('gallery.mediaDetailsAuthor') }}</strong> {{ card.autor }}
        </q-card-section>

      </q-card>
      <div
        v-if="this.$route.name === 'usuario' && card.status === 'draft'"
        align="center"
        class="text-white text-bold text-uppercase bg-primary q-py-xs"
      >
          {{ $t('user.isFilePublished') }}
      </div>
    </div>

    <!-- Contents view -->
    <q-dialog
      v-model="modal"
      persistent
      maximized
    >
      <contents-file v-if="card.tipo == 'arquivo'" :media="card" :allowEdition="allowMediaEdition" />
      <contents-image v-if="card.tipo == 'imagem'" :media="card" :allowEdition="allowMediaEdition" />
      <contents-video v-if="card.tipo == 'video'" :media="card" :allowEdition="allowMediaEdition" />
      <contents-audio v-if="card.tipo == 'audio'" :media="card" :allowEdition="allowMediaEdition" />
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
    },
    allowMediaEdition: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data () {
    return {
      baseUrlImg: this.$axios.defaults.baseURL,
      modal: false
    }
  },

  methods: {
    toggleModal () {
      this.modal = !this.modal
      this.$emit('closeMenus')
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
  opacity: 0.8;
}
.media-buttons-overlay:hover {
  opacity: 1;
}
</style>
