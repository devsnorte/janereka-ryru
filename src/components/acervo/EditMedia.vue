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
        v-model="newTitle"
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
        v-model="newDescription"
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
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'EditMedia',

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
    mediaFileName: {
      type: String,
      required: true
    },
    mediaType: {
      type: String,
      required: true
    },
    mediaPath: {
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
      mediaManager: MediaManager.getManager(),
      loading: false,
      newTitle: '',
      newDescription: '',
      tags: new Set()
    }
  },

  watch: {
    async triggerSubmit (val, oldVal) {
      await this.submit()
      this.$emit('finished-submission')
    }
  },

  mounted () {
    if (this.title) this.newTitle = this.title

    if (this.description) this.newDescription = this.description

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

      this.mediaManager.makeMediaObject(
        this.newTitle, this.newDescription, Array.from(this.tags), '', this.mediaType, this.mediaPath
      )
      const success = await this.mediaManager.performMediaUpdate(this.mediaFileName)

      if (success) {
        this.$q.notify({
          type: 'positive',
          multiLine: true,
          message: this.$t('gallery.alertUpdateSuccess')
        })
      } else {
        this.$q.notify({
          type: 'negative',
          multiLine: true,
          message: this.$t('gallery.alertUpdateFailed')
        })
      }

      this.loading = false
    }
  }
}
</script>
