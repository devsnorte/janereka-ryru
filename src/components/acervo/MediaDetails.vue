<template>
<div>
  <p class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsDescription') }}</p>
  <p>{{ description }}</p>
  <p class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsCreated') }}</p>
  <p>{{ $d(new Date(created), 'long') }}</p>
  <p v-if="authorName" class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsAuthor') }}</p>
  <p v-if="authorName">{{ authorName }}</p>
  <div v-if="hashtags" class="q-gutter-sm q-mt-xs">
    <p class="text-primary text-weight-medium">{{ $t('gallery.menuSortHashtags') }}:</p>
    <span
      v-for="hashtag, index in hashtags" :key="index"
      class="inline-block bg-grey-3 text-caption">
      {{ `#${hashtag}` }}
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'MidiaDetails',

  props: {
    description: {
      type: [String, null],
      required: false,
      default: ''
    },
    created: {
      type: [String, null],
      required: false,
      default: ''
    },
    authorName: {
      type: [String, null],
      required: false,
      default: ''
    },
    hashtags: {
      type: [Array, null],
      required: false
    }
  }
}
</script>
