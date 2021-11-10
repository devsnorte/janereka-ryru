<template>
  <div>
    <q-form ref="newMidiaForm" class="constrain q-py-xl" @submit.prevent.stop="submit">

      <!-- Input de arquivo / File input -->
      <div class="row no-wrap q-mr-md full-width items-center">
        <q-btn
          unelevated no-wrap
          color="primary"
          size="1.1em"
          @click="pickFile()" :label="$t('submission.buttonLabelNewFile')"
        />
        <q-file
          dense filled
          id="filepicker"
          v-show="newFile"
          v-model="newFile"
          :label-slot="!newFile"
          accept="ogg, ogv, avi, mp4, mpeg, webm, jpeg, jpg, png, gif, pdf, ods, odt, odp, mp3"
          class="no-pointer-events q-pl-xs q-py-md"
          ref="filePicker"
          @rejected="alertInvalidFile()"
        >

          <template v-if="!newFile" v-slot:label>
            <i>{{ $t('submission.formFieldLabelFilepicker') }}</i>
          </template>

          <template v-slot:file>
            <i>{{ newFile.name }}</i>
          </template>
        </q-file>
      </div>

      <!-- Input do nome / Filename input -->
      <label for="filename" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelFilename') }}
      </label>
      <q-input
        dense filled
        id="filename"
        v-model="title"
        :placeholder="$t('submission.formFieldPlaceholderFilename')"
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input da descrição / Description input -->
      <label for="description" class="inline-block q-mt-lg">
        {{ $t('submission.formFieldLabelDescription') }}
      </label>
      <q-input
        dense filled
        id="description"
        type="textarea"
        v-model="description"
        :placeholder="$t('submission.formFieldPlaceholderDescription')"
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

      <div class="row justify-around">
        <div class="q-px-lg">
          <!-- Input do nome do autor / Author name input -->
          <label for="authorname" class="inline-block q-mt-lg">
            {{ $t('submission.formFieldLabelAuthorName') }}
          </label>
          <q-input
            dense filled
            id="authorname"
            v-model="authorname"
            :placeholder="$t('submission.formFieldPlaceholderNameAuthor')"
            :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
          />

          <!-- Seleção de aldeua / Author's indigenous group selection -->
          <label for="authorname" class="inline-block q-mt-lg">
            {{ $t('submission.formFieldLabelAuthorOrigin') }}
          </label>
          <q-select
            outlined clearable dense filled
            v-model="aldeiaSelected"
            :options="aldeias"
            :label-slot="!aldeiaSelected"
            :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
            popup-content-class="text-weight-medium q-ma-md"
            popup-content-style="border: 2px solid black; border-radius: 5px;"
            color="black"
            class="q-my-sm"
            style="min-width: 250px;"
          >

            <template v-slot:selected>
              <span class="text-body2">{{ aldeiaSelected }}</span>
            </template>
          </q-select>
        </div>

      </div>

      <!-- Checkbox de aceite de termos / Accept terms checkbox -->
      <q-checkbox
        dense
        v-model="acceptTerms"
        :label="$t('submission.formFieldLabelAcceptTerms')"
        class="q-mt-lg"
      />

      <div class="column items-center q-my-xl">
        <q-btn unelevated color="primary" type="submit"
          :loading="loading" :label="$t('submission.buttonLabelSend')"
        >
          <span slot="loading">
            <q-spinner-hourglass />
          </span>
        </q-btn>
      </div>

    </q-form>
  </div>
</template>

<script>
import { MediaManager } from 'src/api/MediaManager'

export default {
  name: 'CreateMedia',

  components: {
    TagsFormInput: () => import('src/components/acervo/TagsFormInput')
  },

  data () {
    return {
      mediaManager: MediaManager.getManager(),
      newFile: null,
      title: '',
      description: '',
      tags: new Set(),
      authorname: '',
      aldeiaSelected: 'Não pertence a uma aldeia',
      acceptTerms: false,
      loading: false,
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

  computed: {
    /**
     * Represents the media type used by the API. Value is
     * resolved by means of the 'type' property from the file
     * in this.data.
     *
     * Resolves to 'audio', 'image', 'video' or 'arquivo'
     * according to the selected file.
     *
     * @return {string}
     */
    mediaFileType: function () {
      let apiMediaType = null

      const fileType = this.newFile.type
      if (fileType) apiMediaType = fileType.split('/')

      switch (apiMediaType[0]) {
        case 'audio':
          apiMediaType = 'audio'
          break
        case 'image':
          apiMediaType = 'imagem'
          break
        case 'video':
          apiMediaType = 'video'
          break
        case 'application':
          apiMediaType = 'arquivo'
          break
        default:
          apiMediaType = null
      }

      return apiMediaType
    }
  },

  methods: {
    pickFile () {
      this.$refs.filePicker.pickFiles()
      this.$refs.filePicker.blur()
    },

    alertInvalidFile () {
      this.$q.notify({
        type: 'negative',
        message: this.$t('submission.alertInvalidFile'),
        actions: [{ icon: 'close', color: 'white' }]
      })
    },

    updateTags (tags) {
      this.tags = tags
    },

    async submit () {
      this.loading = true

      // Ensure there is a file
      if (!this.newFile) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('submission.alertNoFileSelected'),
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
      // Ensure submission terms are agreed with
      } else if (!this.acceptTerms) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('submission.alertMustAcceptTerms'),
          actions: [{ icon: 'close', color: 'white' }]
        })
        this.loading = false
      // Proceed with submission
      } else {
        this.mediaManager.makeMediaObject(
          this.title, this.description, Array.from(this.tags), this.authorname, this.aldeiaSelected, this.newFile, this.mediaFileType
        )

        const success = await this.mediaManager.performMediaCreation()

        if (success) {
          this.$q.notify({
            type: 'positive',
            message: this.$t('submission.alertSubmissionSuccess'),
            actions: [{ icon: 'close', color: 'white' }]
          })
          this.$router.push('/acervo')
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('submission.alertSubmissionError'),
            actions: [{ icon: 'close', color: 'white' }]
          })
        }

        this.loading = false
      }
    }
  }
}
</script>
