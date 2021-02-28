<template>
  <q-page>
    <l-map
      v-if="show"
      :zoom="zoom"
      :center="center"
      class="map-size"
    >
      <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="(maker, index) in makers"
          :key="index"
          :lat-lng="[maker.lat, maker.long]"
          :icon="icon"
          @click="showDialog"
        >
          <l-tooltip>
            Ofereço: <strong>Aulas de Quasar Framework </strong><br>
            Troco por: <strong>Pagamento PicPay</strong>
          </l-tooltip>
        </l-marker>
    </l-map>
    <q-dialog
      v-model="dialogInfo"
      position="right"
      full-height
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section class="bg-primary">
          <div class="text-h6 text-white">
            Detalhes
            <q-btn
              icon="close"
              class="text-white float-right"
              v-close-popup
              flat
            />
          </div>

        </q-card-section>

        <q-card-section class="text-body1">
          Nossa comunidade oferece peixe em troca de lenha para fogão, tijolo e telha.
        </q-card-section>

        <q-card-section class="text-body1">
          Comunidade: Janekara
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal absolute-bottom q-pb-sm">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import L from 'leaflet'

export default {
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [0, 0],
      makers: [{ lat: 0, long: 0 }],
      icon: L.icon({
        iconUrl: 'cocar2.png',
        iconSize: [40, 40],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64,
      show: false,
      dialogInfo: true
    }
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    async getGeolocation () {
      if (navigator.geolocation) {
        this.$q.loading.show()
        const options = { timeout: 60000 }
        navigator.geolocation.getCurrentPosition(
          this.setPosition,
          this.errorPosition,
          options
        )
      } else {
        this.errorPosition()
      }
    },
    async setPosition (position) {
      const { latitude, longitude } = await position.coords
      this.setCenter(latitude, longitude)
      this.makers.push({ lat: latitude, long: longitude })
      this.makers.push(
        { lat: latitude + 0.0005, long: longitude + 0.0005 },
        { lat: latitude + 0.0008, long: longitude + 0.0008 },
        { lat: latitude + 0.0003, long: longitude + 0.0008 },
        { lat: latitude + 0.0013, long: longitude + 0.0011 },
        { lat: latitude - 0.0005, long: longitude - 0.0005 },
        { lat: latitude - 0.0008, long: longitude - 0.0008 },
        { lat: latitude - 0.0003, long: longitude - 0.0008 },
        { lat: latitude - 0.0013, long: longitude - 0.0011 }
      )
      this.$q.loading.hide()
    },
    errorPosition () {
      this.center = [0, 0]
      this.$q.notify({
        position: 'bottom',
        timeout: 3000,
        color: 'negative',
        textColor: 'white',
        actions: [{ icon: 'close', color: 'white' }],
        message: 'Não foi possível recupera sua posição!'
      })
      this.$q.loading.hide()
    },
    setCenter (latitude, longitude) {
      console.log('CHAMOU CENTRALIZAR:', { latitude, longitude })
      this.center = [latitude, longitude]
      // this.$refs.map.mapObject.panTo([latitude, longitude])
      this.show = true
    },
    showDialog () {
      this.dialogInfo = true
      console.log('show')
    }
  }
}
</script>

<style scoped>
.map-size {
  /* Firefox */
  height: -moz-calc(100% - 50px);
  /* WebKit */
  height: -webkit-calc(100% - 50px);
  /* Opera */
  height: -o-calc(100% - 50px);
  /* Standard */
  height: calc(100% - 50px);
}
</style>
