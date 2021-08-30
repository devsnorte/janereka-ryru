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
      bg-color="transparent"
      class="tags-input bg-grey-3"
      v-model="tagsText"
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
      tagsText: '',
      tagsFieldHeight: '40px'
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
      const splittedTags = this.tagsText.split(',')

      if (splittedTags.length > 1) {
        this.tags.add(splittedTags[0].trim())
        splittedTags.splice(0, 1)
        this.tagsText = splittedTags.join('').trim()
        // this.getResponsiveFieldHeight()

        this.$emit('parsedTags', this.tags)
      }
    },

    addLastTag () {
      if (this.tagsText.trim().length > 0) {
        this.tags.add(this.tagsText.trim())
        this.tagsText = ''
        this.getResponsiveFieldHeight()

        this.$emit('parsedTags', this.tags)
      }
    },

    clearTag (tag) {
      this.tags.delete(tag)
      this.$refs.tagsForm.blur()

      this.$emit('parsedTags', this.tags)
    }
  }
}
</script>

<style scoped>
.tags-input:hover {
  background-color: #e0e0e0 !important;
}
</style>
