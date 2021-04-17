<template>
  <div class="bg-accent text-white text-center q-pa-xl flex flex-center">
    <div>
      <div class="q-pb-md" :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'">
        Em construção...
      </div>
      <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_w0jj5msg.json"  background="transparent"  speed="0.5" loop  autoplay>
      </lottie-player>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Construction'
}
</script>

<style scoped>
lottie-player {
  width: 400px;
  height: 400px;
}

@media (max-width: 480px) {
  lottie-player {
    width: 200px;
    height: 200px;
    margin: auto;
  }
}
</style>
