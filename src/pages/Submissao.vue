<template>
  <q-page>
      <create-midia />
  </q-page>
</template>

<script>
export default {
  name: 'Submissao',

  components: {
    CreateMidia: () => import('components/acervo/CreateMidia')
  }
}
</script>
