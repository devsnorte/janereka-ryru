import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import dateTimeFormats from 'src/i18n/dateTimeFormats'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'pt',
  fallbackLocale: 'pt',
  dateTimeFormats,
  messages
})

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n
}

export { i18n }
