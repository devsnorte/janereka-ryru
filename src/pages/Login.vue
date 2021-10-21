<template>
  <q-page class="q-py-xl q-px-md">

    <div class="text-h6 text-center"><strong>{{ $t('login.pageTextTitle') }}</strong></div>
    <div class="text-center">{{ $t('login.pageTextSubtitle') }}</div>

    <q-form class="q-pt-lg q-mx-auto" style="max-width: 400px;" @submit="login">

      <div class="q-mt-md col-xs-10 col-sm-7">
        <label for="name" class="text-bold inline-block">
          {{ $t('login.formFieldLabelUsername') }}
        </label>
        <q-input
          id="name"
          v-model="name"
          dense
          filled
          type="text"
          :rules="[val => !!val || $t('login.formValidationFieldRequired')]"
        />
      </div>

      <div class="q-mt-sm col-xs-10 col-sm-7">
        <label for="password" class="text-bold inline-block">
          {{ $t('login.formFieldLabelPassword') }}
        </label>
        <q-input
          id="password"
          v-model="password"
          input-class="text-primary"
          dense
          filled
          type="password"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          onpaste="return false"
          oncopy="return false"
          oncut="return false"
          :rules="[val => !!val || $t('login.formValidationFieldRequired')]"
        />
      </div>

      <div class="column q-mt-sm col-xs-10 col-sm-7 q-mt-lg items-center">
        <q-btn
          color="primary"
          type="submit"
          push
          no-caps
          :label="$t('login.buttonLabelEnter')"
          size="lg"
          :loading="loading"
        >
          <span slot="loading">
            <q-spinner-hourglass />
          </span>
        </q-btn>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import { Session } from 'src/api/SessionManager'

export default {
  name: 'Login',

  data () {
    return {
      loading: false,
      name: '',
      password: '',
      session: Session.getSessionManager()
    }
  },

  methods: {
    async login () {
      this.loading = true
      const login = await this.session.login(this.name, this.password)

      if (login.success) {
        this.loading = false
        this.redirect()
      } else {
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: this.$t('login.alertLoginFailed')
        })
      }
    },

    redirect () {
      const goTo = this.$route.query.goTo

      if (goTo === '/admin') {
        if (this.session.isAdmin()) this.$router.push({ path: goTo })
        else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('login.alertHasNoPerms')
          })
          this.$router.push({ name: 'home' })
        }
      } else {
        if (goTo) this.$router.push({ path: goTo })
        else this.$router.push({ name: 'usuario' })
      }
    }
  }
}
</script>
