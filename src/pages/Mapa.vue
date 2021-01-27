<template>
<l-map style="height: 88vh" :zoom="zoom" :center="center">
  <l-tile-layer :url="url"></l-tile-layer>
  <l-marker :lat-lng="center" >
    <l-tooltip>
      Ofereço: <strong>Banana </strong><br>
      Troco por: <strong>Peixe</strong>
    </l-tooltip>
  </l-marker>
  <l-marker
    :lat-lng="center2"
    :icon="icon"
  >
    <l-tooltip>
      Ofereço: <strong>Madeira </strong><br>
      Troco por: <strong>Tijolo</strong>
    </l-tooltip>
  </l-marker>
</l-map>
</template>

<script>
// LMarker, LIcon
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LTooltip } from 'vue2-leaflet'

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip
    // LIcon
  },
  data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 20,
      center: [-1.4092054999999999, -48.468170099999995],
      center2: [-1.4082054999999999, -48.467170099999995],
      icon: L.icon({
        iconUrl: 'icons/favicon-32x32.png',
        iconSize: [40, 40],
        iconAnchor: [16, 37]
      }),
      staticAnchor: [16, 37],
      customText: 'Foobar',
      iconSize: 64
    }
  },
  computed: {
    dynamicSize () {
      return [this.iconSize, this.iconSize * 1.15]
    },
    dynamicAnchor () {
      return [this.iconSize / 2, this.iconSize * 1.15]
    }
  }
}
</script>
