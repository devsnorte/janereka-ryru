<template>
  <div class="fit column wrap content-center">
    <div class="logo">
      <div class="logo-img">
          <img src="~/assets/janeraka.svg" alt="">
      </div>
      <div class="logo-text">
          Janeraka
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
@media only screen and (max-width: 760px) {
  .logo {
      margin-top: 80px;
  }
  .logo-text {
    font-size: 32px !important;
  }
}
.logo {
  text-transform: uppercase;
  filter: drop-shadow(1px 1px 0 rgba(0, 0, 0, 0.1));
  fill: black;
}

.logo-text {
  font-family: monument;
  padding-top: 20px;
  font-size: 42px;
  line-height: 1;
}
</style>
