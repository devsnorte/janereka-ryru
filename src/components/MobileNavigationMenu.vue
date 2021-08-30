<template>
  <q-list class="text-bold text-uppercase text-center q-pt-xl">
    <q-item exact clickable :to="{name: 'home'}">
      <q-item-section>
        <q-item-label>{{ $t('menus.navigationHome') }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: 'sobre'}">
      <q-item-section>
        <q-item-label>{{ $t('menus.navigationAbout') }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: 'acervo'}">
      <q-item-section>
        <q-item-label>{{ $t('menus.navigationGallery') }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: 'contato' }">
      <q-item-section>
        <q-item-label>{{ $t('menus.navigationContact') }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'MobileNavigationMenu'
}
</script>
