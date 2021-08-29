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
      <label for="tags" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelHashtags') }}
      </label>
      <q-input
        dense filled
        id="tags"
        ref="tagsForm"
        v-model="tagsText"
        :hint="$t('submission.formFieldHintHastags')"
        @input="parseTags()"
        @blur="addLastTag()"
        @keydown.enter.prevent="addLastTag()"
      >
        <template v-slot:prepend>
          <div class="row">
            <div v-for="tag in tags" :key="tag"
              class="cursor-pointer text-caption bg-grey-5 q-mr-xs q-pr-sm overflow-hidden"
              @click="clearTag(tag)"
            >
              <q-btn flat dense round size="xs" label="x" class="no-padding" />
              <i>{{ tag }}</i>
            </div>
          </div>
        </template>
      </q-input>

    </q-form>
  </div>
</template>

<script>
import { SubmissionManager } from 'src/api/MediaSubmissionManager'
import { Session } from 'src/api/SessionManager'

export default {
  name: 'EditMidia',

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
      tags: new Set(),
      tagsText: ''
    }
  },

  watch: {
    triggerSubmit (val, oldVal) {
      console.info('watcher watchin\' ya')
      if (val === true) {
        console.info('is tru')
      }
      this.$emit('finished-submission')
    }
  },

  mounted () {
    if (this.rawTags) {
      this.rawTags.forEach(tag => this.tags.add(tag))
    }

    // Trigger form re-render with trimmable whitespace to display tags
    this.tagsText = ' '
  },

  methods: {
    parseTags () {
      const splittedTags = this.tagsText.split(',')

      if (splittedTags.length > 1) {
        this.tags.add(splittedTags[0].trim())
        splittedTags.splice(0, 1)
        this.tagsText = splittedTags.join('').trim()
      }
    },

    addLastTag () {
      if (this.tagsText.trim().length > 0) {
        this.tags.add(this.tagsText.trim())
        this.tagsText = ''
      }
    },

    clearTag (tag) {
      this.tags.delete(tag)
      this.$refs.tagsForm.blur()
    },

    async submit () {
      this.loading = true

      // Todo

      this.loading = false
    }
  }
}
</script>
