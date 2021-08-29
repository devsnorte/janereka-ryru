import { axiosInstance as axios } from 'src/boot/axios'
import { getters, mutations } from 'src/store/session-store'

export const Session = (function () {
  function SessionManager () {
    this.getSession = () => {
      return {
        user: getters.user(),
        token: getters.token()
      }
    }

    this.setSessionState = (user, token) => {
      mutations.setUser(user)
      mutations.setToken(token)
      axios.defaults.headers.common = { token: token }

      const localStorage = window.localStorage
      localStorage.setItem('user', user)
      // Encrypt token before saving to Local Storage
      localStorage.setItem('token', token)
    }

    this.loadFromLocalStorage = () => {
      const user = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      // Decrypt token after loading
      // if (token) {
      //   // Decrypt token
      //   token = decrytpedToken
      // }

      if (user && token) this.setSessionState(user, token)
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
        return { error, success: false }
      }
    }

    this.logout = async () => {
      axios.defaults.headers.common = { token: null }
      this.setSessionState(null, null)
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
