<template>
    <div>
        <q-header elevated class="bg-grey-1">
            <q-toolbar class="text-dark">
                <q-toolbar-title class="q-ml-md gt-sm" shrink>
                  <q-img src="~/assets/janeraka.svg" width="3.2em" />
                </q-toolbar-title>

                <q-tabs class="gt-sm" shrink align="right" active-color="primary" indicator-color="transparent" :breakpoint="0">
                  <q-route-tab
                      :label="$t('menus.navigationHome')"
                      :to="{ name: 'home' }"
                      exact
                      no-caps
                      content-class="test"
                  />
                  <q-route-tab
                      :label="$t('menus.navigationAbout')"
                      :to="{ name: 'sobre' }"
                      exact
                      no-caps
                      content-class="test"
                  />
                  <q-route-tab
                      :label="$t('menus.navigationGallery')"
                      :to="{ name: 'acervo' }"
                      exact
                      no-caps
                      content-class="test"
                  />
                  <q-route-tab
                      :label="$t('menus.navigationContact')"
                      :to="{ name: 'contato' }"
                      exact
                      no-caps
                      content-class="test"
                  />
                </q-tabs>
                <q-space />
                <q-select
                  v-model="locale"
                  :options="localeOptions"
                  :label="$t('menus.langSwitch')"
                  dense
                  borderless
                  emit-value
                  map-options
                  options-dense
                  style="min-width: 150px"
                />
                <q-btn
                  class="lt-md"
                  flat
                  dense
                  size="lg"
                  round
                  icon="menu"
                  aria-label="Menu"
                  @click="rightDrawerOpen = !rightDrawerOpen"
                />
            </q-toolbar>
        </q-header>

        <q-drawer
            v-model="rightDrawerOpen"
            show-if-above
            bordered
            overlay
            side="right"
            behavior="mobile"
            content-class="bg-grey-1"
        >
            <q-btn flat round color="grey-9" icon="close" class="on-left absolute-top-right" @click="rightDrawerOpen = !rightDrawerOpen" />
            <q-list class="text-bold text-uppercase text-center q-pt-xl">
                <EssentialLink
                  v-for="link in navigation"
                  :key="link.title"
                  v-bind="link"
                />
            </q-list>
        </q-drawer>
    </div>
</template>

<script>
import EssentialLink from './EssentialLink'

export default {
  name: 'PageHeader',

  components: { EssentialLink },

  data () {
    return {
      navigation: {
        home: {
          title: this.$t('menus.navigationHome'),
          caption: '',
          route: 'home'
        },
        about: {
          title: this.$t('menus.navigationAbout'),
          caption: '',
          route: 'sobre'
        },
        gallery: {
          title: this.$t('menus.navigationGallery'),
          caption: '',
          route: 'acervo'
        },
        contact: {
          title: this.$t('menus.navigationContact'),
          caption: '',
          route: 'acervo'
        }
      },
      rightDrawerOpen: false,
      locale: this.$i18n.locale,
      localeOptions: [
        { value: 'pt', label: 'Português' },
        { value: 'awaete', label: 'Awaete' },
        { value: 'en-us', label: 'English' }
      ]
    }
  },

  watch: {
    locale: function (newLocale) {
      this.$i18n.locale = newLocale
    }
  }
}
</script>
