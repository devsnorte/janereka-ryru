<template>
  <div>
    <q-form ref="newMidiaForm" class="constrain q-py-xl"  @submit.prevent.stop="submit">

      <!-- Input de arquivo / File input -->
      <div class="row no-wrap q-mr-md">
        <q-btn unelevated color="primary" icon="file_upload" label="Novo"
            @click="pickFile()"
          />
        <q-file dense filled
          v-show="newFile"
          v-model="newFile"
          :label-slot="!newFile"
          class="no-pointer-events"
          ref="filePicker"
        >

          <template v-if="!newFile" v-slot:label>
            <i>Selecione um arquivo</i>
          </template>

          <template v-slot:file>
            <i>{{ newFile.name }}</i>
          </template>
        </q-file>
      </div>

      <!-- Input do nome / Filename input -->
      <label for="filename" class="inline-block q-mt-lg">Nome do arquivo:</label>
      <q-input id="filename" v-model="title" filled dense />

      <!-- Input da descrição / Description input -->
      <label for="description" class="inline-block q-mt-lg">Descrição:</label>
      <q-input id="description" v-model="description" type="textarea" filled dense autogrow />

      <!-- Input das tags / Tags input -->
      <label for="tags" class="inline-block q-mt-lg">Coleções (tags):</label>
      <q-input id="tags" ref="tagsForm" v-model="tagsText" filled dense
        hint="Separe cada tag com uma vírgula (,). Ex: tag1, tag2, tag3"
        @input="parseTags()"
        @blur="addLastTag()"
        @keydown.enter.prevent="addLastTag()"
      >
        <template v-slot:prepend>
          <div class="row">
            <div v-for="tag in tags" :key="tag"
              class="cursor-pointer text-caption bg-grey-5 q-mr-xs q-pr-sm overflow-hidden"
              @click="clearTag(tag)"
            >
              <q-btn flat dense round size="xs" label="x" class="no-padding" />
              <i>{{ tag }}</i>
            </div>
          </div>
        </template>
      </q-input>

      <!-- Checkbox de aceite de termos / Accept terms checkbox -->
      <q-checkbox dense v-model="acceptTerms" class="q-mt-lg"
        label="Li e aceito os termos da plataforma"
      />

      <!-- Seção do autor / Author section -->
      <div class="row no-wrap q-my-xl items-center">
        <span class="text-h6">Dados do autor</span>
        <div class="col-grow q-mx-md bg-black" style="height: 2px;" />
      </div>

      <div class="row justify-around">

        <div class="column col-grow q-px-xl">

          <q-select outlined clearable
            v-model="aldeiaSelected"
            :options="aldeiasPlaceholder"
            :label-slot="!aldeiaSelected"
            popup-content-class="text-weight-medium q-ma-md"
            popup-content-style="border: 2px solid black; border-radius: 5px;"
            color="black"
            class="q-my-md"
          >
            <template v-slot:label>
              <span class="text-black text-weight-bold">Selecione sua aldeia</span>
            </template>

            <template v-slot:selected>
              <span class="text-weight-bold text-body1">{{ aldeiaSelected }}</span>
            </template>
          </q-select>

          <q-select outlined clearable
            v-model="autorSelected"
            :options="autoresPlaceholder"
            :label-slot="!autorSelected"
            popup-content-class="text-weight-medium q-my-sm"
            popup-content-style="border: 2px solid black; border-radius: 5px;"
            color="black"
            class="q-my-md"
          >
            <template v-slot:label>
              <span class="text-black text-weight-bold">Selecione o autor</span>
            </template>

            <template v-slot:selected>
              <span class="text-weight-bold text-body1">{{ autorSelected }}</span>
            </template>
          </q-select>

        </div>

        <div class="column col-grow justify-center items-center">
          <span class="text-h6">Ainda não é um autor?</span>
          <q-btn unelevated no-caps color="secondary" label="Criar novo autor" class="q-mt-md" />
        </div>

      </div>

      <div class="column items-center q-my-xl">
        <q-btn unelevated color="primary" label="Enviar" type="submit" />
      </div>

    </q-form>
  </div>
