<template>
    <div class="bg-grey-12 q-py-xl q-px-xs-lg">
        <div class="q-px-xs-lg">
            <h1 class="text-h3 text-weight-bolder text-primary text-center">
                Equipe técnica
            </h1>
        </div>

        <div class="row constrain text-center q-pt-md-lg q-pb-md-md">
            <div class="col-xs-12 col-md-6 q-pb-xs-xl" v-for="(info, index) in team" :key="index">
                <div class="text-h6 text-weight-bolder text-primary"> {{ info.role }} </div>
                <div class="text-subtitle1" style="white-space: pre-line;">
                    {{ `${info.name.join('\n')}` }}
                </div>
            </div>
            <div class="col-12 q-pb-xs-xl">
              <div class="text-h5 text-weight-bolder text-primary"> Apoio </div>
            </div>
            <div class="fit row justify-center">
              <div class="col-xs-12 col-md-3 q-pb-xs-xl" v-for="(img, index) in logo" :key="index">
                <img :src="img.url" :alt="`Logo de ${img.name}`" width="120px" />
              </div>
            </div>
        </div>
    </div>
</template>

<script>

const teamData = [
  {
    role: 'Produção Cultural e Tradução',
    name: [
      'Timei Assurini'
    ]
  },
  {
    role: 'Produção Cultural e Direção Executiva',
    name: [
      'Carla Romano Amaral'
    ]
  },
  {
    role: 'Designers',
    name: [
      'Gabriela Pessoa',
      'Alice Damasceno',
      'Jamille Santos',
      'Yuka Yamada'
    ]
  },
  {
    role: 'Desenvolvedores',
    name: [
      'Alice Cruvinel Bonafé',
      'Diego Souza',
      'Luandro Vieira',
      'Thayana Corrêa Mamoré',
      'Vincenzo Tozzi'
    ]
  }
]

const logoImg = [
  {
    name: 'Baobáxia',
    url: require('src/assets/LogoBBX_mono.svg')
  },
  {
    name: 'Vue.js Norte',
    url: require('src/assets/logo_VueNorte.svg')
  }
]

export default {
  name: 'Equipe',
  data () {
    return {
      team: teamData,
      logo: logoImg
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
