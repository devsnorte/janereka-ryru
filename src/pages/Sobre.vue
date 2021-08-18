<template>
  <q-page>
    <Sobre />
    <div class="bg-grey-12 q-px-xs-lg">
        <div class="constrain row q-py-xs-lg q-py-md-xl">
            <div class="row">
                <h1 class="text-h2 text-weight-bolder text-primary">
                    {{ $t('about.pageTextEthnicity') }} <br /> Awaete
                </h1>
            </div>
            <div class="row justify-evenly">
                <div class="col-xs-12 col-md-6 q-pr-md-xl">
                    <p>
                        {{ $t('about.pageTextAboutAwaeteCitationA') }}
                    </p>
                </div>
                <div class="col-xs-12 col-md-6 q-pl-md-xl">
                    <p>
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
    <Equipe />
  </q-page>
</template>

<script>

export default {
  components: {
    Sobre: () => import('components/sobre/SobreImg'),
    Map: () => import('components/sobre/SobreMap'),
    Equipe: () => import('components/sobre/EquipeTecnica')
  }
}
</script>
