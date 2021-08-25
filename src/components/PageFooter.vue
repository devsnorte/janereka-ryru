<template>
  <q-footer class="bg-grey-9 text-white text-center" >
    <div class="constrain q-px-xs-lg">
      <div class="row items-end q-py-xl">
        <div class="col-sm-12 col-md-4 q-gutter-md-lg q-gutter-xs-sm q-pb-md-xs" :class="$q.screen.lt.md ? 'order-last q-pt-lg' : 'text-right'">
            <q-btn class="btn-fixed-width" size="md" outline :label="$t('footer.buttonLabelSubmissionTerms')" />
            <q-btn class="btn-fixed-width" size="md" outline :label="$t('footer.buttonLabelAdminArea')"
              to="login"
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
          <div class="q-gutter-md" style="font-size: 1.7em">
            <q-icon name="eva-facebook-outline" />
            <q-icon name="eva-linkedin-outline" />
            <q-icon name="fab fa-instagram" />
            <q-icon name="fab fa-youtube" />
          </div>
        </div>
      </div>
      <q-img src="~/assets/marcas-apoio.svg" />
    </div>
  </q-footer>
</template>

<script>
export default {
  name: 'PageFooter'
}
</script>

<style scoped>
.btn-fixed-width {
  width: 230px
}
</style>
