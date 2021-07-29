<template>
  <div>
    <q-form class="constrain q-py-xl"  @submit.prevent.stop="submit">

      <!-- Input de arquivo / File input -->
      <q-file standout dense clearable v-model="newFile">
        <template v-slot:before>
          <q-btn unelevated label="Novo" color="primary" icon="file_upload" />
        </template>
      </q-file>

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
          <q-btn no-caps color="secondary" label="Criar novo autor" class="q-mt-md"
            @click="submit()"
          />
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

    submit () {
      console.log('Submitting...')
    }
  }
}
</script>
