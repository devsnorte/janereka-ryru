<template>
  <div class="column wrap content-center inline">
    <div class="logo">
      <div class="logo-img">
          <img src="~/assets/janeraka.svg" alt="">
      </div>
      <div class="logo-text">
          Janeraka Ryru
      </div>
      <div class="logo-bottom">
          <img src="~/assets/janeraka_.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoJaneraka'
}
</script>

<style scoped>
* {
  box-sizing:border-box;
  margin:0;
  padding:0;
}

.logo {
  text-transform: uppercase;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.1));
  fill: black;
  max-width: 100%;
}

.logo-text {
  font-family: monument;
  padding-top: 0.5em;
  font-size: 2.7em;
  line-height: 1;
}
</style>
