<template>
  <div class="q-gutter-sm">
    <q-btn
      unelevated
      v-show="editMode && allowEdition"
      color="dark"
      :label="$t('gallery.buttonLabelSubmitEdit')"
      @click="$emit('triggerSubmit', true)"
    />
    <q-btn
      unelevated
      v-show="editMode && allowEdition"
      color="dark"
      :label="$t('gallery.buttonLabelCancelEdit')"
      @click="$emit('toggleEditMode')"
    />
    <q-btn
      unelevated
      color="secondary"
      v-show="editMode && allowEdition"
      :label="$t('gallery.buttonLabelDelete')"
      @click="confirmDelete = true"
    />
    <q-btn
      unelevated
      v-show="!editMode && allowEdition"
      color="dark"
      :label="$t('gallery.buttonLabelEdit')"
      @click="$emit('toggleEditMode')"
    />
    <q-btn
      unelevated
      v-close-popup
      color="dark"
      :label="$t('gallery.buttonLabelClose')"
    />
    <q-dialog v-model="confirmDelete">
      <confirm-delete @confirm="$emit('triggerDelete')" />
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'MidiaContentButtons',

  components: {
    ConfirmDelete: () => import('components/acervo/ConfirmDelete')
  },

  props: {
    editMode: {
      type: Boolean,
      required: true,
      default: false
    },
    allowEdition: {
      type: Boolean,
      required: true,
      default: false
    }
  },

  data () {
    return {
      confirmDelete: false
    }
  }
}
</script>
