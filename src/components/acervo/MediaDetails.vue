<template>
<div>
  <p class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsDescription') }}</p>
  <p>{{ description }}</p>
  <p class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsCreated') }}</p>
  <p>{{ $d(new Date(created), 'long') }}</p>
  <p class="text-primary text-weight-medium">{{ $t('gallery.mediaDetailsAuthor') }}</p>
  <p v-if="username">{{ username }}</p>
  <p v-if="authorName">{{ authorName }}</p>
  <p v-if="authorEmail">{{ authorEmail }}</p>
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
    username: {
      type: [String, null],
      required: false,
      default: ''
    },
    authorName: {
      type: [String, null],
      required: false,
      default: ''
    },
    authorEmail: {
      type: [String, null],
      required: false,
      default: ''
    }
  }
}
</script>
