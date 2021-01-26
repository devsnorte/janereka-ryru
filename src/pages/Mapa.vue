<template>
<l-map style="height: 88vh" :zoom="zoom" :center="center">
  <l-tile-layer :url="url"></l-tile-layer>
  <l-marker :lat-lng="center" >
    <l-tooltip>
      Ofereço: <strong>Serviço de pedreiro </strong><br>
      Troco por:  <strong> Almoço</strong>
    </l-tooltip>
  </l-marker>
  <!-- <l-marker
    :lat-lng="center"
    :icon="icon"
  /> -->
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
      center: [-23.622160599999997, -46.638571999999996],
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
