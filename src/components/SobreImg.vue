<template>
    <div class="container">
        <div class="q-pa-none q-ma-none grafismo">
            <img class="sobre gt-sm" src="~assets/sobre.png" width="750px" />
        </div>
        <div class="sobre yellow gt-sm"></div>
    </div>
</template>

<style scoped>
.container {
    position: relative;
}

.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo2.svg");
  background-position: left;
}

.sobre {
  position: absolute;
  z-index: 9;
  right: 0;
  bottom: -100px;
}

.yellow {
    position: absolute;
    background: #F2C037;
    height: 100px;
    width: 450px;
    top: 110px;
    z-index: 0;
}
</style>
