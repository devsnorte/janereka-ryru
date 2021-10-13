<template>
  <q-tabs
    inline-label
    outside-arrows
    align="left"
    active-color="primary"
    class="col-grow q-mb-xs"
    v-model="activeTab"
    @input="$emit('filterContent', activeTab)"
  >
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelAll')"
      name="all"
      icon="perm_media"
    />
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelFiles')"
      name="arquivo"
      icon="folder"
    />
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelImages')"
      name="imagem"
      icon="image"
    />
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelVideos')"
      name="video"
      icon="theaters"
    />
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelAudio')"
      name="audio"
      icon="volume_up"
    />
    <q-tab
      v-if="viewingFrom === 'mainGallery'"
      :label="$t('gallery.categoryLabelAudio')"
      name="audio"
      icon="volume_up"
    />
    <q-tab
      v-if="viewingFrom === 'userArea'"
      :label="$t('user.galleryCategoryLabelPersonal')"
      name="personalMedias"
      icon="inventory_2"
    />
    <q-tab
      v-if="viewingFrom === 'userArea'"
      :label="$t('user.galleryCategoryLabelSubimissions')"
      name="personalSubimissions"
      icon="cloud_upload"
    />
  </q-tabs>
</template>

<script>
export default {
  name: 'MainTableTabs',

  props: {
    viewingFrom: {
      type: String,
      required: true,
      default: 'mainGallery'
    }
  },

  data () {
    return {
      activeTab: 'all'
    }
  },

  mounted () {
    if (this.viewingFrom === 'mainGallery') this.activeTab = 'all'
    else if (this.viewingFrom === 'userArea') this.activeTab = 'personalMedias'
    else this.activeTab = 'all'
  }
}
</script>
