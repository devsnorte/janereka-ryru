import { axiosInstance as axios } from 'src/boot/axios'
import { getters, mutations } from 'src/store/session-store'

export const Session = (function () {
  function SessionManager () {
    this.getSession = () => {
      this.loadFromLocalStorage()
      return {
        user: getters.user(),
        token: getters.token()
      }
    }

    this.isAuthenticated = () => {
      const session = this.getSession()

      if (session.user && session.token) return true
      else return false
    }

    this.setSessionState = (user, token) => {
      axios.defaults.headers.common = { token: token }
      mutations.setUser(user)
      mutations.setToken(token)

      // Todo: encrypt token before saving to Local Storage
      const localStorage = window.localStorage
      localStorage.setItem('user', user)
      localStorage.setItem('token', token)
    }

    this.loadFromLocalStorage = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      // Todo: decrypt token before saving
      this.setSessionState(user || '', token || '')
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
      this.setSessionState('', '')
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
