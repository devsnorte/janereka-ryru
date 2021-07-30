<template>
  <div class="bg-white q-pa-xl" style="min-width: 400px;">
    <q-form @submit="login">
      <div class="q-mt-md col-xs-10 col-sm-7">
        <label for="name" class="text-bold inline-block">Nome</label>
        <q-input
          id="name"
          v-model="name"
          dense
          filled
          type="text"
          :rules="[val => !!val || 'Este campo é necessário']"
        />
      </div>
      <div class="q-mt-sm col-xs-10 col-sm-7">
        <label for="password" class="text-bold inline-block">Senha</label>
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
          :rules="[val => !!val || 'Este campo é necessário']"
        />
      </div>
      <div class="column q-mt-sm col-xs-10 col-sm-7 q-mt-lg items-center">
        <q-btn
          color="primary"
          type="submit"
          push
          no-caps
          label="Entrar"
          size="lg"
          :loading="loading"
        >
          <span slot="loading">
            <q-spinner-hourglass />
          </span>
        </q-btn>
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data () {
    return {
      loading: false,
      name: '',
      password: ''
    }
  },

  methods: {
    async login () {
      this.loading = true
      const formData = new FormData()
      formData.append('username', this.name)
      formData.append('password', this.password)
      try {
        const { data } = await this.$axios({
          method: 'post',
          url: '/auth',
          data: formData
        })
        this.$axios.defaults.headers.common = { token: data }
        this.loading = false
        this.$emit('success')
      } catch (error) {
        console.log(error)
        this.loading = false
        this.$q.notify({
          type: 'negative',
          message: 'Não foi possível fazer login.'
        })
      }
    }
  }
}
</script>
