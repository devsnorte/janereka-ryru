<template>
  <q-page>
      <div class="row items-center">
        <div class="col-xs-12 col-md-6 q-py-xs-xl q-pl-md-xl">
          <div class="q-px-xs-lg q-px-md-xl" :class="$q.screen.lt.md ? 'justify-center text-center' : 'justify-end'">
            <q-img src="~/assets/janeraka.svg" width="15em" class="lt-md" />
            <h1 class="text-weight-bolder" :class="$q.screen.lt.md ? 'text-h3' : 'text-h2'">
                {{ $t('home.pageTitle') }}
            </h1>
            <div class="text-h6 text-weight-regular">
              {{ $t('home.pageSubtitle') }}
            </div>
            <div class="q-py-xl q-mb-md-xl">
              <q-btn
                color="primary"
                no-caps
                push
                :label="$t('home.buttonLabelGalleryAccess')"
                size="xl"
                to="/acervo"
                class="text-weight-regular"
              />
            </div>
            <small class="gt-sm">
              {{ $t('home.pageTextProjectFunding') }}
            </small>
          </div>
        </div>
        <div class="col-md-6 gt-sm">
          <q-img
            src="~assets/cover.jpg"
            :alt="$t('home.imageAltTextCoverPicture')"
            class="photo"
          />
        </div>
      </div>

      <div class="bg-accent">
        <div class="col-12 q-pa-none grafismo q-mb-md-xl"></div>
        <div class="row constrain q-py-md-xl q-px-xs-lg">
          <div class="col-xs-12 col-md-6 gt-sm">
            <q-img class="q-px-md-xl" src="~assets/icons-web-design.svg" alt="pictures" />
          </div>
          <div class="text-white col-xs-12 col-md-6 q-py-xl">
            <h1 class="text-h3 text-weight-bold">
              {{ $t('home.pageTextAboutTitle') }}
            </h1>
            <p class="q-pb-lg">
              {{ $t('home.pageTextAboutLine1') }}<br />
              {{ $t('home.pageTextAboutLine2') }}
            </p>
            <!-- <small class="lt-md">
                {{ $t('home.pageTextProjectFunding') }}
            </small> -->
          </div>
        </div>
      </div>
  </q-page>
</template>

<script>

export default {
  name: 'Home'
}
</script>

<style scoped>
.photo {
  object-fit: cover;
  height: 100vh;
}

@media screen and (min-width: 2500px) {
  .photo {
    object-fit: cover;
    height: 60vh;
  }
}

.grafismo {
  height: 75px;
  background-image: url("~assets/grafismo.svg");
  background-position: left;
  width: 100%;
}
</style>
