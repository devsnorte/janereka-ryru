<template>
    <div>
        <q-header elevated class="bg-grey-1">
            <q-toolbar class="text-dark">

                <q-toolbar-title>
                <div>
                    <img class="q-pt-sm q-ml-sm" src="~/assets/janeraka.svg" height="50px" alt="">
                </div>
                </q-toolbar-title>

                <q-tabs align="left" active-color="primary" indicator-color="red">
                <q-route-tab
                    v-for="(tab, index) in essentialLinks"
                    :key="index"
                    :label="tab.title"
                    exact
                    content-class="text-weight-thin"
                    :to="{ name: tab.route }"
                    no-caps
                />
                </q-tabs>
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
    </div>
</template>

<script>
import EssentialLink from './EssentialLink'

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
  name: 'AssetHeader',
  components: { EssentialLink },
  data () {
    return {
      essentialLinks: linksData,
      leftDrawerOpen: false
    }
  }
}
</script>
