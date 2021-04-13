<template>
    <div>
        <q-header elevated class="bg-grey-1">
            <q-toolbar class="text-dark">

                <q-toolbar-title shrink>
                  <q-img src="~/assets/janeraka.svg" width="3.2em" />
                </q-toolbar-title>

                <q-tabs shrink align="right" active-color="primary" indicator-color="transparent" :breakpoint="0">
                  <q-route-tab
                      v-for="(tab, index) in essentialLinks"
                      :key="index"
                      :label="tab.title"
                      :to="{ name: tab.route }"
                      exact
                      no-caps
                      content-class="test"
                  />
                </q-tabs>
            </q-toolbar>
        </q-header>

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
    title: 'Sobre',
    caption: '',
    icon: 'photo_library',
    route: 'sobre'
  },
  {
    title: 'Acervo',
    caption: '',
    icon: 'video_library',
    route: 'acervo'
  }
]

export default {
  name: 'PageHeader',
  components: { EssentialLink },
  data () {
    return {
      essentialLinks: linksData,
      leftDrawerOpen: false
    }
  }
}
</script>
