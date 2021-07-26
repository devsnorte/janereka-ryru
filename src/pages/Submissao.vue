<template>
  <q-page>
    <div class="constrain q-py-xl">
        <div class="q-pb-xl">
            <q-btn @click="$router.go(-1)" round color="grey" icon="fa fa-arrow-left" />
        </div>
        <div class="q-px-xl">
            <q-form
                @submit="onSubmit"
                @reset="onReset"
                class="q-gutter-md"
            >
                <div>
                    <q-btn color="primary" icon="eva-upload-outline" label="novo" />
                </div>
                <q-input
                    filled
                    v-model="name"
                    label="Your name *"
                    hint="Name and surname"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Please type something']"
                />

                <q-input
                    filled
                    type="number"
                    v-model="age"
                    label="Your age *"
                    lazy-rules
                    :rules="[
                    val => val !== null && val !== '' || 'Please type your age',
                    val => val > 0 && val < 100 || 'Please type a real age'
                    ]"
                />

                <q-toggle v-model="accept" label="I accept the license and terms" />

                <div>
                    <q-btn label="Submit" type="submit" color="primary"/>
                    <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
        </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Submissao',
  data () {
    return {
      name: null,
      age: null,

      accept: false
    }
  },

  methods: {
    onSubmit () {
      if (this.accept !== true) {
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        this.$q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      }
    },
    onReset () {
      this.name = null
      this.age = null
      this.accept = false
    }
  }
}
</script>
