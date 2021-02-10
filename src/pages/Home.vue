<template>
  <q-page class="container">
    <div class="col">
      <div class="row full-height">
        <div class="col">
          <div class="column justify-center q-pa-md window-height">
            <div class="q-pl-xl row q-col-gutter-md">
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
                  label="Acesso ao Acervo"
                  size="lg"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col gt-sm window-height">
          <div class="relative-position">
            <img
              src="~assets/cover.jpg"
              alt="Indigen Person jumping in the river"
              class="photo"
            >
            <div class="absolute-bottom-right">
              <img
                src="~assets/scribbles.svg"
                alt="Scribbles"
              >
            </div>
          </div>
        </div>
      </div>

      <div class="row bg-accent q-py-lg">
        <div class="col-6">
          <div class="q-pt-xl">
            <img src="~assets/Vector.svg" alt="">
          </div>
          <div>
            <img src="~assets/icons-web-design.svg" height="320px" alt="pictures">
          </div>
        </div>
        <div class="col-4 q-pt-xl">
          <h1 class="text-h3 text-weight-bold text-white">
            Sobre a Plataforma
          </h1>
          <p class="text-white">
            Essa plataforma tem o objetivo de organizar, facilitar o acesso e documentar, registrar nossos saberes, estimular suas práticas, para a preservação e o fortalecimento de nossas memórias ancestrais em especial ritualística, medicinal, artesanal e construtiva a partir do diálogo com nossos jovens e anciãos.
          </p>
          <div class="q-pt-md col-xs-10 col-sm-7">
            <q-btn
              color="secondary"
              no-caps
              push
              label="Saiba mais"
              size="lg"
            />
          </div>
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
  height: 100vh;
  width: 50vw;
}
</style>
