<template>
<q-page padding>
  <div class="text-h4 text-weight-bold text-capitalize">username</div>
  <div class="text-caption text-weight-bold text-primary">Administrador</div>

  <q-btn
    class="q-mt-lg"
    outline
    color="white"
    text-color="black"
    type="submit"
    label="Logout"
    @click="logout"
  />
</q-page>
</template>

<script>
import { Session } from 'src/api/SessionManager'

export default {
  name: 'Admin',

  data () {
    return {
      session: Session.getSessionManager()
    }
  },

  methods: {
    logout () {
      this.session.logout()
      this.$router.push({ name: 'home' })
    }
  }
}
</script>
