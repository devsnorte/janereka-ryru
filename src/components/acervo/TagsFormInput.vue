<template>
  <div class="tags-form">
    <label for="tags">
      {{ $t('submission.formFieldLabelHashtags') }}
    </label>
    <div class="row bg-grey-3">
      <div v-for="tag in tags" :key="tag"
        class="cursor-pointer text-caption bg-grey-5 q-ma-xs q-pr-sm"
        @click="clearTag(tag)"
      >
        <q-btn flat dense round size="xs" label="x" class="no-padding" />
        <i>{{ tag }}</i>
      </div>
    </div>
    <q-input
      dense borderless
      id="tags"
      ref="tagsForm"
      bg-color="grey-3"
      input-class="tags-input q-pl-md"
      v-model="tagsText"
      :lazy-rules="true"
      :rules="[ hasOneTagAtLeast ]"
      @input="parseTags()"
      @blur="addLastTag()"
      @keydown.enter.prevent="addLastTag()"
    >
    </q-input>
    <span class="text-caption">
      <i><pre style="font-family: inherit; margin-top: 0;">{{ $t('submission.formFieldHintHastags') }}</pre></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'TagsFormInput',

  props: {
    tagsFromProps: {
      type: Set,
      required: false
    }
  },

  data () {
    return {
      tags: new Set(),
      tagsText: ''
    }
  },

  mounted () {
    if (this.tagsFromProps) {
      this.tagsFromProps.forEach(tag => this.tags.add(tag))
    }

    // Trigger form re-render with trimmable whitespace to display tags
    this.tagsText = ' '
  },

  methods: {
    parseTags () {
      // Add tag only after separating with a comma character
      const splittedTags = this.tagsText.split(',')

      if (splittedTags.length > 1) {
        this.tags.add(splittedTags[0].trim().toLowerCase())
        splittedTags.splice(0, 1)
        this.tagsText = splittedTags.join('').trim().toLowerCase()

        this.$emit('parsedTags', this.tags)
      }
    },

    addLastTag () {
      if (this.tagsText.trim().length > 0) {
        this.tags.add(this.tagsText.trim().toLowerCase())
        this.tagsText = ''

        this.$emit('parsedTags', this.tags)
      }
    },

    clearTag (tag) {
      // Trigger form re-render with trimmable whitespace to display tags
      this.tagsText = ' '
      this.tags.delete(tag)
      this.tagsText = ''

      this.$refs.tagsForm.validate()
      this.$emit('parsedTags', this.tags)
    },

    hasOneTagAtLeast () {
      return (this.tags.size >= 1 || this.$t('submission.formValidationTagsNumber'))
    }
  }
}
</script>

<style scoped>
.tags-input:hover {
  background-color: #e0e0e0 !important;
}
</style>
