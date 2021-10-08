<template>
  <div id="hashtag-cloud-wrapper">
    <strong>{{ $t('gallery.menuSortHashtags') }}</strong>
    <div v-if="hashtags.length === 0">
      <span class="text-caption">
        Nenhuma hashtag encontrada.
      </span>
    </div>
    <div v-else class="q-gutter-xs q-mt-xs">
      <button
        class="inline-block bg-grey-3 no-border q-ma-xs text-caption cursor-pointer"
        v-for="hashtag in hashtags" :key="hashtag.tag"
        @click="$emit('findHashtag', hashtag.tag)"
      >
        {{ `# ${hashtag.tag} (${hashtag.count})` }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HashtagCloud',

  props: {
    hashtags: {
      type: Array,
      required: false,
      default: () => []
    }
  }
}
</script>
