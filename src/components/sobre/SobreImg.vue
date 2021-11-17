<template>
    <div>
        <q-img src="~assets/sobre.png" :height="$q.screen.lt.md ? '320px' : '520px'" />
        <div class="q-pa-none q-ma-none grafismo"></div>
    </div>
</template>

<style scoped>
.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo2.svg");
  background-position: right;
}

@media (max-width: 769px) {
    .grafismo {
        height: 65px;
    }
}

</style>
