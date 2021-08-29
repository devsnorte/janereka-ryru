<template>
  <div class="text-center q-mb-xl">
    <span class="text-h6">Editar detalhes</span>
    <q-form
      class="constrain text-left q-pb-sm"
      @submit.prevent.stop="submit"
    >
      <!-- Input do nome / Filename input -->
      <label for="filename" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelFilename') }}
      </label>
      <q-input
        dense filled
        id="filename"
        v-model="title"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input da descrição / Description input -->
      <label for="description" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelDescription') }}
      </label>
      <q-input
        dense filled autogrow
        id="description"
        type="textarea"
        v-model="description"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input das tags / Tags input -->
      <tags-form-input
        :tagsFromProps="tags"
        @parsedTags="updateTags($event)"
      />

    </q-form>
  </div>
</template>

<script>
import { SubmissionManager } from 'src/api/MediaSubmissionManager'
import { Session } from 'src/api/SessionManager'

export default {
  name: 'EditMidia',

  components: {
    TagsFormInput: () => import('src/components/acervo/TagsFormInput')
  },

  props: {
    title: {
      type: [String, null],
      required: false,
      default: ''
    },
    description: {
      type: [String, null],
      required: false,
      default: ''
    },
    rawTags: {
      type: Array,
      required: false,
      default: () => []
    },
    path: {
      type: String,
      required: true
    },
    triggerSubmit: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      session: Session.getSessionManager(),
      submission: SubmissionManager.getManager(),
      loading: false,
      tags: new Set()
    }
  },

  watch: {
    triggerSubmit (val, oldVal) {
      this.$emit('finished-submission')
    }
  },

  mounted () {
    if (this.rawTags) {
      this.rawTags.forEach(tag => this.tags.add(tag))
    }
  },

  methods: {
    updateTags (tags) {
      this.tags = tags
    },

    async submit () {
      this.loading = true

      // Todo

      this.loading = false
    }
  }
}
</script>
