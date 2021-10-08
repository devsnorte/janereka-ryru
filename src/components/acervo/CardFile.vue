<template>
  <div class="bg-accent" style="height: 300px;">

    <div class="fit media-buttons-overlay">
      <div class="row absolute-center text-secondary">
        <q-icon name="description" style="font-size: 4rem;" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardFile',

  props: {
    media: {
      type: Object,
      required: true
    }
  }
}
</script>
