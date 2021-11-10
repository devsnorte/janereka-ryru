<template>
  <div class="text-center q-mb-xl">
    <span class="text-h6">Editar detalhes</span>
    <q-form
      class="constrain text-left q-pb-sm"
      @submit.prevent.stop="submit"
    >
      <!-- Input do nome / Filename input -->
      <label for="filename" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelFilename') }}
      </label>
      <q-input
        dense filled
        id="filename"
        v-model="newTitle"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input da descrição / Description input -->
      <label for="description" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelDescription') }}
      </label>
      <q-input
        dense filled autogrow
        id="description"
        type="textarea"
        v-model="newDescription"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input das tags / Tags input -->
      <tags-form-input
        :tagsFromProps="tags"
        @parsedTags="updateTags($event)"
      />

      <!-- Seção do autor / Author section -->
      <div class="row no-wrap q-mt-xl items-center">
        <span class="text-h6">{{ $t('submission.formSectionTitleAuthor') }}</span>
        <div class="col-grow q-mx-md bg-black" style="height: 2px;" />
      </div>

      <!-- Input do nome do autor / Author name input -->
      <label for="authorname" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelAuthorName') }}
      </label>
      <q-input
        dense filled
        id="authorname"
        v-model="newAuthorname"
        :placeholder="$t('submission.formFieldPlaceholderNameAuthor')"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Seleção de aldeia / Author's indigenous group selection -->
      <label for="authorname" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelAuthorOrigin') }}
      </label>
      <q-select
        outlined clearable dense filled
        v-model="newAldeia"
        :options="aldeias"
        :label-slot="!newAldeia"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
        popup-content-class="text-weight-medium q-ma-md"
        popup-content-style="border: 2px solid black; border-radius: 5px;"
        color="black"
        class="q-my-sm"
        style="min-width: 250px;"
      >

        <template v-slot:selected>
          <span class="text-body2">{{ newAldeia }}</span>
        </template>
      </q-select>

    </q-form>
  </div>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'EditMedia',

  components: {
    TagsFormInput: () => import('src/components/acervo/TagsFormInput')
  },

  props: {
    media: {
      type: Object,
      required: true
    },
    triggerSubmit: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data () {
    return {
      mediaManager: MediaManager.getManager(),
      loading: false,
      newTitle: '',
      newDescription: '',
      newAuthorname: '',
      newAldeia: '',
      tags: new Set(),
      aldeias: [
        'Gavião',
        'Itaaka',
        'Janeraka',
        'Kwatinema',
        'Muyryna',
        'Não pertence a uma aldeia'
      ]
    }
  },

  watch: {
    async triggerSubmit (val, oldVal) {
      await this.submit()
      this.$emit('finished-submission')
    }
  },

  mounted () {
    if (this.media.titulo) this.newTitle = this.media.titulo

    if (this.media.descricao) this.newDescription = this.media.descricao

    if (this.media.autor) this.newAuthorname = this.media.autor
    else this.newAuthorname = 'Autor não informado'

    if (this.media.mocambo) this.newAldeia = this.media.mocambo
    this.newAldeia = 'Não pertence a uma aldeia'

    if (this.media.tags) {
      this.media.tags.forEach(tag => this.tags.add(tag))
    }
  },

  methods: {
    updateTags (tags) {
      this.tags = tags
    },

    async submit () {
      this.loading = true

      this.mediaManager.makeMediaObject(
        this.newTitle, this.newDescription, Array.from(this.tags), this.newAuthorname, this.newAldeia, '', this.media.tipo, this.media.path
      )
      const success = await this.mediaManager.performMediaUpdate(this.mediaFileName)

      if (success) {
        this.tags = new Set()
        this.$q.notify({
          type: 'positive',
          multiLine: true,
          message: this.$t('gallery.alertUpdateSuccess'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      } else {
        this.$q.notify({
          type: 'negative',
          multiLine: true,
          message: this.$t('gallery.alertUpdateFailed'),
          actions: [{ icon: 'close', color: 'white' }]
        })
      }

      this.loading = false
    }
  }
}
</script>
