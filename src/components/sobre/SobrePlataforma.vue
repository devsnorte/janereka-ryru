<template>
    <div class="bg-grey-12 q-px-xs-lg">
      <div class="constrain q-py-xs-lg q-py-md-xl">
        <div class="row">
          <h1 class="text-weight-bolder text-primary" :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'">
              {{$t('about.pageTitleAboutThePlatform')}}
          </h1>
        </div>
        <div class="row justify-evenly">
          <div class="col-xs-12 col-md-6 q-pr-md-xl">
              <p>
                {{$t('about.pageAboutThePlatformA')}}
              </p>
          </div>
          <div class="col-xs-12 col-md-6 q-pl-md-xl">
            <p>
              {{$t('about.pageAboutThePlatformB')}}
            </p>
            <p>
              {{$t('about.pageAboutThePlatformC')}}
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
