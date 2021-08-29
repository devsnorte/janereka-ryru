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
          accept="ogg, ogv, avi, mp4, mpeg, webm, jpeg, jpg, png, gif, pdf, ods, odt, odp"
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
        :rules="[val => !!val || $t('submission.formValidationFieldRequired')]"
      />

      <!-- Input das tags / Tags input -->
      <tags-form-input
        :tagsFromProps="tags"
        @parsedTags="updateTags($event)"
      />

      <!-- Checkbox de aceite de termos / Accept terms checkbox -->
      <q-checkbox
        dense
        v-model="acceptTerms"
        :label="$t('submission.formFieldLabelAcceptTerms')"
        class="q-mt-lg"
      />

      <!-- Keep hidden until backend is ready -->
      <!-- Seção do autor / Author section -->
      <div class="row no-wrap q-my-xl items-center hidden">
        <span class="text-h6">{{ $t('submission.formSectionTitleAuthor') }}</span>
        <div class="col-grow q-mx-md bg-black" style="height: 2px;" />
      </div>

      <!-- Keep hidden until backend is ready -->
      <div class="row justify-around hidden">

        <div class="column col-grow q-px-xl">

          <q-select
            outlined clearable
            v-model="aldeiaSelected"
            :options="aldeiasPlaceholder"
            :label-slot="!aldeiaSelected"
            popup-content-class="text-weight-medium q-ma-md"
            popup-content-style="border: 2px solid black; border-radius: 5px;"
            color="black"
            class="q-my-md"
            style="min-width: 250px;"
          >
            <template v-slot:label>
              <span class="text-black text-weight-bold">{{ $t('submission.formDropdownLabelAldeia') }}</span>
            </template>

            <template v-slot:selected>
              <span class="text-weight-bold text-body1">{{ aldeiaSelected }}</span>
            </template>
          </q-select>

          <q-select
            outlined clearable
            v-model="autorSelected"
            :options="autoresPlaceholder"
            :label-slot="!autorSelected"
            popup-content-class="text-weight-medium q-my-sm"
            popup-content-style="border: 2px solid black; border-radius: 5px;"
            color="black"
            class="q-my-md"
            style="min-width: 250px;"
          >
            <template v-slot:label>
              <span class="text-black text-weight-bold">{{ $t('submission.formDropdownLabelAuthor') }}</span>
            </template>

            <template v-slot:selected>
              <span class="text-weight-bold text-body1">{{ autorSelected }}</span>
            </template>
          </q-select>

        </div>

        <div class="column col-grow justify-center items-center">
          <span class="text-h6">{{ $t('submission.formTextNotAnAuthor') }}</span>
          <q-btn unelevated no-caps color="secondary" class="q-mt-md"
            :label="$t('submission.buttonLabelNewAuthor')"
          />
        </div>

      </div>

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
import { SubmissionManager } from 'src/api/MediaSubmissionManager'
import { Session } from 'src/api/SessionManager'

export default {
  name: 'CreateMidia',

  components: {
    TagsFormInput: () => import('src/components/acervo/TagsFormInput')
  },

  data () {
    return {
      session: Session.getSessionManager(),
      submission: SubmissionManager.getManager(),
      newFile: null,
      title: '',
      description: '',
      tags: new Set(),
      acceptTerms: false,
      aldeiaSelected: null,
      autorSelected: null,
      loading: false,
      aldeiasPlaceholder: [
        'Gavião',
        'Itaaka',
        'Janeraka',
        'Kwatinema',
        'Muyryna'
      ],
      autoresPlaceholder: [
        'Alice Damasceno',
        'Carla Romano',
        'Carolina Yamada',
        'Gabriela Pessoa',
        'Timei Assurini'
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
        message: this.$t('submission.alertInvalidFile')
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
          message: this.$t('submission.alertNoFileSelected')
        })
      // Ensure submission terms are agreed with
      } else if (!this.acceptTerms) {
        this.$q.notify({
          type: 'negative',
          message: this.$t('submission.alertMustAcceptTerms')
        })
      // Proceed with submission
      } else {
        this.submission.makeMediaObject(
          this.title, this.description, Array.from(this.tags), this.newFile, this.mediaFileType
        )

        const success = await this.submission.performMediaCreation()

        if (success) {
          this.$q.notify({
            type: 'positive',
            message: this.$t('submission.alertSubmissionSuccess')
          })
        } else {
          this.$q.notify({
            type: 'negative',
            message: this.$t('submission.alertSubmissionError')
          })
        }

        this.loading = false
      }
    }
  }
}
</script>
