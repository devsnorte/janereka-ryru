<template>
  <div class="bg-accent text-white text-center q-pa-lg flex flex-center">
    <div class="q-pb-lg">
      <div style="font-size: 20vh">
        404
      </div>

      <div :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'" style="opacity:.6">
        Página não existe...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="accent"
        unelevated
        to="/"
        label="Ir para página inicial"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
