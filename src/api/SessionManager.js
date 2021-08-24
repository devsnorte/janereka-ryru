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

        axios.defaults.headers.common = { token: data }
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
