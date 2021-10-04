<template>
  <q-page class="flex flex-center">
      <create-media />
  </q-page>
</template>

<script>
export default {
  name: 'Submissao',

  components: {
    CreateMedia: () => import('components/acervo/CreateMedia')
  }
}
</script>
