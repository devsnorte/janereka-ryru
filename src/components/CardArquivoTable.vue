<template>
  <div class="col-xs-12 col-sm-4 col-md-4">
    <q-card class="cursor-pointer fit" @click="modal = !modal">
      <q-card-section class="text-center">
        <q-icon
          name="description"
          class="text-primary"
          style="font-size: 4rem;"
        />
        <p class="text-caption">Visualizar</p>
      </q-card-section>
      <q-card-section>
        <p class="text-body1 text-weight-bold">
          {{ card.name }}
        </p>
        <strong>Autor:</strong> {{ card.author }}
      </q-card-section>
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
            <q-pdfviewer
              v-model="modal"
              :src="`${baseUrl}${card.url}`"
              type="pdfjs"
              style="height: 500px"
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
  name: 'CardItemTable',
  props: {
    card: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      baseUrl: 'https://cors-anywhere.herokuapp.com/https://baobaxia.mocambos.net/',
      modal: false
    }
  },
  methods: {
    // fetchPDF (payload) {
    //   this.$axios.post('/inpatientPDFs/snr/download', payload, { responseType: 'blob' }).then(res => {
    //     // console.log('am i downloading?', res)
    //     const blob = new Blob([res.data], { type: res.data.type })
    //     const url = window.URL.createObjectURL(blob)
    //     pdfSrc = url // where pdfSrc is used in the :src parameter of the qpdfviewer
    //   }).catch(err => {
    //     console.log('or do i have an error?', err) // TODO beef up this
    //     this.$q.notify({ message: 'Error downloading PDF', type: 'negative', textColor: 'white', color: 'negative', icon: 'error', closeBtn: 'close', position: 'top' })
    //   })
    // }
  }
}
</script>
