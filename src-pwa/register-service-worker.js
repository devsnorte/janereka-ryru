import { register } from 'register-service-worker'
import { Notify } from 'quasar'

// The ready(), registered(), cached(), updatefound() and updated()
// events passes a ServiceWorkerRegistration instance in their arguments.
// ServiceWorkerRegistration: https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration

register(process.env.SERVICE_WORKER_FILE, {
  // The registrationOptions object will be passed as the second argument
  // to ServiceWorkerContainer.register()
  // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerContainer/register#Parameter

  // registrationOptions: { scope: './' },

  ready () {
    console.log('App is being served from cache by a service worker.')
  },

  registered (registration) {
    console.log('Service worker has been registered.')
  },

  cached (registration) {
    console.log('Content has been cached for offline use.')
  },

  updatefound (registration) {
    console.log('New content is downloading.')
  },

  updated (/* registration */) {
    Notify.create({
      color: 'negative',
      icon: 'cloud_download',
      message: 'Nova Atualização Disponível!',
      timeout: 0,
      multiLine: true,
      actions: [
        {
          label: 'Atualizar',
          color: 'yellow',
          handler: () => {
            window.location.reload()
          }
        },
        {
          label: 'Ignorar',
          color: 'white',
          handler: () => {}
        }
      ]
    })
  },

  offline () {
    console.log('No internet connection found. App is running in offline mode.')
  },

  error (err) {
    console.error('Error during service worker registration:', err)
  }
})
