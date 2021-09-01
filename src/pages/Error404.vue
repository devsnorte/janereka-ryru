<template>
  <div class="bg-accent text-white text-center q-pa-lg flex flex-center">
    <div class="q-pb-lg">
      <div style="font-size: 20vh">
        404
      </div>

      <div :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'" style="opacity: 0.7">
        {{ $t('error404.pageTextTitle') }}
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="accent"
        unelevated
        to="/"
        :label="$t('error404.buttonLabelReturnHome')"
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
