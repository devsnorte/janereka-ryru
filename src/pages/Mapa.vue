<template>
  <q-page>
    <l-map style="height: 88vh" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>
        <l-marker
          v-for="(maker, index) in makers"
          :key="index"
          :lat-lng="[maker.lat, maker.long]"
          :icon="icon"
        >
          <l-tooltip>
            Ofereço: <strong>Aulas de Quasar Framework </strong><br>
            Troco por: <strong>Pagamento PicPay</strong>
          </l-tooltip>
        </l-marker>
      <!-- <l-marker
        :lat-lng="center2"
        :icon="icon"
      >
        <l-tooltip>
          Ofereço: <strong>Madeira </strong><br>
          Troco por: <strong>Tijolo</strong>
        </l-tooltip>
      </l-marker> -->
    </l-map>
  </q-page>
</template>

<script>
import L from 'leaflet'

export default {
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 20,
      center: [0, 0],
      makers: [0, 0],
      icon: L.icon({
        iconUrl: 'cocar2.png',
        iconSize: [40, 40],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    }
  },
  mounted () {
    this.getGeolocation()
  },
  methods: {
    getGeolocation () {
      if (navigator.geolocation) {
        this.$q.loading.show()
        navigator.geolocation.getCurrentPosition(this.setPosition, this.errorPosition)
      } else {
        this.errorPosition()
      }
    },
    setPosition (position) {
      const { latitude, longitude } = position.coords
      this.center = [latitude, longitude]
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
    }
  }
}
</script>
