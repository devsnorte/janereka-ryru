<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        /> -->

        <q-toolbar-title>
          <div style="font-family: monument;">
            Janereka
          </div>
        </q-toolbar-title>

        <div class="gt-xs">
          <q-tabs align="right" shrink>
            <q-route-tab
              v-for="(tab, index) in essentialLinks"
              :key="index"
              :label="tab.title"
              exact
              content-class="text-weight-thin"
              :to="{ name: tab.route }"
            />
          </q-tabs>
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="lt-sm">
      <q-tabs
        align="justify"
        dense
        no-caps
        indicator-color="white"
        class="bg-white text-weight-thin text-grey-7"
        active-color="dark"
      >
        <q-route-tab
          v-for="(tab, index) in essentialLinks"
          :key="index"
          :icon="tab.icon"
          :label="tab.title"
          content-class="text-weight-thin"
          :to="{ name: tab.route }"
        />
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      overlay
      behavior="mobile"
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu de opções
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

const linksData = [
  {
    title: 'Início',
    caption: '',
    icon: 'home',
    route: 'home'
  },
  {
    title: 'Imagens',
    caption: '',
    icon: 'photo_library',
    route: 'imagens'
  },
  {
    title: 'Vídeos',
    caption: '',
    icon: 'video_library',
    route: 'videos'
  },
  {
    title: 'Áudios',
    caption: '',
    icon: 'audiotrack',
    route: 'audios'
  },
  {
    title: 'Arquivos',
    caption: '',
    icon: 'picture_as_pdf',
    route: 'arquivos'
  },
  {
    title: 'Mapa',
    caption: '',
    icon: 'map',
    route: 'mapa'
  }
]

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>

<style scoped>
.q-tab {
  padding: 0 13px !important;
}
</style>
