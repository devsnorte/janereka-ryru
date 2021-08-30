<template>
  <div>
    <q-header elevated class="bg-grey-1">
      <q-toolbar class="row justify-center text-dark">

        <q-toolbar-title shrink class="q-ml-md">
          <q-img src="~/assets/janeraka.svg" width="3.2em" />
        </q-toolbar-title>

        <q-tabs
          shrink
          active-color="primary"
          indicator-color="transparent"
          class="gt-sm"
          :breakpoint="0"
        >
          <q-route-tab
            exact
            :to="{ name: 'home' }"
            :label="$t('menus.navigationHome')"
          />
          <q-route-tab
            exact
            :to="{ name: 'sobre' }"
            :label="$t('menus.navigationAbout')"
          />
          <q-route-tab
            exact
            :to="{ name: 'acervo' }"
            :label="$t('menus.navigationGallery')"
          />
          <q-route-tab
            exact
            :to="{ name: 'contato' }"
            :label="$t('menus.navigationContact')"
          />
        </q-tabs>

        <div class="q-mr-sm" style="position: absolute; right: 0;">
          <q-btn
            outline
            icon="language"
            color="grey-8"
            class="gt-sm"
            :label="`${$t('menus.langSwitch')} | ${locales[locale]}`"
            @click="showLanguages = !showLanguages"
          />
          <q-btn
            flat dense round
            icon="language"
            size="1.1em"
            color="grey-9"
            class="lt-md"
            @click="showLanguages = !showLanguages"
          />
          <q-btn
            flat dense round
            icon="menu"
            aria-label="Menu"
            size="lg"
            color="grey-9"
            class="lt-md"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />

          <q-menu
            fit no-parent-event
            v-model="showLanguages"
          >
            <q-list style="min-width: 120px;">
              <q-item clickable v-close-popup @click="setLanguage('pt')">
                <q-item-section>
                  <q-item-label>Português</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="setLanguage('awaete')">
                <q-item-section>
                  <q-item-label>Awaete</q-item-label>
                </q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="setLanguage('en-us')">
                <q-item-section>
                  <q-item-label>English</q-item-label>
                </q-item-section>
              </q-item>

            </q-list>
          </q-menu>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      bordered overlay show-if-above
      side="right"
      behavior="mobile"
      content-class="bg-grey-1"
      v-model="rightDrawerOpen"
    >
      <q-btn
        flat round
        icon="close"
        color="grey-9"
        class="on-left absolute-top-right"
        @click="rightDrawerOpen = !rightDrawerOpen"
      />

      <MobileNavigationMenu />

    </q-drawer>
  </div>
</template>

<script>
import MobileNavigationMenu from './MobileNavigationMenu'

export default {
  name: 'PageHeader',

  components: { MobileNavigationMenu },

  data () {
    return {
      rightDrawerOpen: false,
      showLanguages: false,
      locale: this.$i18n.locale,
      locales: {
        pt: 'Português',
        awaete: 'Awaete Jeyga',
        'en-us': 'English'
      }
    }
  },

  watch: {
    locale: function (newLocale) {
      this.$i18n.locale = newLocale
    }
  },

  methods: {
    setLanguage (locale) {
      this.locale = locale
    }
  }
}
</script>

<style>
.q-tab__label {
  font-weight: 700;
}
</style>
