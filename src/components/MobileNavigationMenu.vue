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

    <q-item exact clickable :to="{name: 'usuario'}" v-if="sessionData.user">
      <q-item-section>
        <q-item-label>{{ $t('menus.navigationUserArea') }}</q-item-label>
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
import { Session } from 'src/api/SessionManager'
import { getters } from 'src/store/session-store'

export default {
  name: 'MobileNavigationMenu',

  data () {
    return {
      sessionManager: Session.getSessionManager(),
      sessionData: getters.session()
    }
  },

  mounted () {
    // Refresh session data from Local Storage
    this.sessionManager.getSession()
  }
}
</script>
