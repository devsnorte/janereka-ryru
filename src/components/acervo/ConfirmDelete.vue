<template>
  <q-card>
    <q-card-section>
      <span>{{ $t('gallery.pageTextSureToDelete') }}</span>
    </q-card-section>
    <q-card-actions align="center">
      <q-btn
        unelevated v-close-popup
        color="secondary"
        :label="$t('menus.buttonLabelYes')"
        @click="$emit('confirm')"
      />
      <q-btn
        unelevated v-close-popup
        color="dark"
        :label="$t('menus.buttonLabelCancel')"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'ConfirmDelete'
}
</script>
