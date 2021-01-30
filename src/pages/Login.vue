<template>
  <q-page class="container">
    <div class="row full-height">
      <div
        class="col"
      >
        <div class="column justify-center q-pa-md window-height">
          <div class="row justify-center q-col-gutter-md">
            <q-form @submit="login">
              <div class="col-12 text-center">
                <LogoJaneraka />
                <h1 class="text-weight-bold text-h4 q-mt-xl">
                  Entre com sua conta
                </h1>
              </div>
              <div class="q-mt-md col-xs-10 col-sm-7">
                <q-input
                  key="login-com-ad"
                  v-model="user.login"
                  input-class="text-info"
                  outlined
                  type="text"
                  label="E-mail ou CPF"
                />
              </div>
              <div class="q-mt-sm col-xs-10 col-sm-7">
                <q-input
                  v-model="user.senha"
                  input-class="text-info"
                  outlined
                  type="password"
                  label="Senha"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  onpaste="return false"
                  oncopy="return false"
                  oncut="return false"
                />
              </div>
              <div class="q-mt-sm col-xs-10 col-sm-7">
                <q-btn
                  color="primary"
                  type="submit"
                  push
                  class="full-width"
                  label="Entrar"
                  size="lg"
                  :loading="loading"
                >
                  <span slot="loading">
                    <q-spinner-hourglass class="on-left" />Carregando...
                  </span>
                </q-btn>
              </div>
            </q-form>
          </div>
        </div>
      </div>
      <div class="col flex flex-center window-height gt-sm">
        <img
          src="~assets/cover.jpg"
          alt="Indigen Person jumping in the river"
          class="photo"
        >
      </div>
    </div>
  </q-page>
</template>

<script>
import LogoJaneraka from 'components/LogoJaneraka'

export default {
  name: 'Login',
  components: { LogoJaneraka },
  data () {
    return {
      user: {
        login: '',
        senha: ''
      },
      loading: false
    }
  },
  methods: {
    login () {
      this.loading = true
    }
  }
}
</script>

<style lang="scss" scoped>
.photo {
  object-fit: cover;
  height: 100vh;
  width: 50vw;
}
</style>