</template>

<script>
export default {
  name: 'CreateMidia',

  data () {
    return {
      newFile: null,
      title: '',
      description: '',
      tagsText: '',
      tags: new Set(),
      acceptTerms: false,
      aldeiaSelected: null,
      autorSelected: null,
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

  methods: {
    pickFile () {
      this.$refs.filePicker.pickFiles()
      this.$refs.filePicker.blur()
    },

    parseTags () {
      const splittedTags = this.tagsText.split(',')
      // console.log(splittedTags)

      if (splittedTags.length > 1) {
        this.tags.add(splittedTags[0].trim())
        splittedTags.splice(0, 1)
        this.tagsText = splittedTags.join('').trim()
        // console.log(this.tags)
      }
    },

    addLastTag () {
      // console.log('Called addLastTag()')
      if (this.tagsText.trim().length > 0) {
        this.tags.add(this.tagsText.trim())
        // console.log(this.tags)
        this.tagsText = ''
      }
    },

    clearTag (tag) {
      this.tags.delete(tag)
      // console.log(this.tags)
      this.$refs.tagsForm.blur()
    },

    async submitMidiaDetails (nameParameter, midiaDetailsJSON, userToken) {
      console.log('Submitting midia details...')
      try {
        const { data } = await this.$axios({
          method: 'post',
          url: '/acervo/midia',
          data: midiaDetailsJSON,
          params: { name: nameParameter },
          headers: { token: userToken, 'Content-Type': 'application/json' }
        })
        console.log('New midia data responded from server:')
        console.log(data)
        const newMidiaFilePath = data.path
        return newMidiaFilePath
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro na submissão dos detalhes da publicação. Tente novamente.'
        })
      }
    },

    async submitMidiaDeletion (midiaFilePath, userToken) {
      console.log('Submitting midia deletion...')
      try {
        await this.$axios({
          method: 'delete',
          url: `/acervo/midia/${midiaFilePath}`,
          headers: { token: userToken }
        })
      } catch (error) {
        console.error(error)
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro na deleção de mídia. Informe o administrador.'
        })
      }
    },

    async submitMidiaFile (midiaFilePath, midiaFileFormData, userToken) {
      console.log('Submitting midia file...')
      try {
        const { data } = this.$axios({
          method: 'post',
          url: `/acervo/upload/${midiaFilePath}`,
          data: midiaFileFormData,
          headers: { token: userToken }
        })
        console.log('New file request responded from server:')
        console.log(data)

        this.$refs.newMidiaForm.reset()
        this.$q.notify({
          type: 'positive',
          message: 'Publicação submetida com sucesso.'
        })
      } catch (error) {
        console.error(error)
        // Attempt to delete previously submitted midia details
        this.submitMidiaDeletion(midiaFilePath, userToken)
        this.$q.notify({
          type: 'negative',
          message: 'Ocorreu um erro na submissão do arquivo. Tente novamente.'
        })
      }
    },

    async submit () {
      console.log('Submitting...')

      const midiaData = JSON.stringify({
        titulo: this.title,
        descricao: this.description,
        tipo: 'imagem',
        tags: Array.from(this.tags)
      })
      console.log(midiaData)

      const midiaFile = new FormData()
      midiaFile.append('arquivo', this.newFile)

      const nameParam = new URLSearchParams({
        name: this.title
      })
      console.log(nameParam)

      const token = this.$axios.defaults.headers.common.token
      console.log(token)
      if (!!token === false) {
        console.error('No user token found')
      }

      // Send initial request to 'acervo/midia' with file details
      const newMidiaFilePath = await this.submitMidiaDetails(nameParam, midiaData, token)

      // Send file to newly created midia resource
      await this.submitMidiaFile(newMidiaFilePath, midiaFile, token)

      console.log('Finished.')
    }
  }
}
</script>
