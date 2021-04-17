<template>
    <div class="container">
        <div class="q-pa-none q-ma-none grafismo"></div>
        <q-img class="sobre" src="~assets/sobre.png" />
    </div>
</template>

<style scoped>
.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo2.svg");
  background-position: left;
}

.container {
    position: relative;
}

.sobre {
  position: absolute;
  width: 700px;
  right: 0;
  bottom: -100px;
  box-shadow: 50px 30px #F2C037;
}

@media (max-width: 769px) {
    .sobre {
        position: relative;
        width: 100%;
        bottom: 0;
        box-shadow: none;
    }
}

</style>
