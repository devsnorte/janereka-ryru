<template>
  <q-page class="container">
      <div class="row">
        <div class="col relative-position">
            <div class="column fit wrap content-center justify-end">
              <h1 class="text-weight-bold text-h3" style="font-family: monument;">
                  Janeraka Ryru
              </h1>
              <div class="text-subtitle1">
                Plataforma de Salvaguarda e Acervo Multimídia do Patrimônio Awaete
              </div>
              <div class="q-pt-lg col-xs-10 col-sm-7">
                <q-btn
                  color="primary"
                  no-caps
                  push
                  label="Acesse o Acervo"
                  size="lg"
                  to="/acervo"
                />
              </div>
              <small class="absolute-bottom q-ma-xl">
                Projeto desenvolvido através da Lei Federal no 14.017/20, do Edital Museus e Memoriais de Base Comunitária – Lei Aldir Blanc Pará 2020
              </small>
            </div>
        </div>
        <div class="col gt-sm">
          <q-img
            src="~assets/cover.jpg"
            alt="Indigen Person jumping in the river"
            class="photo"
          />
        </div>
      </div>

      <div class="bg-accent q-pb-lg">
        <div class="q-pa-none q-ma-none grafismo"></div>
        <div class="row">
          <div class="col-6">
            <q-img class="q-ml-xl" src="~assets/icons-web-design.svg" style="width: 32em" alt="pictures" />
          </div>
          <div class="col-4 q-pt-xl">
            <h1 class="text-h3 text-weight-bold text-white">
              Sobre a Plataforma
            </h1>
            <p class="text-white">
              Essa plataforma tem o objetivo de organizar, facilitar o acesso e documentar, registrar nossos saberes, estimular suas práticas, para a preservação e o fortalecimento de nossas memórias ancestrais em especial ritualística, medicinal, artesanal e construtiva a partir do diálogo com nossos jovens e anciãos.
            </p>
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
.photo {
  object-fit: cover;
  height: 80vh;
}

.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo.svg");
  background-position: center;
}
</style>
