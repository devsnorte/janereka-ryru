<template>
  <q-footer class="bg-grey-9 text-white text-center" >
    <div class="constrain q-px-xs-lg">
      <div class="row items-end q-py-xl">
        <div class="col-sm-12 col-md-4 q-gutter-md-lg q-gutter-xs-sm q-pb-md-xs" :class="$q.screen.lt.md ? 'order-last q-pt-lg' : 'text-right'">
            <q-btn class="btn-fixed-width" size="md" outline :label="$t('footer.buttonLabelSubmissionTerms')"
              to="construction"
            />
            <q-btn class="btn-fixed-width" size="md" outline :label="$t('footer.buttonLabelAdminArea')"
              to="construction"
            />
        </div>
        <div class="col-xs-12 col-md-4 ">
          <img src="~/assets/logo-completa.svg" :alt="'footer.imageAltTextJanerakaLogo'" />
        </div>
        <div class="col-xs-12 col-md-4 q-pt-xs-lg" :class="$q.screen.lt.md ? 'text-center' : 'text-left'">
          <div>
            <p>{{ $t('footer.contact') }}: </p>
            <p>janerakaawaete@gmail.com<br />
            +55 91 91234-5678</p>
          </div>
          <div class="row q-gutter-sm" :class="$q.screen.lt.md ? 'justify-center' : ''">
            <div v-for="(social, index) in social_midias" :key="index">
              <q-btn flat round :icon="social.icon" type="a" target="_blank" :href="social.link" />
            </div>
          </div>
        </div>
      </div>
      <q-img src="~/assets/marcas-apoio.svg" />
    </div>
  </q-footer>
</template>

<script>
export default {
  name: 'PageFooter',
  data () {
    return {
      social_midias: [
        {
          icon: 'eva-facebook-outline',
          link: 'https://www.facebook.com/institutojaneraka'
        },
        {
          icon: 'fab fa-instagram',
          link: 'https://www.instagram.com/janerakas/'
        },
        {
          icon: 'fab fa-youtube',
          link: 'https://www.youtube.com/channel/UC0Uia1o_G1Wj7fcvQ2YMr2g'
        }
      ]
    }
  }
}
</script>

<style scoped>
.btn-fixed-width {
  width: 230px
}
</style>
