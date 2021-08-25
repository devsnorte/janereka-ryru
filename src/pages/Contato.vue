<template>
  <q-page class="flex flex-center q-py-xl">
      <q-form
        ref="contactForm"
        class="q-gutter-sm"
        @submit.prevent.stop="submit"
      >
        <div class="column text-center q-mb-xl">
          <span class="text-h6 text-bold">{{ $t('contact.pageTextTitle') }}</span>
          <span class="text-h6 text-bold">{{ $t('contact.pageTextSubtitle') }}</span>
        </div>

        <div class="row no-wrap">
          <q-input
            filled dense
            class="q-mr-sm"
            id="name"
            :label="$t('contact.formFieldLabelName')"
            v-model="name"
            :rules="[val => !!val || $t('contact.formValidationFieldRequired')]"
          />
          <q-input
            filled dense
            id="phone"
            :label="$t('contact.formFieldLabelPhone')"
            mask="(##) ##### - ####"
            v-model="phone"
            :rules="[val => !!val || $t('contact.formValidationFieldRequired')]"
          />
        </div>

        <q-input
          filled dense
          id="email"
          :label="$t('contact.formFieldLabelEmail')"
          type="email"
          v-model="email"
          :rules="[val => !!val || $t('contact.formValidationFieldRequired')]"
        />

        <q-input
          filled dense
          id="message"
          :label="$t('contact.formFieldLabelMessage')"
          type="textarea"
          v-model="message"
          :rules="[val => !!val || $t('contact.formValidationFieldRequired')]"
        />

        <div class="column items-center q-my-xl">
          <q-btn unelevated color="primary" type="submit"
            :loading="loading" :label="$t('contact.buttonLabelSubmit')"
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
export default {
  name: 'Contato',

  data () {
    return {
      name: '',
      phone: '',
      email: '',
      message: '',
      loading: false
    }
  },

  methods: {
    submit () {
      this.loading = true

      console.log('Submitting...')
      const fullMessage = encodeURI(`Doador: ${this.name}\nContato: ${this.email}, ${this.phone}\n\n${this.message}`)
      const subject = encodeURI('Doação de arquivo para acervo Janeraka')
      window.open(`mailto:nononono@nono.com?subject=${subject}&body=${fullMessage}`)

      this.loading = false
    }
  }
}
</script>
