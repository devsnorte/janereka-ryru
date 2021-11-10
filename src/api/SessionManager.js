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
        roles: getters.roles(),
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
            message: i18n.t('login.alertSessionAboutToExpire'),
            actions: [{ icon: 'close', color: 'white' }]
          })
          return true
        } else {
          this.logout()
          Notify.create({
            position: 'center',
            type: 'warning',
            multiLine: true,
            message: i18n.t('login.alertLoginNecessary'),
            actions: [{ icon: 'close', color: 'white' }]
          })
          return false
        }
      }
    }

    this.isAdmin = () => {
      if (this.isAuthenticated()) {
        const session = this.getSession()
        return session.roles.includes('acervo.publisher')
      } else return false
    }

    this.setSessionState = (user, roles, token, issuedAt = new Date()) => {
      axios.defaults.headers.common = { token: token }
      mutations.setUser(user)
      mutations.setRole(roles)
      mutations.setToken(token)

      this.localStorage.setItem('user', user)
      this.localStorage.setItem('roles', roles)
      this.localStorage.setItem('token', token)
      this.localStorage.setItem('issuedAt', issuedAt)
    }

    this.loadFromLocalStorage = () => {
      const user = this.localStorage.getItem('user')
      const roles = this.localStorage.getItem('roles')
      const token = this.localStorage.getItem('token')
      const issuedAt = this.localStorage.getItem('issuedAt')

      this.setSessionState(user || '', roles || [], token || '', issuedAt || new Date())
    }

    this.getAuthenticatedUser = async () => {
      const { user } = this.getSession()

      if (user) {
        try {
          const { data } = await axios({
            method: 'get',
            url: `/mocambola/${user}`
          })
          return { success: true, userData: data }
        } catch (error) {
          console.error(error)
          return { success: false, userData: undefined }
        }
      }
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

        const { token, mocambola } = data
        const { roles } = mocambola

        this.setSessionState(username, roles, token)

        return { success: true }
      } catch (error) {
        this.setSessionState('', [], '')
        return { error, success: false }
      }
    }

    this.logout = async () => {
      this.setSessionState('', [], '', '')
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
