<template>
    <div>
        <q-header elevated class="bg-grey-1">
            <q-toolbar class="text-dark">
                <q-toolbar-title class="q-ml-md gt-sm" shrink>
                  <q-img src="~/assets/janeraka.svg" width="3.2em" />
                </q-toolbar-title>

                <q-tabs class="gt-sm" shrink align="right" active-color="primary" indicator-color="transparent" :breakpoint="0">
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
                <q-space />
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
    route: 'home'
  },
  {
    title: 'Sobre',
    caption: '',
    route: 'sobre'
  },
  {
    title: 'Acervo',
    caption: '',
    route: 'acervo'
  }
]

export default {
  name: 'PageHeader',
  components: { EssentialLink },
  data () {
    return {
      essentialLinks: linksData,
      rightDrawerOpen: false
    }
  }
}
</script>
