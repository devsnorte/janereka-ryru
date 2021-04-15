<template>
  <q-page>
      <div class="row">
        <div class="col-xs-12 col-md-6 relative-position q-py-xs-xl q-pl-xl">
            <div class="column-md fit wrap content-center justify-end q-px-xs-lg">
              <h1 class="text-weight-bold text-h3" style="font-family: monument;">
                  Janeraka Ryru
              </h1>
              <div class="text-subtitle">
                Plataforma de Salvaguarda e Acervo Multimídia do Patrimônio Awaete
              </div>
              <div class="q-pt-lg col-xs-10 col-sm-7">
                <q-btn
                  color="primary"
                  no-caps
                  push
                  label="Acesse o Acervo"
                  size="xl"
                  to="/acervo"
                />
              </div>
              <small class="absolute-bottom q-mx-xl q-mb-lg gt-sm">
                Projeto desenvolvido através da Lei Federal no 14.017/20, do Edital Museus e Memoriais de Base Comunitária – Lei Aldir Blanc Pará 2020
              </small>
            </div>
        </div>
        <div class="col-md-6 gt-sm">
          <q-img
            src="~assets/cover.jpg"
            alt="Indigen Person jumping in the river"
            class="photo"
          />
        </div>
      </div>

      <div class="bg-accent">
        <div class="col-12 q-pa-none grafismo q-mb-xl"></div>
        <div class="row constrain q-py-xl q-px-xs-lg">
          <div class="col-xs-12 col-md-6">
            <q-img class="q-px-md-xl" src="~assets/icons-web-design.svg" alt="pictures" />
          </div>
          <div class="col-xs-12 col-md-6 q-py-md-xl">
            <h1 class="text-h3 text-weight-bold text-white">
              Sobre a Plataforma
            </h1>
            <p class="text-white text-justify">
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
  background-position: left;
  width: 100%;
}
</style>
