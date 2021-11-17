<template>
    <div class="bg-grey-12 q-px-xs-lg">
      <div class="constrain q-py-xs-lg q-py-md-xl">
        <div class="row">
          <h1 class="text-weight-bolder text-primary" :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'">
              A Plataforma
          </h1>
        </div>
        <div class="row justify-evenly">
          <div class="col-xs-12 col-md-6 q-pr-md-xl">
              <p>
                  O projeto é resultado da insatisfação de parceiros Awaete e não indígenas em relação a acessibilidade e participacao das publicações, pesquisas e seus resultados bem como suas metodologias de relacionamento e busca o retorno organizado por pesquisadores Awaete em plataforma em seu idioma. Compõem o acervo arquivos em diversos formatos de mídia coletados apartir de anos de pesquisa de Timei Assurini e Carla Romano que durante o circuito troca de saberes e práticas com o projeto Agenda Awaete junto a rede de apoiadores coletaram publicações das mais diversas.
              </p>
          </div>
          <div class="col-xs-12 col-md-6 q-pl-md-xl">
            <p>
                A plataforma conta também com produções autônomas contemporâneas do coletivo da família  Marytykwawara.
            </p>
            <p>
                Tem algum arquivo ou publicação sobre nós? Envia pra gente, pelo e-mail janerkaawaete@gmail.com e colabore ainda mais para a cocriação de metodologias decoloniais de pesquisa e diálogo com povos ancestrais!
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Plataforma'
}
</script>

<style scoped>
.text-h3 {
    font-size: 2.8rem;
}
</style>
