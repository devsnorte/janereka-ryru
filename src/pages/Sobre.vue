<template>
  <q-page>
    <Sobre />
    <div class="bg-grey-12 q-px-xs-lg">
      <div class="constrain column q-py-xs-lg q-py-md-xl">
        <div class="row">
          <h1 class="text-h2 text-weight-bolder text-primary">
              {{ $t('about.pageTextEthnicity') }} <br /> Awaete
          </h1>
        </div>
        <div class="row justify-evenly">
          <div class="col-xs-12 col-md-6 q-pr-md-xl">
              <div v-if="locale === 'awaete'">
                <p>
                  <pre style="font-family: inherit;">{{ $t('about.pageTextAboutAwaeteCitationA') }}</pre>
                </p>
              </div>
              <p v-else>
                {{ $t('about.pageTextAboutAwaeteCitationA') }}
              </p>
          </div>
          <div class="col-xs-12 col-md-6 q-pl-md-xl">
            <div v-if="locale === 'awaete'">
              <p>
                <pre style="font-family: inherit">{{ $t('about.pageTextAboutAwaeteCitationB') }}</pre>
              </p>
            </div>
            <p v-else>
              {{ $t('about.pageTextAboutAwaeteCitationB') }}
            </p>
            <p class="text-grey-7">
              {{ $t('about.pageTextAboutAwaeteCitationBibliography') }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <Map />
    <Plataforma />
    <Equipe />
  </q-page>
</template>

<script>

export default {
  components: {
    Sobre: () => import('components/sobre/SobreImg'),
    Map: () => import('components/sobre/SobreMap'),
    Plataforma: () => import('components/sobre/SobrePlataforma'),
    Equipe: () => import('components/sobre/EquipeTecnicaLista')
  },

  computed: {
    /**
     * Retrieve the current locale for conditional usage
     * of the <pre> tag.
     *
     * @return {string}
     */
    locale: function () {
      return this.$i18n.locale
    }
  }
}
</script>
