<template>
    <div class="bg-grey-12 q-py-xl q-px-xs-lg">
        <div class="q-px-xs-lg">
            <h1 class="text-h3 text-weight-bolder text-primary text-center">
                {{ $t('about.pageTitleAboutTeam') }}
            </h1>
        </div>

        <div class="row constrain text-center q-pt-md-lg q-pb-md-md">
            <div class="col-xs-12 col-sm-6 col-md-6 q-pb-xs-xl" v-for="(info, index) in teamDataforI18n" :key="index">
                <div class="text-h6 text-weight-bolder text-primary"> {{ info.role }} </div>
                <div class="text-subtitle1" style="white-space: pre-line;">
                    {{ `${info.name.join('\n')}` }}
                </div>
            </div>
            <div class="col-12 q-pb-xs-xl">
              <div class="text-h5 text-weight-bolder text-primary"> {{$t('about.pageTitleAboutTeamRealization')}} </div>
            </div>
            <div class="fit row justify-center">
              <div class="col-xs-12 col-sm-4 col-md-3 col-lg-2 q-pb-xs-xl self-baseline" v-for="(img, index) in logo" :key="index">
                <img :src="img.url" :alt="`Logo de ${img.name}`" :width="img.width" />
              </div>
            </div>
        </div>
    </div>
</template>

<script>

const logoImg = [
  {
    name: 'Agenda Awaete',
    url: require('src/assets/realizacao/AgendaAwaete.jpg'),
    width: '150px'
  },
  {
    name: 'Baobáxia',
    url: require('src/assets/realizacao/LogoBBX_mono.svg'),
    width: '110px'
  },
  {
    name: 'Inajá Design Permacultural',
    url: require('src/assets/realizacao/inaja.jpg'),
    width: '110px'
  },
  {
    name: 'Marytykwawara Awaete',
    url: require('src/assets/realizacao/marytykwawara.jpg'),
    width: '190px'
  },
  {
    name: 'Vue.js Norte',
    url: require('src/assets/realizacao/logo_VueNorte.svg'),
    width: '120px'
  }
]

export default {
  name: 'Equipe',
  data () {
    return {
      logo: logoImg
    }
  },
  computed: {
    teamDataforI18n () {
      const teamData = [
        {
          role: this.$t('about.pageTitleRoleTranslation'),
          name: [
            'Timei Assurini'
          ]
        },
        {
          role: this.$t('about.pageTitleRoleExecutiveManagement'),
          name: [
            'Carla Romano Amaral'
          ]
        },
        {
          role: this.$t('about.pageTitleRoleDesigner'),
          name: [
            'Alice Damasceno',
            'Gabriela Pessoa',
            'Jamille Santos',
            'Yuka Yamada'
          ]
        },
        {
          role: this.$t('about.pageTitleRoleDev'),
          name: [
            'Alice Cruvinel Bonafé',
            'Diego Souza',
            'Luandro Vieira',
            'Thayana Corrêa Mamoré',
            'Vincenzo Tozzi'
          ]
        }
      ]

      return teamData
    }
  }
}
</script>

<style scoped>
.card {
    height: 238px;
    width: 192px;
    background-color: rgb(177, 177, 177);
    box-shadow: 10px 10px #F2C037;
}
</style>
