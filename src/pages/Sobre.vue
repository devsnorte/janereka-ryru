<template>
  <q-page>
    <Sobre />
    <div class="bg-grey-12 q-px-xs-lg">
        <div class="constrain row q-py-xs-lg q-py-md-xl">
            <div class="row">
                <h1 class="text-h2 text-weight-bolder text-primary">
                    A Etnia <br /> Awaete
                </h1>
            </div>
            <div class="row justify-evenly">
                <div class="col-xs-12 col-md-6 q-pr-md-xl">
                    <p>
                        Localizados no Médio Xingu, no estado do Pará, no interior da Amazônia, os Asuriní do Xingu, ou Awaete como se autodenominam, são um povo de apenas 250 pessoas e 40 anos de contato. Artesãos, construtores, caçadores, agricultores, coletores, conhecedores da fauna e flora local, os Awaete possuíam sua autonomia baseada num sistema cultural complexo e equilibrado. Viviam parte do ano nômades, dispersos pelo território em núcleos familiares e na outra parte encontrava-se numa intensa festa celebrada na Tawywa, casa grande. Nestes encontros construíam e renovavam sua cultura e expandiam seu conhecimento sobre os territórios e seus habitantes pelas trocas entre seus clãs e muitas vezes acolhendo viajantes numa grande troca de saberes.
                    </p>
                </div>
                <div class="col-xs-12 col-md-6 q-pl-md-xl">
                    <p>
                        Um ponto comum da bibliografia acerca desta região é de que o termo “asuriní” ao qual Coudreau se refere provavelmente designava uma quantidade maior de povos indígenas que circulavam por essa região. Esse termo tem origem no termo juruna asóreni que designa vermelho. Embora ele seja atualmente aplicado aos Asuriní do Xingu é mais provável que esse termo designasse o grupo indígena Arawaté, pois estes últimos utilizam de forma abundante o urucum, de cor vermelha, enquanto que os Asuriní do Xingu utilizam jenipapo, de cor preta.”
                    </p>
                    <p class="text-grey-7">
                        NIMUENDAJÚ, 1948, p. 255; RIBEIRO, 2009, p. 61
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
