<template>
    <div>
        <q-img class="sobre" src="~assets/sobre.png" />
        <div class="q-pa-none q-ma-none grafismo"></div>
    </div>
</template>

<style scoped>
.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo2.svg");
  background-position: left;
}

@media (max-width: 769px) {
    .grafismo {
        height: 65px;
    }
}

@media (min-width: 1920px) {
    .sobre {
        height: 600px;
    }
}

</style>
