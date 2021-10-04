import { Notify } from 'quasar'
import { axiosInstance as axios } from 'src/boot/axios'
import { i18n } from 'src/boot/i18n'
import { getters, mutations } from 'src/store/session-store'

export const Session = (function () {
  function SessionManager () {
    this.localStorage = window.localStorage

    this.getSession = () => {
      this.loadFromLocalStorage()
      return {
        user: getters.user(),
        token: getters.token(),
        issuedAt: this.localStorage.getItem('issuedAt')
      }
    }

    this.isAuthenticated = () => {
      const session = this.getSession()

      if (session.user && session.token && session.issuedAt) {
        const now = new Date()
        const issuedTime = new Date(session.issuedAt)
        const elapsedTimeInSeconds = Math.round((now - issuedTime) / 1000)

        if (elapsedTimeInSeconds < 600) {
          return true
        } else if (elapsedTimeInSeconds >= 600 && elapsedTimeInSeconds <= 900) {
          Notify.create({
            type: 'warning',
            multiLine: true,
            message: i18n.t('login.alertSessionAboutToExpire')
          })
          return true
        } else {
          this.logout()
          Notify.create({
            position: 'center',
            type: 'warning',
            multiLine: true,
            message: i18n.t('login.alertLoginNecessary')
          })
          return false
        }
      }
    }

    this.setSessionState = (user, token, issuedAt = new Date()) => {
      axios.defaults.headers.common = { token: token }
      mutations.setUser(user)
      mutations.setToken(token)

      // Todo: encrypt token before saving to Local Storage
      this.localStorage.setItem('user', user)
      this.localStorage.setItem('token', token)
      this.localStorage.setItem('issuedAt', issuedAt)
    }

    this.loadFromLocalStorage = () => {
      const user = this.localStorage.getItem('user')
      const token = this.localStorage.getItem('token')
      const issuedAt = this.localStorage.getItem('issuedAt')

      // Todo: decrypt token before saving
      this.setSessionState(user || '', token || '', issuedAt || new Date())
    }

    this.login = async (username, password) => {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)
      try {
        const { data } = await axios({
          method: 'post',
          url: '/auth',
          data: formData
        })

        this.setSessionState(username, data)

        return { success: true }
      } catch (error) {
        this.setSessionState('', '')
        return { error, success: false }
      }
    }

    this.logout = async () => {
      this.setSessionState('', '', '')
    }
  }

  let sManager

  function createSessionManager () {
    sManager = new SessionManager()
    return sManager
  }

  return {
    getSessionManager: () => {
      return sManager || createSessionManager()
    }
  }
})()
