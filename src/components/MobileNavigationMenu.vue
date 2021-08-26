<template>
  <q-list>
    <q-item exact clickable :to="{name: home.route}">
      <q-item-section>
        <q-item-label>{{ home.label }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: about.route}">
      <q-item-section>
        <q-item-label>{{ about.label }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: gallery.route}">
      <q-item-section>
        <q-item-label>{{ gallery.label }}</q-item-label>
      </q-item-section>
    </q-item>

    <q-item exact clickable :to="{name: contact.route}">
      <q-item-section>
        <q-item-label>{{ contact.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'MobileNavigationMenu',

  data () {
    return {
      home: {
        label: this.$t('menus.navigationHome'),
        route: 'home'
      },
      about: {
        label: this.$t('menus.navigationAbout'),
        route: 'sobre'
      },
      gallery: {
        label: this.$t('menus.navigationGallery'),
        route: 'acervo'
      },
      contact: {
        label: this.$t('menus.navigationContact'),
        route: 'acervo'
      }
    }
  }
}
</script>
