<template>
  <q-layout view="hHh lpR fff">
    <PageHeader />

    <q-page-container>
      <router-view />
    </q-page-container>

    <PageFooter />
  </q-layout>
</template>

<script>
import PageHeader from 'components/PageHeader'
import PageFooter from 'components/PageFooter'

export default {
  name: 'MainLayout',
  components: { PageHeader, PageFooter }
}
</script>
