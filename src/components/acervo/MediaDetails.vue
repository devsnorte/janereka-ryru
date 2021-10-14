<template>
<div>
  <p class="text-primary text-weight-medium">
    {{ $t('gallery.mediaDetailsDescription') }}
  </p>

  <p>
    {{ media.descricao }}
  </p>

  <p class="text-primary text-weight-medium">
    {{ $t('gallery.mediaDetailsCreated') }}
  </p>

  <p>
    {{ $d(new Date(media.created), 'long') }}
  </p>

  <p v-if="media.autor" class="text-primary text-weight-medium">
    {{ $t('gallery.mediaDetailsAuthor') }}
  </p>
  <p v-if="media.autor">{{ media.autor }}</p>

  <p v-if="media.mocambo" class="text-primary text-weight-medium">
    {{ $t('gallery.mediaDetailsAuthorIndigenousGroup') }}
  </p>
  <p v-if="media.mocambo">{{ media.mocambo }}</p>

  <p class="text-primary text-weight-medium">
    {{ $t('gallery.mediaDetailsUploader') }}
  </p>
  <p>{{ media.creator }}</p>

  <div v-if="media.tags" class="q-gutter-sm q-mt-xs">
    <p class="text-primary text-weight-medium">{{ $t('gallery.menuSortHashtags') }}:</p>
    <span
      v-for="hashtag, index in media.tags" :key="index"
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
    media: {
      type: Object,
      required: true
    }
  }
}
</script>
