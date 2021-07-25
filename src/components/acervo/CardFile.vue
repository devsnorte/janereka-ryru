<template>
  <div class="bg-accent" style="height: 300px;">

    <div class="fit media-buttons-overlay">
      <div class="row absolute-center text-secondary">
        <q-icon name="description" style="font-size: 4rem;" />
      </div>
    </div>
    <q-pdfviewer
      :src="`${baseUrl}/acervo/download/${midia.path}`"
      type="pdfjs"
      style="height: 500px"
    />

    <q-pdfviewer
      :src="`${baseUrl}/acervo/download/${midia.path}`"
      type="pdfjs"
      style="height: 500px"
    />

  </div>
</template>

<script>
export default {
  name: 'CardFile',

  props: {
    midia: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      baseUrl: this.$axios.defaults.baseURL
    }
  }
}
</script>
