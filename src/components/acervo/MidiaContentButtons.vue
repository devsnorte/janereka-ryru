<template>
  <div class="q-gutter-sm">
    <q-btn
      unelevated
      v-show="editMode"
      color="dark"
      :label="$t('gallery.buttonLabelSubmitEdit')"
      @click="$emit('triggerSubmit', true)"
    />
    <q-btn
      unelevated
      v-show="editMode"
      color="dark"
      :label="$t('gallery.buttonLabelCancelEdit')"
      @click="$emit('toggleEditMode')"
    />
    <q-btn
      unelevated
      color="secondary"
      v-show="editMode"
      :label="$t('gallery.buttonLabelDelete')"
      @click="$emit('triggerDelete')"
    />
    <q-btn
      unelevated
      v-show="!editMode"
      color="dark"
      :label="$t('gallery.buttonLabelEdit')"
      @click="$emit('toggleEditMode')"
    />
    <q-btn
      unelevated
      v-close-popup
      v-show="!editMode"
      color="dark"
      :label="$t('gallery.buttonLabelClose')"
    />
  </div>
</template>

<script>
export default {
  name: 'MidiaContentButtons',

  props: {
    editMode: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>
